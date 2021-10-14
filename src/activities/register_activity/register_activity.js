import React from "react";
import { TextInput, View, Button, Text, Alert } from "react-native";
import PickerCheckbox from "react-native-picker-checkbox";
import NavigationScreens from "../../navigation_screens";
import User from "../../user";
import { style } from "./register_style";
import Location from '../../location';
import TagsInfo from '../../api_communicators/tags_info';
import UserStorage from "../../user_storage";
import UserCommunicator from "../../api_communicators/user_communicator";


export default class RegisterActivity extends React.Component {
    BUTTON_CHOOSE_POINT_TITLE = "Press to choose Coordinate";
    REGISTER_TITLE = "Register";

    constructor(props) {
        super(props);
        this.uid = this.props.route.params.uid;
        this.state = {
            radiusInput: 0,
            location: new Location(0, 0),
            tags: []
        }

        this.possibleTags = TagsInfo.get();
    }

    onRadiusChange = (radius) => {
        if (radius == "") {
            this.setState({radiusInput: 0});
        } else {
            this.setState({radiusInput: radius});
        }
        
    }

    register = async () => {
        try {
            this.setLocation();
            const user = this.createUser();
            await UserCommunicator.upload(user);
            await UserStorage.set_user(user);
            Alert.alert("Successfuly uploaded");
            this.props.signInCallback();
            this.props.navigation.navigate(NavigationScreens.MAP);
        } catch (err) {
            Alert.alert(err.message);
        }
    }
    setLocation = async () => {
        if (this.props.route.params != null) {
            if (this.props.route.params.location != null) {
                await this.setState({ location: this.props.route.params.location});
            }
        }
    }
        
    createUser = () => {
        return new User(this.uid, Math.floor(Date.now()), this.state.location, 
                        this.state.radiusInput, this.state.tags);
    }

    renderTagsPicker = () => {
        return (
            <PickerCheckbox
                data={this.possibleTags}
                headerComponent={<Text>Tags</Text>}
                OnConfirm={this.setRelevantTags}
                ConfirmButtonTitle="OK"
                DescriptionField="tag"
                KeyField="key"
                placeholder="Select Some Tags"/>
        );
    }

    setRelevantTags = (tags) => {
        const newTags = [];

        for (let i = 0; i < tags.length; i++) {
            newTags.push(tags[i].tag);
        }
        this.setState({ tags: newTags });
    }  

    onMapPress = () => {
        this.props.navigation.navigate(NavigationScreens.POINT_CHOOSER);
    }

    renderRadiusInput() {
        return (
            <TextInput
                onChangeText={this.onRadiusChange}
                placeholder="Enter radius here"
                style={style.textInput}
                keyboardType='numeric'
                maxLength={2}/>
        );
    }

    renderButton(title, onPressCallback) {
        return <Button title={title} onPress={onPressCallback}/>;
    }

    render() {
        return (
            <View>
                {this.renderRadiusInput()}
                {this.renderTagsPicker()}
                {this.renderButton(this.BUTTON_CHOOSE_POINT_TITLE, this.onMapPress)}
                {this.renderButton(this.REGISTER_TITLE, this.register)}
            </View>
        );
    }
}