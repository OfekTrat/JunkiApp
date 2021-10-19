import React from "react";
import { Button, View, TextInput, Alert } from "react-native";
import { style } from "./login_style";
import GoogleSigninWrapper from './signin_options/google_signin';
import NavigationScreens from '../../navigation_screens';
import UserCreator from "./user_creator";
import SignInOptionChooser from "./signin_options/option_chooser";
import UserCommunicator from '../../api_communicators/user_communicator';
import { UserNotFoundError } from '../../errors/user_errors';


export default class LoginActivity extends React.Component {
    LOGIN_TITLE = "Login";
    REGISTER_TITLE = "Register";

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        GoogleSigninWrapper.configure();
    }

    onButtonPress = async (platform) => {
        try {
            const user = await SignInOptionChooser.choose(platform, this.state.email, this.state.password);
            const newUser = user.additionalUserInfo.isNewUser;
            const uid = user.user.uid;

            if (!newUser) {
                this.handleNotNewUser(uid);
                // this.props.signInCallback();
            } else {
                this.gotoRegisterActivity(uid);
            }
        } catch (err) {
            if (err.message == "Empty Credentials"){
                Alert.alert("You did not enter credentials");
            } else {
                this.createUser();
            }
            
        }
    }
    handleNotNewUser = async (uid) => {
        try {
            const user = await UserCommunicator.get(uid);
            this.props.signInCallback();
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                this.gotoRegisterActivity(uid);
            } else {
                Alert.alert("Something went wrong with your user");
            }
        }
    }
    createUser = async () => {
        try {
            const user = await UserCreator.create(this.state.email, this.state.password)
            const uid = user.user.uid;
            this.gotoRegisterActivity(uid);
        } catch (err) {
            Alert.alert(err.message);
        }
            
    }
    gotoRegisterActivity = (uid) => {
        this.props.navigation.navigate(NavigationScreens.REGISTER, { uid: uid });
    }

    emailChange = (email) => {
        this.setState({email: email});
    }
    passwordChange = (password) => {
        this.setState({password: password});
    }

    render()  {
        return (
            <View
                style={style.containerStyle}>
                <TextInput
                    style={style.TextInput}
                    placeholder="Enter email here"
                    onChangeText={this.emailChange}/>
                <TextInput
                    style={style.TextInput}
                    placeholder="Enter password here"
                    onChangeText={this.passwordChange}/>
                
                <Button title="Login with Credentials" onPress={() => this.onButtonPress("regular")}/>
                <Button title="Login with Google" onPress={() => this.onButtonPress("google")}/>
            </View>
        );
    }

    
}