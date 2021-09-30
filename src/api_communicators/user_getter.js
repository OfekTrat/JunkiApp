import { Alert } from "react-native";
import User from "../user";
import ApiConstants from "./api_constants";
import Location from "../location";



export default class UserGetter {
    static METHOD = "GET";
    static URI = "/user";

    static async get(userId){
        try {
            const request = UserGetter.buildRequest(userId);
            const response = await fetch(request);
            const status = response.status;

            if (status == 200) {
                const jsonResp = await response.json();
                return this.createUserFromJson(jsonResp.result);
            } else {
                Alert.alert("User does not exist");
                return null;
            }
        } catch(err) {
            console.log(err.message);
            Alert.alert(err.message);
            return null;
        }
        
    }

    static buildRequest(userId) {
        const url = "http://".concat(ApiConstants.HOST, this.URI, "/", userId);
        return new Request(url, {method: this.METHOD});
    }

    static createUserFromJson(userAsJson) {
        const location = new Location(userAsJson.longitude, userAsJson.latitude);
        return new User(userAsJson.id, userAsJson.last_notified, location, userAsJson.radius,
            userAsJson.tags);
    }
}