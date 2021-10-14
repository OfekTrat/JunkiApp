import React, { Component } from "react";
import { View, Button, PermissionsAndroid, Modal, Text, CheckBox, Alert, } from "react-native";
import NavigationScreens from "../../navigation_screens";
import PickerCheckBox from 'react-native-picker-checkbox';
import Finding from "../../finding";
import Location from "../../location";
import UploadFinding from "../../api_communicators/upload_finding";
import RNFS from 'react-native-fs';
import LocationHandler from "../../location_handler/location_handler";
import TagsInfo from "../../api_communicators/tags_info";


export default class UploadScreen extends Component {
    INTERVALS = {interval: 1000, fastInterval: 1000}

    constructor(props) {
        super(props);

        this.state = {
            tagPopupVisible: false
        }
        this.image_data = props.route.params.image_data;
        this.possibleTags = TagsInfo.get();

        this.onViewImagePress = this.onViewImagePress.bind(this);
        this.onUploadPress = this.onUploadPress.bind(this);

        this.getLocation();
    }

    navToMap = () => {
        this.props.navigation.navigate(NavigationScreens.MAP);
    }

    onViewImagePress() {
        this.props.navigation.navigate(NavigationScreens.VIEW_IMAGE, {uri: this.image_data.uri});
    }
    
    getLocation = async () => {
        await LocationHandler.requestLocationPermission();
        await LocationHandler.getLocation(this.setLatLng, this.onPermissionRejected);
    }
    setLatLng = (position) => {
        this.location = new Location(position.coords.longitude, position.coords.latitude)
    }
    onPermissionRejected = () => {
        Alert.alert("You need to enable location!!");
        this.navToMap();
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
                this.navToMap();
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