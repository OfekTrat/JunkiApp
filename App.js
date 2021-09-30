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


const Stack = createNativeStackNavigator();


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={NavigationScreens.LOGIN}>
                    <Stack.Screen name={NavigationScreens.LOGIN} component={LoginActivity}/>
                    <Stack.Screen name={NavigationScreens.MAP} component={MapActivity}/>
                    <Stack.Screen name={NavigationScreens.CAMERA} component={CameraActivity}/>
                    <Stack.Screen name={NavigationScreens.UPLOAD_FINDING} component={UploadScreen}/>
                    <Stack.Screen name={NavigationScreens.VIEW_IMAGE} component={ViewImageActivity}/>
                    <Stack.Screen name={NavigationScreens.REGISTER} component={RegisterActivity}/>
                    <Stack.Screen name={NavigationScreens.POINT_CHOOSER} component={ChoosePointActivity}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}