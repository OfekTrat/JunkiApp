import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import MapActivity from './src/map_activity';
import CameraActivity from './src/camera_activity';
import UploadScreen from './src/upload_screen';
import ViewImageActivity from './src/view_image';


const Stack = createNativeStackNavigator();


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'map'
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="map">
                    <Stack.Screen name="map" component={MapActivity}/>
                    <Stack.Screen name="camera" component={CameraActivity}/>
                    <Stack.Screen name="upload_finding" component={UploadScreen}/>
                    <Stack.Screen name="view_image" component={ViewImageActivity}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}