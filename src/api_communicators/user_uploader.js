import ApiConstants from "./api_constants";
import { Request, fetch, Headers } from 'cross-fetch';


export default class UserUploader {
    static URI = "/user";
    static METHOD = "POST";

    static async upload(user) {
        const request = this.buildRequest(user);
        const response = await fetch(request);
        const status = response.status;

        if (status == 200) {
            return true;
        } else {
            console.log(await response.json());
            return false
        }
    }
    static buildRequest(user) {
        const url = "http://".concat(ApiConstants.HOST, this.URI)
        console.log(user.toJson())
        return new Request(
            url,
            {
                method: this.METHOD,
                body: JSON.stringify(user.toJson()),
                headers: this.buildHeaders()
            }
        );
    }

    static buildHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }
}