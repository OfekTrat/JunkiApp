import { StyleSheet } from "react-native";


export const style_map = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    buttonView: {
        position: 'absolute',
        top: '88%',
        right: '5%',
    },
    button: {
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:65,
            height:65,
            backgroundColor:'rgb(106, 110, 205)',
            borderRadius:32,
    },
    buttonText: {
        fontSize: 25, 
        textAlign: 'center', 
        color: "white"
    },
    searchTags: {
        position: 'absolute',
        borderWidth: 1,
        backgroundColor: 'white',
        width: '100%'
    }
});