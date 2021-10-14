import RequestBuilder from "./request_builder";
import { fetch } from 'cross-fetch';


export default class UserCommunicator {
    static URI = "/user";

    static async upload(user) {
        const request = RequestBuilder.build("POST", this.URI, user.toJson());
        return fetch(request);
    }

    static async delete(userId) {
        const request = RequestBuilder.build("DELETE", this.URI.concat('/', userId), null);
        return fetch(request);
    }
    static async update(user) {
        const request = RequestBuilder.build("PUT", this.URI.concat("/", user.id), user.toJson());
        return fetch(request);
    }
    static async get(userId) {
        const request = RequestBuilder.build("GET", this.URI.concat("/", userId), null);
    }
}