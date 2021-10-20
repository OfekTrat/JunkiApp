import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './user';


export default class UserStorage {
    static USER_KEY = "@user";

    static async set_user(user) {
        const userJson = user.toJson();
        const userString = JSON.stringify(userJson);
        await AsyncStorage.setItem(UserStorage.USER_KEY, userString);
    }
    static async get_user() {
        const userString = await AsyncStorage.getItem(this.USER_KEY);
        const userJson = JSON.parse(userString);
        return User.fromJson(userJson);
    }

    static async clear() {
        await AsyncStorage.clear()
    }
}