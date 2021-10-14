import ApiConstants from "./api_constants";
import { Request, Headers } from 'cross-fetch'


export default class RequestBuilder {
    static build(method, uri, payload) {
        const url = "http://".concat(ApiConstants.HOST, uri);
        options = this.getOptions(method, payload);
        return new Request(url, options);
    }
    static getOptions(method, payload) {
        if (payload == null) {
            return {method: method}
        } else {
            return {
                method: method,
                headers: this.buildHeaders(),
                body: JSON.stringify(payload)
            };
        }
    }
    static buildHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }
}