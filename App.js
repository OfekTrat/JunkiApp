import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import MapActivity from './src/map_activity/map_activity';
import CameraActivity from './src/camera_activity/camera_activity';
import UploadScreen from './src/upload_screen';
import ViewImageActivity from './src/view_image';
import NavigationScreens from './src/navigation_screens';


const Stack = createNativeStackNavigator();


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={NavigationScreens.MAP}>
                    <Stack.Screen name={NavigationScreens.MAP} component={MapActivity}/>
                    <Stack.Screen name={NavigationScreens.CAMERA} component={CameraActivity}/>
                    <Stack.Screen name={NavigationScreens.UPLOAD_FINDING} component={UploadScreen}/>
                    <Stack.Screen name={NavigationScreens.VIEW_IMAGE} component={ViewImageActivity}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}