import GetFindingByRadius from './api_communicators/finding_by_radius';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';


const style = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    buttonContainer: {
        position: 'absolute',
        top: '88%',
        right: '5%',
    },
    button: {
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:65,
            height:65,
            backgroundColor:'rgb(106, 110, 205)',
            borderRadius:32,
        }
});


const defaultRegion = {
    latitude: 31.7683,
    longitude: 35.2137,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
};

export default class MapActivity extends Component {
    DEGREES_TO_KM = 111;
    MAXIMUM_RADIUS = 100;

    constructor(props) {
        super(props);
        this.state = {
            initialRegion: defaultRegion,
            style: style.map,
            region_print: defaultRegion.latitude + ", " + defaultRegion.longitude,
            visible_markers: <View/>
        };

        this.onTouchablePress = this.onTouchablePress.bind(this);
    }


    onRegionChangeComplete = (region) => {
        this.setState({ region_print: region.latitude + ", " + region.longitude, region: region });
        const payload = this.getPayloadByRegion(region);

        if (payload.radius <= this.MAXIMUM_RADIUS) {
            GetFindingByRadius.get_results(this.responseListener, payload);
        } else {
            this.setState({visible_markers: <View/>})
        }
        
        
    }
    getPayloadByRegion = (region) => {
        return {
            longitude: region.longitude,
            latitude: region.latitude,
            radius: Math.ceil(Math.max(region.longitudeDelta, region.latitudeDelta) * this.DEGREES_TO_KM)
        };
    }
    responseListener = (json_data) => {
        const visible_markers = <View>
            {
                json_data &&
                json_data.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            longitude: marker.longitude,
                            latitude: marker.latitude
                        }}/>
                ))
            }
        </View>
        this.setState({ visible_markers });
    }

    onTouchablePress() {
        this.props.navigation.navigate('camera');
    }

    render() {
        return (
            <View
                style={{flex: 1}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={this.state.style}
                    initialRegion={this.state.initialRegion}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    >   
                    {this.state.visible_markers}
                </MapView>
                <View
                    style={style.buttonContainer} >
                     <TouchableOpacity
                        style={style.button}
                        onPress={this.onTouchablePress} 
                        >
                        <Text style={{fontSize: 25, textAlign: 'center', color: "white"}}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

