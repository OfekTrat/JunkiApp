import ImageCommunicator from '../../src/api_communicators/image_communicator';
import { ImageNotFoundError } from '../../src/errors/image_errors';
import Image from '../../src/image';


test("Getting existing image", async () => {
    const image = await ImageCommunicator.get("test");
    expect(image.hash).toBe("test");
    expect(image.data).toBe("test_image_data");
});


test("Uploading and deleting image", async () => {
    const image = new Image("test_react", "1234567890");
    await ImageCommunicator.upload(image);
    const uploadedImage = await ImageCommunicator.get(image.hash);
    await ImageCommunicator.delete(image.hash);
    
    expect(uploadedImage.hash).toBe(image.hash);
    expect(uploadedImage.data).toBe(image.data);

    try {
        const newImage = await ImageCommunicator.get(image.hash);
        expect(2).toBe(1);
    } catch (err) {
        expect(err).toBeInstanceOf(ImageNotFoundError);
    }
});