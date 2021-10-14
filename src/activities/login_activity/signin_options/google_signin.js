import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default class GoogleSigninWrapper {
    static configure() {
        GoogleSignin.configure({
            webClientId: '1011500368469-lengo33pv1binlkicqn7evn2tg82pilg.apps.googleusercontent.com',
            offlineAccess: true
        });
    }
    static async signin() {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredentials);
    }
}