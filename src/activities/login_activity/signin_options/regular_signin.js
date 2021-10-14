import auth from '@react-native-firebase/auth';


export default class RegularSignin {
    static async signin(email, password) {
        return auth().signInWithEmailAndPassword(email, password);
    }
}