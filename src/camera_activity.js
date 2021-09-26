import {RNCamera} from 'react-native-camera';
import { TouchableOpacity, Alert, StyleSheet, View } from 'react-native';
import React, { PureComponent } from 'react';



export default class CameraActivity extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            takingPic: false,
        };
        this.onCapturePress = this.onCapturePress.bind(this);
    }

    onCapturePress = async () => {
        if (this.camera && !this.state.takingPic) {
            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
            };

            this.setState({takingPic: true});

            try {
                this.camera.takePictureAsync(options)
                    .then(data => {
                        this.props.navigation.navigate(
                            'upload_finding',
                            {
                                image_data: data
                            });
                    });
            } catch (err) {
                Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
                return;
            } finally {
                this.setState({takingPic: false});
            }
        }
    };
    render() {
        return (
            <View
                style={{flex: 1}}>
                <RNCamera
                    ref={ref => {this.camera = ref}}
                    captureAudio={false}
                    style={{flex: 1}}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}>
                </RNCamera>
                <View
                    style={{
                        position: 'absolute',
                        top: '90%',
                        alignSelf: 'center'
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.btnAlignment}
                        onPress={this.onCapturePress}>
                        
                    </TouchableOpacity>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
   btnAlignment: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:65,
        height:65,
        backgroundColor:'rgb(128, 128, 128)',
        borderRadius:32,
    },
});