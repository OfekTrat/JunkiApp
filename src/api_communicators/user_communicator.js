import RequestBuilder from "./request_builder";
import { fetch } from 'cross-fetch';
import { UserAlreadyExistsError, UserNotFoundError } from "../errors/user_errors";
import User from "../user";


export default class UserCommunicator {
    static URI = "/user";

    static async upload(user) {
        const request = RequestBuilder.build("POST", this.URI, user.toJson());
        const result = await fetch(request);

        if (result.status == 302) {
            throw new UserAlreadyExistsError("Somehow this user already exists");
        } else if (result.status != 200) {
            throw new Error("Something went wrong while uploading user");
        }
    }

    static async update(user) {
        const request = RequestBuilder.build("PUT", this.URI.concat("/", user.id), user.toJson());
        const result = await fetch(request);

        if (result.status == 404) {
            throw new UserNotFoundError("User not found");
        } else if (result.status != 200) {
            throw new Error("Something went wrong");
        }
    }
    static async get(userId) {
        const request = RequestBuilder.build("GET", this.URI.concat("/", userId), null);
        const result = await fetch(request);

        if (result.status == 200) {
            const json_res = await result.json();
            return User.fromJson(json_res.result);
        } else if (result.status == 404) {
            throw new UserNotFoundError("User not found");
        } else {
            throw new Error("Something went wrong");
        }
    }
}