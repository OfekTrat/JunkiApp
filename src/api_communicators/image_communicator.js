import RequestBuilder from "./request_builder";
import Image from '../image';
import { ImageAlreadyExistsError, ImageNotFoundError } from "../errors/image_errors";
import { fetch } from 'cross-fetch';


export default class ImageCommunicator {
    static URI = "/image"

    static async get(image_hash) {
        const request = RequestBuilder.build("GET", this.URI.concat('/', image_hash), null);
        const result = await fetch(request);
        
        if (result.status == 200) {
            const json_res = await result.json();
            const image = Image.fromJson(json_res.result);
            return image;
        } else if (result.status == 404) {
            throw new ImageNotFoundError("Image Not Found");
        } else if (result.status == 400) {
            throw new Error("Something Went Wrong");
        }
    }

    static async upload(image) {
        const request = RequestBuilder.build("POST", this.URI, image.toJson());
        const result = await fetch(request);
        
        if (result.status == 302) {
            throw new ImageAlreadyExistsError("Image already exists somehow");
        } else if (result.status == 400) {
            throw new Error("Something Went Wrong");
        }
    }

    static async delete(imageHash) {
        const payload = { hashes: [imageHash]};
        const request = RequestBuilder.build("DELETE", this.URI, payload);
        const result = await fetch(request);
        
        if (result.status != 200) {
            throw new Error("Something went wrong");
        }
    }
}