import React from "react";
import TagsInfo from "./api_communicators/tags_info";
import PickerCheckBox from 'react-native-picker-checkbox';
import { Text } from 'react-native';


export default class TagPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: []
        };

        this.possibleTags = TagsInfo.get();
    }

    setChosenTags = (tags) => {
        const selectedTags = [];

        for (let i = 0; i < tags.length; i++) {
            selectedTags.push(tags[i].tag);
        }

        this.setState({ selectedTags: selectedTags});
        this.props.setChosenTags(selectedTags);
    }

    getSelectedItems = () => {
        return this.state.selectedTags.join(", ");
    }

    render() {
        return (
            <PickerCheckBox
                data={this.possibleTags}
                headerComponent={<Text>Tags</Text>}
                OnConfirm={this.setChosenTags}
                ConfirmButtonTitle="OK"
                DescriptionField="tag"
                KeyField="key"
                placeholder="Tags"
                placeholderSelectedItems={this.state.selectedTags.join(", ")}/>
        )
    }
}