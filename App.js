import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import MapActivity from './src/activities/map_activity/map_activity';
import CameraActivity from './src/activities/camera_activity/camera_activity';
import UploadScreen from './src/activities/upload_finding_activity/upload_screen';
import ViewImageActivity from './src/activities/view_image';
import NavigationScreens from './src/navigation_screens';
import LoginActivity from './src/activities/login_activity/login_activity';
import RegisterActivity from './src/activities/register_activity/register_activity';
import ChoosePointActivity from './src/activities/register_activity/choose_point_activity';
import WaitActivity from './src/activities/wait_activity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from './src/constants';
import ViewFindingActivity from './src/activities/view_finding';


const Stack = createNativeStackNavigator();


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSigned: false,
            isLoading: true
        };
        this.setSigned();
    }

    async setSigned() {
        await AsyncStorage.clear();
        const user = await AsyncStorage.getItem(Constants.USER_LOCAL_STORAGE);

        if (user == null) {
            this.setState({ isSigned: false, isLoading: false});
        } else {
            this.setState({ isSigned: true, isLoading: false });
        }        
    }

    signInCallback = () => {
        this.setState({ isSigned: true});
    }

    renderScreenByUser = () => {
        if (this.state.isSigned) {
            return (<Stack.Screen name={NavigationScreens.MAP} component={MapActivity}/>);
        } else {
            return (
                <Stack.Screen
                    name={NavigationScreens.LOGIN}>
                    {props => <LoginActivity {...props} signInCallback={this.signInCallback}/>}
                </Stack.Screen>
            );
        }
    }

    render() {
        if (this.state.isLoading) {
            return <WaitActivity/>
        }
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    { this.renderScreenByUser() }
                    <Stack.Screen name={NavigationScreens.CAMERA} component={CameraActivity}/>
                    <Stack.Screen name={NavigationScreens.UPLOAD_FINDING} component={UploadScreen}/>
                    <Stack.Screen name={NavigationScreens.VIEW_IMAGE} component={ViewImageActivity}/>
                    <Stack.Screen name={NavigationScreens.REGISTER}>
                        {props => <RegisterActivity {...props} signInCallback={this.signInCallback}/>}
                    </Stack.Screen>
                    <Stack.Screen name={NavigationScreens.POINT_CHOOSER} component={ChoosePointActivity}/>
                    <Stack.Screen name={NavigationScreens.VIEW_FINDING} component={ViewFindingActivity}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}