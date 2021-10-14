import base64 from "react-native-base64";


export default class Image {
    constructor(hash, data) {
        this.hash = hash;
        this.data = data;
    }

    toJson() {
        return {
            hash: this.hash,
            data: base64.encode(this.data)
        };
    }

    static fromJson(imageJson) {
        return new Image(imageJson.hash, base64.decode(imageJson.data));
    }
}