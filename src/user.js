import { BadUserJsonError } from './errors/user_errors';
import Location from './location';


export default class User {
    constructor(id, lastNotified, location, radius, tags) {
        this.id = id;
        this.lastNotified = lastNotified;
        this.location = location;
        this.radius = radius;
        this.tags = tags;
    }

    toJson() {
        return {
            id: this.id,
            last_notified: this.lastNotified,
            longitude: this.location.longitude,
            latitude: this.location.latitude,
            radius: this.radius,
            tags: this.tags
        };
    }

    static fromJson(userJson) {
        if (this._validateJson(userJson)) {
            return new User(
                userJson.id,
                userJson.last_notified,
                new Location(userJson.longitude, userJson.latitude),
                userJson.radius,
                userJson.tags
            );
        } else {
            throw new BadUserJsonError();
        }  
    }
    static _validateJson(userJson) {
        return ("id" in userJson) & ("last_notified" in userJson) & ("longitude" in userJson) & 
                ("latitude" in userJson) & ("radius" in userJson) & ("tags" in userJson);

    }
}