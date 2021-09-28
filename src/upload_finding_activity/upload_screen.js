import React, { Component } from "react";
import { View, Button, PermissionsAndroid, Modal, Text, CheckBox, Alert, } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import NavigationScreens from "../navigation_screens";
import { permissionPrompt } from "./permission_prompt";
import PickerCheckBox from 'react-native-picker-checkbox';
import Finding from "../finding";
import Location from "../location";
import UploadFinding from "../api_communicators/upload_finding";
import RNFS from 'react-native-fs';


export default class UploadScreen extends Component {
    INTERVALS = {interval: 1000, fastInterval: 1000}

    constructor(props) {
        super(props);

        this.state = {
            tagPopupVisible: false
        }
        this.image_data = props.route.params.image_data;
        this.possibleTags = this.getPossibleTags();

        this.onViewImagePress = this.onViewImagePress.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.onUploadPress = this.onUploadPress.bind(this);

        this.getLocation();
    }

    getPossibleTags() {
        return [
            {key: 1, tag: "Electrical"}, 
            {key: 2, tag: "Music"},
            {key: 3, tag: "Furniture"}, 
            {key: 4, tag: "Wood"}
        ];
    }

    onViewImagePress() {
        this.props.navigation.navigate(NavigationScreens.VIEW_IMAGE, {uri: this.image_data.uri});
    }
    
    getLocation = async () => {
        try {
            const result = await this.requestLocationPermissions();
    
            if (result == PermissionsAndroid.RESULTS.GRANTED) {
                this.setLocation();
            } else {
                Alert.alert("Permission not permitted");
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
    setLatLng = (position) => {
        this.location = new Location(position.coords.longitude, position.coords.latitude)
    }
    onError(error) {
        console.log(error);
    }

    renderTagsPicker = () => {
        return (
            <PickerCheckBox
                data={this.possibleTags}
                headerComponent={<Text>Tags</Text>}
                OnConfirm={this.setTags}
                ConfirmButtonTitle="OK"
                DescriptionField="tag"
                KeyField="key"
                placeholder="Select Some Tags"/>
        )
    }
    setTags = (tags) => {
        this.tags = [];

        for (let i = 0; i < tags.length; i++) {
            this.tags.push(tags[i].tag);
        }
    }   

    onUploadPress = () => {
        if (this.tags != null && this.image_data != null && this.location != null) {
            const timestamp = this.getCurrentTimestamp()
            this.processImageData(this.image_data).then((image) => {
                const finding = new Finding(timestamp, this.location, this.tags, image[0], image[1]);
                UploadFinding.upload(finding);
                this.props.navigation.navigate(NavigationScreens.MAP);
            })
        } else {
            Alert.alert('You did not finish all the steps');
        }
    }
    getCurrentTimestamp() {
        return Math.floor(Date.now())
    }
    async processImageData(image_data) {
        const splittedPath = image_data.uri.split("/");
        const imageHash = splittedPath[splittedPath.length - 1].split(".")[0];
        const imageB64 = await RNFS.readFile(image_data.uri, 'base64');

        return [imageHash, imageB64];
    }

    render() {
        return (
            <View>
                <Button title="View Image" onPress={this.onViewImagePress}/>
                {/* <Button title="Get Location" onPress={this.onGetLocationPress}/> */}
                {this.renderTagsPicker()}
                <Button title="Upload" onPress={this.onUploadPress}/>

                <View>
                    <Modal visible={this.state.tagPopupVisible}>
                        <View>
                            
                        </View>
                    </Modal>
                </View>
                
            </View>
        );
    }

}