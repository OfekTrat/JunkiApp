import React, { Component } from "react";
import { View, Button, Modal, Text, Alert } from "react-native";
import NavigationScreens from "../../navigation_screens";
import Finding from "../../finding";
import Location from "../../location";
import RNFS from 'react-native-fs';
import LocationHandler from "../../location_handler/location_handler";
import TagsInfo from "../../api_communicators/tags_info";
import FindingCommunicator from "../../api_communicators/finding_communicator";
import Image from '../../image';
import ImageCommunicator from "../../api_communicators/image_communicator";
import TagPicker from "../../tag_picker";


export default class UploadScreen extends Component {
    INTERVALS = {interval: 1000, fastInterval: 1000}

    constructor(props) {
        super(props);

        this.state = {
            tagPopupVisible: false
        }
        this.image_data = props.route.params.image_data;
        this.getLocation();
    }

    navToMap = () => {
        this.props.navigation.navigate(NavigationScreens.MAP);
    }

    onViewImagePress = async () => {
        const imageData = await RNFS.readFile(this.image_data.uri, 'base64');
        this.props.navigation.navigate(NavigationScreens.VIEW_IMAGE, {image_data: imageData});
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
            <TagPicker setChosenTags={this.setTags}/>
        )
    }
    setTags = (tags) => {
        this.tags = tags;
    }   

    onUploadPress = async () => {
        if (this.tags != null && this.image_data != null && this.location != null) {
            const timestamp = this.getCurrentTimestamp()
            const image = await this.processImageData(this.image_data);
            const finding = new Finding(timestamp, this.location, this.tags, image.hash);
            await FindingCommunicator.upload(finding);
            await ImageCommunicator.upload(image);
            this.navToMap();
        } else {
            Alert.alert('You did not finish all the steps');
        }
    }
    getCurrentTimestamp() {
        return Math.floor(Date.now())
    }
    async processImageData(image_info) {
        const splittedPath = image_info.uri.split("/");
        const imageHash = splittedPath[splittedPath.length - 1].split(".")[0];
        const imageData = await RNFS.readFile(image_info.uri, "base64");
        const imageJson = { hash: imageHash, data: imageData };
        const image = Image.fromJson(imageJson);    
        return image;
    }

    render() {
        return (
            <View>
                <Button title="View Image" onPress={this.onViewImagePress}/>
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