import { StyleSheet } from "react-native";


export const captureButtonStyle = StyleSheet.create({
    button: {
         borderWidth:1,
         borderColor:'rgba(0,0,0,0.2)',
         alignItems:'center',
         justifyContent:'center',
         width:65,
         height:65,
         backgroundColor:'rgb(128, 128, 128)',
         borderRadius:32,
    },
    buttonView: {
        position: 'absolute',
        top: '90%',
        alignSelf: 'center'
    }
 });

 export const screenStyle = {
     flex: 1
 }

