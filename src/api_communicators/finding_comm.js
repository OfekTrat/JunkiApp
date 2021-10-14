import RequestBuilder from "./request_builder";
import { fetch } from 'cross-fetch';



export default class FindingCommunicator {
    static URI = "/finding";

    static async upload(finding) {
        const request = RequestBuilder.build("POST", this.URI, finding.toJson());
        return fetch(request);
    }

    static async delete(findingId) {
        const request = RequestBuilder.build("DELETE", this.URI.concat("/", findingId), null);
        return fetch(request);
    }

    static async get(findingId) {
        const request = RequestBuilder.build("GET", this.URI.concat("/", findingId), null);
        return fetch(request);
    }

    static async get_by_radius(radius, location) {
        const payload = { radius: radius, longitude: location.longitude, latitude: location.latitude };
        const request = RequestBuilder.build("POST", this.URI.concat("/by_radius"), payload);
        return await fetch(request);
    }
}