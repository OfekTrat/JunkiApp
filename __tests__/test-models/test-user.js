import User from "../../src/user";
import Location from "../../src/location";
import { BadUserJsonError } from '../../src/errors/user_errors';

test("Building User", () => {
    const user = new User("1234", "1234567890", new Location(1, 2.2), 2, ["a", "b"]);
    expect(user.id).toBe("1234");
    expect(user.lastNotified).toBe("1234567890");
    expect(user.location.longitude).toBe(1);
    expect(user.location.latitude).toBe(2.2);
    console.log(user.tags);
    expect(user.tags[0]).toBe("a");
    expect(user.tags[1]).toBe("b");
});

test("Build User from Json", () => {
    const userJson = {
        id: "test",
        last_notified: "6543",
        longitude: 1,
        latitude: 2,
        radius: 4,
        tags: ["1", "2"]
    };
    const user = User.fromJson(userJson);

    expect(user.id).toBe("test");
    expect(user.lastNotified).toBe("6543");
    expect(user.location.longitude).toBe(1);
    expect(user.location.latitude).toBe(2);
    expect(user.radius).toBe(4);
    expect(user.tags[0]).toBe("1");
    expect(user.tags[1]).toBe("2");
});

test("Building User from incomplete Json", () => {
    const userJson = {
        id: "test_incomplete",
        last_notified: "1234"
    };
    try {  
        const user = User.fromJson(userJson);
    } catch (err) {
        expect(err).toBeInstanceOf(BadUserJsonError);
    }
});


test("Create Json from user", () => {
    const user = new User("1234", "1234567890", new Location(1, 2.2), 2, ["a", "b"]);
    const userJson = user.toJson();

    expect(userJson.id).toBe("1234");
    expect(userJson.last_notified).toBe("1234567890");
    expect(userJson.longitude).toBe(1);
    expect(userJson.latitude).toBe(2.2);
    expect(userJson.radius).toBe(2);
    expect(userJson.tags[0]).toBe("a");
    expect(userJson.tags[1]).toBe("b");
});