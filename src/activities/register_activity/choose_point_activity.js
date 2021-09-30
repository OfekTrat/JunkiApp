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
            markerPosition: defaultRegion
        };

        this.initialRegion = defaultRegion
        this.chooseCallback = this.props.callback;
    }

    onRegionChange = (region) => {
        this.setState({markerPosition: region});
    }

    onChoosePress = () => {
        const location = new Location(this.state.markerPosition.longitude, this.state.markerPosition.latitude);
        this.props.navigation.navigate(NavigationScreens.REGISTER, { location: location });
    }

    render() {
        return (
            <View
                style={{flex: 1}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={style_map.map}
                    initialRegion={this.initialRegion}
                    onRegionChange={this.onRegionChange}>   
                        <Marker draggable
                            coordinate={this.state.markerPosition}>
                        </Marker>
                </MapView>
                <View>
                    <Button title="Choose" onPress={this.onChoosePress}/>
                </View>
            </View>
        );
    }
}