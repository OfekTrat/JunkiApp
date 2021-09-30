import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { style_map } from '../map_activity/map_styles';
import { View, Button } from 'react-native';
import NavigationScreens from "../../navigation_screens";
import Location from "../../location";


const defaultRegion = {
    latitude: 31.7683,
    longitude: 35.2137,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
};


export default class ChoosePointActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markerVisible: false,
            location: null
        };
        this.initialRegion = defaultRegion
        this.chooseCallback = this.props.callback;
    }

    onRegionChange = (region) => {
        this.setState({markerPosition: region});
    }

    onChoosePress = () => {
        this.props.navigation.navigate(NavigationScreens.REGISTER, { location: this.state.location });
    }

    onMapPress = (e) => {
        const location = new Location(e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude);
        this.setState({ 
            location: location,
            markerVisible: true
        });
    }

    getMarker = () => {
        if (this.state.markerVisible) {
            return (
                <Marker
                    coordinate={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude
                    }}/>
            )
        }
    }

    render() {
        return (
            <View
                style={{flex: 1}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={style_map.map}
                    initialRegion={this.initialRegion}
                    onRegionChange={this.onRegionChange}
                    onPress={this.onMapPress}>
                        {this.getMarker()}
                </MapView>
                <View>
                    <Button title="Choose" onPress={this.onChoosePress}/>
                </View>
            </View>
        );
    }
}