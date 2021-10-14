import RequestBuilder from "./request_builder";
import { fetch } from 'cross-fetch';
import Finding from '../finding';
import { FindingNotFoundError } from "../errors/finding_errors";



export default class FindingCommunicator {
    static URI = "/finding";

    static async upload(finding) {
        const request = RequestBuilder.build("POST", this.URI, finding.toJson());
        const result = await fetch(request);

        if (result.status != 200) {
            throw new Error("Something went wrong while uploading");
        }
    }

    static async delete(findingId) {
        const request = RequestBuilder.build("DELETE", this.URI.concat("/", findingId), null);
        const result = await fetch(request);

        if (result.status != 200) {
            throw new Error("Something went wrong while deleting");
        } 
    }

    static async get(findingId) {
        const request = RequestBuilder.build("GET", this.URI.concat("/", findingId), null);
        const result = await fetch(request);

        if (result.status == 200) {
            const json_res = await result.json()
            const finding = Finding.fromJson(json_res.result);
            return finding;
        } else if (result.status == 404) {
            throw new FindingNotFoundError("Finding Not Found");
        } else {
            throw new Error("Something went wrong with fetching Finding");
        }
    }

    static async get_by_radius(radius, location) {
        const payload = { radius: radius, longitude: location.longitude, latitude: location.latitude };
        const request = RequestBuilder.build("POST", this.URI.concat("/by_radius"), payload);
        const result = await fetch(request);

        if (result.status == 200) {
            const json_res = await result.json();
            return json_res.result;
        } else {
            throw new Error("Something Went Wrong with fetching finding by radius");
        }
    }
}