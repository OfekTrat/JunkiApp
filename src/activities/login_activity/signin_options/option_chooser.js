import GoogleSigninWrapper from "./google_signin";
import RegularSignin from "./regular_signin";


export default class SignInOptionChooser {
    static choose(platform, email, password) {
        switch (platform) {
            case "google":
                return GoogleSigninWrapper.signin();
            case "regular":
                if (email == '' | password == '') {
                    throw Error("Empty Credentials");
                }
                return RegularSignin.signin(email, password);
            default:
                Alert.alert("Choose something");
                return null;
        }
    }
}