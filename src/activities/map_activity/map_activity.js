import GetFindingByRadius from '../../api_communicators/finding_by_radius';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { style_map } from './map_styles';



const defaultRegion = {
    latitude: 31.7683,
    longitude: 35.2137,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
};

export default class MapActivity extends Component {
    DEGREES_TO_KM = 111;
    MAXIMUM_RADIUS = 10000;

    constructor(props) {
        super(props);
        this.state = {
            style: style_map.map,
            visible_markers: <View/>
        };

        this.onTouchablePress = this.navigateToCamera.bind(this);
        this.initialRegion = this.getDefaultRegion()
    }

    getDefaultRegion() {
        return defaultRegion;
    }

    onRegionChangeComplete = (region) => {
        const payload = this.generatePayloadByRegion(region);

        if (payload.radius <= this.MAXIMUM_RADIUS) {
            GetFindingByRadius.get(this.setVisibleMarkers, payload);
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
            <Marker key={key} coordinate={{longitude: finding.longitude, latitude: finding.latitude}}/>
        );
    }

    navigateToCamera = () => {
        this.props.navigation.navigate('camera');
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

