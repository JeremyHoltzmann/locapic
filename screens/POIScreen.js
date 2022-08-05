import { KeyboardAvoidingView } from "react-native";
import React from "react";
import { ListItem, Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
function POIScreen(props) {
  var tmpPOIList = props.POIList.map((element, i) => {
    return (
      <ListItem key={i} onPress={() => props.removePOI(element.title)}>
        <ListItem.Content>
          <ListItem.Title>{element.title}</ListItem.Title>
          <ListItem.Subtitle>{element.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      {tmpPOIList}
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return { POIList: state.POIList };
}

function mapDispatchToProps(dispatch) {
  return {
    removePOI: function (title) {
      dispatch({ type: "removePOI", title });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(POIScreen);
