


export default class Finding {
    constructor(id, location, tags, image_hash, image) {
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
}