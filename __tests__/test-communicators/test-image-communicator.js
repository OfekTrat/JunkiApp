import ImageCommunicator from '../../src/api_communicators/image_communicator';
import Image from '../../src/image';


test("Getting existing image", async () => {
    const image = await ImageCommunicator.get("test");
    console.log(image);
    expect(image.hash).toBe("test");
    
})