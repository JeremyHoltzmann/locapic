import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import { ListItem, Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect } from "react";

import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://192.168.10.120:3000");

function ChatScreen(props) {
  const [messageInput, setMessageInput] = useState("");

  const [messageList, setMessageList] = useState([]);

  function sendMessageToBack() {
    socket.emit("sendMessage", {
      userName: props.userName,
      message: messageInput,
    });
    setMessageInput("");
  }

  var regExp1 = /(?:\:\))/gm;
  var regExp2 = /(?:\:\()/gm;
  var regExp3 = /((fuck))/gim;

  useEffect(() => {
    socket.on("sendMessageFromBack", (newMessage) => {
      var tmpMessageList = [...messageList];
      var message = newMessage.message;
      message = message
        .replace(regExp3, "\u2022\u2022\u2022")
        .replace(regExp2, "\u2639")
        .replace(regExp1, "\u263A");
      console.log(
        "🚀 ~ file: ChatScreen.js ~ line 34 ~ socket.on ~ message",
        message
      );

      tmpMessageList.push({ userName: newMessage.userName, message });
      console.log(
        "🚀 ~ file: ChatScreen.js ~ line 34 ~ socket.on ~ tmpMessageList",
        tmpMessageList
      );
      setMessageList(tmpMessageList);
    });
  }, [messageList]);

  var messageElements = messageList.map((element, i) => {
    return (
      <ListItem key={i} title="Test" subtitle="Test">
        <ListItem.Content>
          <ListItem.Title>{element.userName}</ListItem.Title>
          <ListItem.Subtitle>{element.message}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <ScrollView
        contentContainerStyle={{ margin: 10 }}
        style={{ margin: 20, height: "50%" }}
      >
        {messageElements}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Input
          placeholder="Message"
          onChangeText={(value) => setMessageInput(value)}
          value={messageInput}
        ></Input>
        <Button
          title="Send"
          icon={{
            type: "antdesign",
            name: "mail",
            color: "white",
          }}
          containerStyle={{ width: "100%", height: 40 }}
          style={{ width: "100%" }}
          buttonStyle={{ backgroundColor: "#eb4d4b" }}
          onPress={() => sendMessageToBack()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return { userName: state.userName };
}

export default connect(mapStateToProps, null)(ChatScreen);
