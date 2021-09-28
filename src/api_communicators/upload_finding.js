
import ApiConstants from "./api_constants";
import { Request, fetch, Headers } from 'cross-fetch'
import { Alert } from "react-native";


export default class UploadFinding {
    static URI = "/finding";
    static METHOD = "POST";

    static upload(finding) {
        const payload = this.createJson(finding);
        const request = this.buildRequest(payload);

        fetch(request).then(
            (response) => {
                if (response.status == 200) {
                    Alert.alert("Upload Successful")
                } else {
                    Alert.alert("Something went wrong, status " + response.status);
                }
            }
        ).catch((error) => {
            console.log(error);
            Alert.alert("There wa an error with uploading");
        });
    }

    static createJson(finding) {
        return {
            id: finding.id,
            tags: finding.tags,
            longitude: finding.location.longitude,
            latitude: finding.location.latitude,
            image_hash: finding.image_hash,
            image: finding.image
        };
    }
    static buildRequest(payload) {
        const url = "http://".concat(ApiConstants.HOST, this.URI);
        
        return new Request(
            url,
            {
                method: this.METHOD,
                body: JSON.stringify(payload),
                headers: this.buildHeaders()
            }
        )
    }
    static buildHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }
}