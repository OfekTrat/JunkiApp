import auth from '@react-native-firebase/auth'



export default class UserCreator {
    static create(email, password) {
        return auth().createUserWithEmailAndPassword(email, password)
    }
}