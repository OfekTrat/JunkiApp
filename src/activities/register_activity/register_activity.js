import React, { useState } from "react";
import { TextInput, View, Button, Text, Alert } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Constants from "../../constants";
import PickerCheckbox from "react-native-picker-checkbox";
import NavigationScreens from "../../navigation_screens";
import UserUploader from "../../api_communicators/user_uploader";
import User from "../../user";
import { style } from "./register_style";
import Location from '../../location';



export default class RegisterActivity extends React.Component {
    BUTTON_CHOOSE_POINT_TITLE = "Press to choose Coordinate";
    REGISTER_TITLE = "Register";

    constructor(props) {
        super(props);

        this.state = {
            userIdInput: "",
            radiusInput: 0,
            location: new Location(0, 0),
            tags: []
        }

        this.possibleTags = this.getPossibleTags();

        const { getItem, setItem } = useAsyncStorage(Constants.USER_LOCAL_STORAGE);
        this.getItem = getItem;
        this.setItem = setItem;
    }

    getPossibleTags() {
        return [
            {key: 1, tag: "Electrical"}, 
            {key: 2, tag: "Music"},
            {key: 3, tag: "Furniture"}, 
            {key: 4, tag: "Wood"}
        ];
    }

    onUserIdChange = (text) => {
        this.setState({userIdInput: text});
    }
    onRadiusChange = (radius) => {
        if (radius == "") {
            this.setState({radiusInput: 0});
        } else {
            this.setState({radiusInput: radius});
        }
        
    }

    register = async () => {
        this.setState({ location: this.getLocation() });

        if (this.isRadiusValid(this.state.radiusInput)) {
            const user = this.createUser();
            const result = await UserUploader.upload(user);

            if (result) {
                Alert.alert("Successful Upload");
                await this.setItem(user.id);
                console.log(this.props.signInCallback);
                this.props.signInCallback();
                this.props.navigation.navigate(NavigationScreens.MAP);  
            } else {
                Alert.alert("User already exists");
            }
        } else {
            Alert.alert('radius is not good');
        }
    }
    getLocation = () => {
        if (this.props.route.params != null) {
            return this.props.route.params.location;
        } else {
            this.setState({radiusInput: 0});
            return this.state.location;
        }
        
    }
    isRadiusValid(radius) {
        return !isNaN(radius);
    }
    createUser = () => {
        return new User(this.state.userIdInput, 0, this.state.location, 
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

    renderUserIdInput() {
        return (
            <TextInput
                placeholder="Enter user here"
                onChangeText={this.onUserIdChange}
                style={style.textInput}/>
        );
    }

    renderRadiusInput() {
        return (
            <TextInput
                onChangeText={this.onRadiusChange}
                placeholder="Enter radius here"
                style={style.textInput}/>
        );
    }

    renderButton(title, onPressCallback) {
        return <Button title={title} onPress={onPressCallback}/>;
    }

    render() {
        return (
            <View>
                {this.renderUserIdInput()}
                {this.renderRadiusInput()}
                {this.renderTagsPicker()}
                {this.renderButton(this.BUTTON_CHOOSE_POINT_TITLE, this.onMapPress)}
                {this.renderButton(this.REGISTER_TITLE, this.register)}
            </View>
        );
    }
}