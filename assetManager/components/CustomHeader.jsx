import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

function CustomHeader() {
  const navigation = useNavigation();
  const { options } = navigation.getCurrentRoute();
  return (
    <View
      style={{
        height: 120,
        backgroundColor: "#4f69c6",
        borderBottomLeftRadius: 30,
      }}
    >
      <Text style={{ marginLeft: 10 }}>{options.title}</Text>
      {}
    </View>
  );
}

export default CustomHeader;
