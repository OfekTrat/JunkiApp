import UserCommunicator from '../../src/api_communicators/user_communicator';
import { UserNotFoundError } from '../../src/errors/user_errors';
import Location from '../../src/location';
import User from "../../src/user";


test("Getting existing user", async () => {
    const user = await UserCommunicator.get("test");
    expect(user.id).toBe("test");
    expect(user.lastNotified).toBe("12345678");
});


test("Get nonexistant user", async () => {
    try {
        const user = await UserCommunicator.get("45yhjkojfr6h");
    } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundError);
    }
});

test("Upload User and Delete User", async () => {
    const newUser = new User("test_upload_react", "12345", new Location(1, 2), 3, ["a", "b"]);
    await UserCommunicator.upload(newUser);
    const user = await UserCommunicator.get("test_upload_react");
    expect(user.id).toBe("test_upload_react");

    await UserCommunicator._delete(user.id);
    try {
        const user = await UserCommunicator.get("test_upload_react");
    } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundError);
    }
});

test("Update user", async () => {
    const user = await UserCommunicator.get("test_updating");
    const newRadius = Math.floor(Math.random() * 100);
    const updatedUser = new User(user.id, user.lastNotified, user.location, newRadius, user.tags);
    
    await UserCommunicator.update(updatedUser);
    const user2 = await UserCommunicator.get("test_updating");
    expect(user2.radius).toBe(updatedUser.radius);
    expect(user2.radius).not.toBe(user.radius);
});