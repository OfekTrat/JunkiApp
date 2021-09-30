import React from "react";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Constants from "../../constants";
import NavigationScreens from "../../navigation_screens";
import { Button, View, TextInput, Alert } from "react-native";
import UserGetter from "../../api_communicators/user_getter";
import { style } from "./login_style";


export default class LoginActivity extends React.Component {
    LOGIN_TITLE = "Login";
    REGISTER_TITLE = "Register";

    constructor(props) {
        super(props);
        const { getItem, setItem } = useAsyncStorage(Constants.USER_LOCAL_STORAGE);
        this.getItem = getItem;
        this.setItem = setItem;
        this.state = {
            inputText: 'Enter User Here'
        }
    }

    onLoginPress = async () => {
        try {
            const user = await UserGetter.get(this.state.inputText)

            if (this.isUserExists(user)) {
                await this.setItem(user.id);
                this.props.signInCallback();
            } else {
                Alert.alert("User does not exist");
            }
        } catch(error) {
            console.log(error.message);
            Alert.alert(error.message);
        }
        
    }
    navToMap = () => {
        this.props.navigation.navigate(NavigationScreens.MAP);
    }

    isUserExists(user) {
        return user != null;
    }

    changeText = (text) => {
        this.setState({inputText: text});
    }
    onRegisterPress = () => {
        this.props.navigation.navigate(NavigationScreens.REGISTER);
    }

    

    render()  {
        return (
            <View
                style={style.containerStyle}>
                <TextInput 
                    value={this.state.inputText}
                    onChangeText={this.changeText}
                    style={style.inputTextStyle}/>
                <Button title={this.LOGIN_TITLE} onPress={this.onLoginPress}/>
                <Button title={this.REGISTER_TITLE} onPress={this.onRegisterPress}/>
            </View>
        );
    }

    
}