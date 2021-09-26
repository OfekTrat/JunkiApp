import React, { Component } from "react";
import { View, Button, PermissionsAndroid, Modal, Text, CheckBox } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


export default class UploadScreen extends Component {
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
        this.props.navigation.navigate('view_image', {uri: this.image_data.uri});
    }

    setLocation() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
            {interval: 1000, fastInterval: 1000}
        ).then((data) => {    
            Geolocation.getCurrentPosition((position) => {
                this.longitude = position.coords.longitude;
                this.latitude = position.coords.latitude;
            }, (error) => {
                console.log(error);
            });
        });
    }

    onGetLocationPress = async () => {
        try {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'Give me location permission',
                    buttonPositive: "OK"
            });
    
            if (result == PermissionsAndroid.RESULTS.GRANTED) {
                this.setLocation();
            }
        } catch(error) {
            console.log(error);
        }
    }
    
    onTagPress = () => {
        this.setState({tagPopupVisible: !this.state.tagPopupVisible});
    }
    onChecked(id) {
        
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