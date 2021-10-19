import Image from "../../src/image";
import base64 from 'react-native-base64';


test("Creation of Image", () => {
    const image = new Image("hash", "image_data");
    expect(image.hash).toBe("hash");
    expect(image.data).toBe("image_data");
});

test("Creating a readable json out of image", () => {
    const image = new Image("hash", "image_data");
    const imageJson = image.toJson();

    expect(imageJson.hash).toBe(image.hash);
    expect(imageJson.data).toBe(base64.encode(image.data));
});


test("Create from json", () => {
    const imageJson = {
        hash: "hash",
        data: base64.encode("image_data")
    };
    const image = Image.fromJson(imageJson);

    expect(image.hash).toBe(imageJson.hash);
    expect(image.data).toBe("image_data");
});