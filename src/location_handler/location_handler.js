import { PermissionsAndroid } from "react-native"
import Geolocation from 'react-native-geolocation-service';
import { permissionPrompt } from "./permission_prompt";


export default class LocationHandler {
    static INTERVALS = {interval: 1000, fastInterval: 1000};

    static async requestLocationPermission() {
        return await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            permissionPrompt
        );
    }

    static async getLocation(onSuccessCallback, onErrorCallback) {
        Geolocation.getCurrentPosition(onSuccessCallback, onErrorCallback);
    }
}