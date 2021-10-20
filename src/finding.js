import { BadFindingJsonError } from "./errors/finding_errors";
import Location from "./location";


export default class Finding {
    constructor(id, location, tags, image_hash) {
        this.id = id;
        this.location = location;
        this.tags = tags;
        this.image_hash = image_hash;
    }

    toJson() {
        return {
            id: this.id,
            longitude: this.location.longitude,
            latitude: this.location.latitude,
            tags: this.tags,
            image_hash: this.image_hash
        };
    }

    static fromJson(findingJson) {
        if (this._validateJson(findingJson)) {
            return new Finding(
                findingJson.id, 
                new Location(findingJson.longitude, findingJson.latitude),
                findingJson.tags,
                findingJson.image_hash
            );
        } else {
            throw new BadFindingJsonError();
        }
        
    }
    static _validateJson(findingJson) {
        return ("id" in findingJson) & ("longitude" in findingJson) & ("latitude" in findingJson) &
                ("tags" in findingJson) & ("image_hash" in findingJson);
    }
}