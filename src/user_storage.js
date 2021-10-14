import AsyncStorage from '@react-native-async-storage/async-storage';


export default class UserStorage {
    static USER_KEY = "@user";

    static async set_user(user) {
        await AsyncStorage.setItem(UserStorage.USER_KEY, JSON.stringify(user));
    }
    static async get_user() {
        return JSON.parse(await AsyncStorage.getItem(UserStorage.USER_KEY));
    }

    static async clear() {
        await AsyncStorage.clear()
    }
}