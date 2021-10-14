import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    stretch: {
      width: "100%",
      height: "100%",
      resizeMode: 'stretch'
    }
  });

export default class ViewImageActivity extends Component {
    constructor(props) {
        super(props);
        this.image_data = props.route.params.image_data;
    }

    getImageData = () => {
        return "data:image/jpg;base64," + this.image_data;
    }

    render() {
        return (
            <View>
                <Image
                    style={styles.stretch}
                    source={{uri: this.getImageData()}}/>
            </View>
        )
    }
}