import {RNCamera} from 'react-native-camera';
import { TouchableOpacity, Alert, StyleSheet, View } from 'react-native';
import React, { PureComponent } from 'react';
import { captureButtonStyle, screenStyle } from './camera_styles';
import { CameraPermissionOptions } from './camera_permission_options';
import NavigationScreens from '../navigation_screens';


export default class CameraActivity extends PureComponent {
    DEFAULT_OPACITY = 0.5;
    CAMERA_OPTIONS = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            takingPic: false,
        };

        this.onCapturePress = this.onCapturePress.bind(this);
    }

    onCapturePress = async () => {
        if (this.isNotTakingPicture()) {
            this.setState({takingPic: true});

            try {
                this.takePicture(this.CAMERA_OPTIONS);
            } catch (err) {
                Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
                return;
            } finally {
                this.setState({takingPic: false});
            }
        }
    };
    isNotTakingPicture = () => {
        return (this.camera && !this.state.takingPic);
    }
    takePicture = (options) => {
        this.camera.takePictureAsync(
            options
        ).then(data => {
            this.goToUploading(data);
        });
    }
    goToUploading = (image_data) => {
        this.props.navigation.navigate(NavigationScreens.UPLOAD_FINDING, {image_data: image_data});
    }


    render() {
        return (
            <View
                style={screenStyle}>
                <RNCamera
                    ref={ref => {this.camera = ref}}
                    captureAudio={false}
                    style={screenStyle}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={CameraPermissionOptions}>
                </RNCamera>
                <View
                    style={captureButtonStyle.buttonView}>
                    <TouchableOpacity
                        activeOpacity={this.DEFAULT_OPACITY}
                        style={captureButtonStyle.button}
                        onPress={this.onCapturePress}>
                        
                    </TouchableOpacity>
                </View>
            </View>);
    }
}

