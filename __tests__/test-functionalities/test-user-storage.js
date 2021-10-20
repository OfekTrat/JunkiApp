import User from '../../src/user';
import UserStorage from "../../src/user_storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from '../../src/location';


test("Set User", async () => {
    await AsyncStorage.clear();
    const user = new User("userId", "123456789", new Location(1, 2), 1, ["1", "2"]);
    await UserStorage.set_user(user);
    const userAsString = await AsyncStorage.getItem(UserStorage.USER_KEY)
    const userAsJson = JSON.parse(userAsString);
    const savedUser = User.fromJson(userAsJson);

    expect(user.id).toBe(savedUser.id);
    expect(user.lastNotified).toBe(savedUser.lastNotified);
    expect(user.location.longitude).toBe(savedUser.location.longitude);
    await AsyncStorage.clear();
});


test("Get User", async () => {
    await AsyncStorage.clear();
    const user = new User("userId", "123456789", new Location(1, 2), 1, ["1", "2"]);
    await AsyncStorage.setItem(UserStorage.USER_KEY, JSON.stringify(user.toJson()));
    const savedUser = await UserStorage.get_user();

    expect(user.id).toBe(savedUser.id);
    expect(user.lastNotified).toBe(savedUser.lastNotified);
    expect(user.location.longitude).toBe(savedUser.location.longitude);

    await AsyncStorage.clear();
});