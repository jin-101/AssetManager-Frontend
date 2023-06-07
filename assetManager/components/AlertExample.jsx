import React from "react";
import { View, Button, Alert } from "react-native";

const AlertExample = () => {
  const showAlert = () => {
    Alert.alert("Title", "Message", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
      { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
    ]);
  };

  return (
    <View>
      <Button title="Alert 버튼 테스트 중" onPress={showAlert} />
    </View>
  );
};

export default AlertExample;
