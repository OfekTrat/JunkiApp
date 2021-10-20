import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { style_map } from './map_styles';
import NavigationScreens from '../../navigation_screens';
import FindingCommunicator from '../../api_communicators/finding_communicator';
import Location from '../../location';
import ImageCommunicator from '../../api_communicators/image_communicator';
import RNFS from 'react-native-fs';



const defaultRegion = {
    latitude: 31.7683,
    longitude: 35.2137,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
};

export default class MapActivity extends Component {
    DEGREES_TO_KM = 111;
    MAXIMUM_RADIUS = 100;
    TMP_FILE = RNFS.DocumentDirectoryPath + "/tmp";

    constructor(props) {
        super(props);
        this.state = {
            style: style_map.map,
            visible_markers: <View/>,
            markers: []
        };

        this.onTouchablePress = this.navigateToCamera.bind(this);
        this.initialRegion = this.getDefaultRegion()
    }

    getDefaultRegion() {
        return defaultRegion;
    }

    onRegionChangeComplete = async (region) => {
        const radius = this.calcRadius(region.longitudeDelta, region.latitudeDelta);
        const location = new Location(region.longitude, region.latitude);

        if (radius <= this.MAXIMUM_RADIUS) {
            try {
                const findings = await FindingCommunicator.get_by_radius(radius, location)
                this.setVisibleMarkers(findings);
            } catch (err) {
                console.log(err.message);
            }
            
        } else {
            this.setState({visible_markers: <View/>})
        }
    }
    generatePayloadByRegion = (region) => {
        return {
            longitude: region.longitude,
            latitude: region.latitude,
            radius: this.calcRadius(region.longitudeDelta, region.latitudeDelta)
        };
    }
    calcRadius(longitudeDelta, latitudeDelta) {
        return Math.ceil(Math.max(longitudeDelta, latitudeDelta) * this.DEGREES_TO_KM);
    }
    setVisibleMarkers = (json_data) => {
        this.setState({markers: json_data});
        const visible_markers = <View>
            {
                json_data &&
                json_data.map((finding, index) => (
                    this.renderMarker(index, finding)
                ))
            }
        </View>
        this.setState({ visible_markers });
    }
    renderMarker(key, finding) {
        return (
            <Marker 
                key={key} 
                coordinate={{longitude: finding.longitude, latitude: finding.latitude}}/>
        );
    }

    navigateToCamera = () => {
        this.props.navigation.navigate('camera');
    }

    onMarkerPress = async (event) => {
        const location = event.nativeEvent.coordinate;

        if (this.state.markers == null) {
            return;
        }
        
        const finding = this.state.markers.find((finding) => {
            if (finding != null) {
                if (this.isSameLocation(finding, location)) {
                    return finding;
                }
            }
        });
        const image = await ImageCommunicator.get(finding.image_hash);

        this.props.navigation.navigate(NavigationScreens.VIEW_IMAGE, {image_data: image.toJson().data});
    }
    isSameLocation(finding, location) {
        return (
            finding.longitude == location.longitude &&
            finding.latitude == location.latitude
        );
    }

    render() {
        return (
            <View
                style={{flex: 1}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={style_map.map}
                    initialRegion={this.initialRegion}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    onMarkerPress={this.onMarkerPress}
                    >   
                    {this.state.visible_markers}
                </MapView>
                <View
                    style={style_map.buttonView} >
                     <TouchableOpacity
                        style={style_map.button}
                        onPress={this.navigateToCamera} 
                        >
                        <Text style={style_map.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

