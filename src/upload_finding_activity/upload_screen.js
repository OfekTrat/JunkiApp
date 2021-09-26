import React, { Component } from "react";
import { View, Button, PermissionsAndroid, Modal, Text, CheckBox } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import NavigationScreens from "../navigation_screens";
import { permissionPrompt } from "./permission_prompt";
import { TapGestureHandler } from "react-native-gesture-handler";


export default class UploadScreen extends Component {
    INTERVALS = {interval: 1000, fastInterval: 1000}
    constructor(props) {
        super(props);

        this.state = {
            tagPopupVisible: false
        }
        this.image_data = props.route.params.image_data;

        this.onViewImagePress = this.onViewImagePress.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.getUserLocation = this.onGetLocationPress.bind(this);
        
    }

    onViewImagePress() {
        this.props.navigation.navigate(NavigationScreens.VIEW_IMAGE, {uri: this.image_data.uri});
    }
    
    setLatLng = (position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
    }
    onError(error) {
        console.log(error);
    }

    onGetLocationPress = async () => {
        try {
            const result = await this.requestLocationPermissions();
    
            if (result == PermissionsAndroid.RESULTS.GRANTED) {
                this.setLocation();
            }
        } catch(error) {
            console.log(error);
        }
    }
    async requestLocationPermissions() {
        return await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            permissionPrompt
        );
    }
    setLocation() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(this.INTERVALS)
            .then(() => {    
                Geolocation.getCurrentPosition(
                    this.setLatLng, 
                    this.onError
                );
            });
    }

    onTagPress = () => {
        this.setState({tagPopupVisible: !this.state.tagPopupVisible})
    }

    render() {
        return (
            <View>
                <Button title="View Image" onPress={this.onViewImagePress}/>
                <Button title="Get Location" onPress={this.onGetLocationPress}/>
                <Button title="Insert Tags" onPress={this.onTagPress}/>
                <Button title="Upload"/>


                <View>
                    <Modal visible={this.state.tagPopupVisible}>
                        <View>
                            <Button title="OK" onPress={this.onTagPress}/>
                        </View>
                    </Modal>
                </View>
                
            </View>
        );
    }

}