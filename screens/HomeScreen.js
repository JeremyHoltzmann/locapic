import { View, ImageBackground, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";

import { Button, Input } from "react-native-elements";

import { connect } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen(props) {
  const [userName, setUserName] = useState("");
  const [storageName, setStorageName] = useState("");

  var userNameBlock = (
    <Input
      style={{ width: "20%" }}
      placeholder="Pseudo"
      leftIcon={{ type: "ionicon", name: "person", color: "#eb4d4b" }}
      onChangeText={(value) => setUserName(value)}
      value={userName}
    ></Input>
  );

  useEffect(() => {
    AsyncStorage.getItem("userName", function (err, data) {
      setStorageName(data);
      setUserName(data);
    });
  }, []);

  if (storageName !== null) {
    console.log("Set");
    userNameBlock = <Text>Welcome Back {storageName}</Text>;
  } else {
    console.log("Not Set");

    userNameBlock = (
      <Input
        style={{ width: "20%" }}
        placeholder="Pseudo"
        leftIcon={{ type: "ionicon", name: "person", color: "#eb4d4b" }}
        onChangeText={(value) => setUserName(value)}
        value={userName}
      ></Input>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
        source={require("../assets/home.jpg")}
        resizeMode="cover"
      >
        {userNameBlock}

        <Button
          title="Go To Page Map"
          icon={{ type: "antdesign", name: "arrowright", color: "#eb4d4b" }}
          onPress={() => {
            props.navigation.navigate("Map");
            props.setUserName(userName);
            AsyncStorage.setItem("userName", userName);
          }}
          type="outline"
        />
      </ImageBackground>
    </View>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    setUserName: function (userName) {
      dispatch({ type: "setUserName", userName });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
