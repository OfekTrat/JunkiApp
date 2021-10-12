import React from "react";
import { Text, View } from "react-native";





export default class ViewFindingActivity extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.route.params.finding);
        this.finding = this.props.route.params.finding;
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.finding)}</Text>
            </View>
        )
    }
}