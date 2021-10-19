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
        return new User(
            userJson.id,
            userJson.lastNotified,
            new Location(userJson.longitude, userJson.latitude),
            userJson.radius,
            userJson.tags
        );
    }
}