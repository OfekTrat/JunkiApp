import React, { Component } from "react";
import { View, Button, Modal, Text, Alert } from "react-native";
import NavigationScreens from "../../navigation_screens";
import Finding from "../../finding";
import Location from "../../location";
import RNFS from 'react-native-fs';
import FindingCommunicator from "../../api_communicators/finding_communicator";
import Image from '../../image';
import ImageCommunicator from "../../api_communicators/image_communicator";
import TagPicker from "../../tag_picker";
import Geolocation from 'react-native-geolocation-service';


export default class UploadScreen extends Component {
    INTERVALS = {interval: 1000, fastInterval: 1000}

    constructor(props) {
        super(props);

        this.state = {
            tagPopupVisible: false,
            locationAccuracy: null,
            location: null,
            timerId: null
        }
        this.image_data = props.route.params.image_data;
    }

    navToMap = () => {
        this.props.navigation.navigate(NavigationScreens.MAP);
    }

    onViewImagePress = async () => {
        const imageData = await RNFS.readFile(this.image_data.uri, 'base64');
        this.props.navigation.navigate(NavigationScreens.VIEW_IMAGE, {image_data: imageData});
    }
    
    onPermissionRejected = (err) => {
        Alert.alert(err.message)
        console.log(err);
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
        if (this.state.locationAccuracy < 50) {
            if (this.tags != null && this.image_data != null && this.state.location != null) {
                const timestamp = this.getCurrentTimestamp()
                const image = await this.processImageData(this.image_data);
                const finding = new Finding(timestamp, this.state.location, this.tags, image.hash);
                await FindingCommunicator.upload(finding);
                await ImageCommunicator.upload(image);
                this.navToMap();
            } else {
                Alert.alert('You did not finish all the steps');
            }
            Geolocation.stopObserving();
        } else {
            Alert.alert("Accuracy is still low, wait...");
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

    componentDidMount = () => {
        console.log("Starting")
        this.setState({ 
            timeId: Geolocation.watchPosition(
                this.onSuccess, 
                this.onPermissionRejected,
                {
                    enableHighAccuracy: true,
                    interval: 2000,
                    fastestInterval: 1000,
                    distanceFilter: 2
                }
            ) 
        });
        
    }
    onSuccess = (position) => {
        const coords = position.coords;
        console.log(Date.now(), coords.accuracy, new Location(coords.longitude, coords.latitude));
        this.setState({
            locationAccuracy: coords.accuracy,
            location: new Location(coords.longitude, coords.latitude)
        })
    }
    componentWillUnmount = () => {
        Geolocation.clearWatch(this.state.timeId);
    }

    render() {
        return (
            <View>
                <Button title="View Image" onPress={this.onViewImagePress}/>
                {this.renderTagsPicker()}
                <Button title="Location" onPress={this.onLocationPress}/>
                <Button title="Upload" onPress={this.onUploadPress}/>
                <Text>{"Accuracy: " + this.state.locationAccuracy}</Text>
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