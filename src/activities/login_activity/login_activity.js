import React from "react";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Constants from "../../constants";
import NavigationScreens from "../../navigation_screens";
import { Button, View, TextInput, Alert } from "react-native";
import UserGetter from "../../api_communicators/user_getter";


export default class LoginActivity extends React.Component {
    constructor(props) {
        super(props);
        const { getItem, setItem } = useAsyncStorage(Constants.USER_LOCAL_STORAGE);
        this.getItem = getItem;
        this.setItem = setItem;

        this.state = {
            inputText: 'Enter User Here'
        }
        
        this.isConnected();
    }

    isConnected = async () => {
        await AsyncStorage.clear();   // Erase this #############
        this.getItem().then(
            (user) => {
                if (user != null) {
                    this.navToMap();
                }
            }
        );
    }

    onLoginPress = async () => {
        const user = await UserGetter.get(this.state.inputText)

        if (user != null) {
            await this.setItem(user.id);
            this.navToMap();
        }
    }

    changeText = (text) => {
        this.setState({inputText: text});
    }
    onRegisterPress = () => {
        this.props.navigation.navigate(NavigationScreens.REGISTER);
    }

    renderScreen = () => {
        return (
            <View
                style={{flex: 1}}>
                <TextInput 
                    value={this.state.inputText}
                    onChangeText={this.changeText}
                    style={{
                        borderWidth: 1,
                        padding: 5,
                        }}/>
                <Button title="Login" onPress={this.onLoginPress}/>
                <Button title="Register" onPress={this.onRegisterPress}/>
            </View>
        );
    }

    navToMap = () => {
        this.props.navigation.navigate(NavigationScreens.MAP);
    }

    render() {
        return this.renderScreen();
    }
}