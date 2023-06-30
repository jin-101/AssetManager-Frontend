import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HStack, Text, View } from "native-base";

function TempPage(props) {
  return (
    <View w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
      <HStack justifyContent={"center"} alignItems={"center"}>
        <Ionicons name="md-build" size={40} color="black" />
        <Text fontSize={30} color={"red.400"}>
          개발 예정 페이지입니다.
        </Text>
      </HStack>
    </View>
  );
}

export default TempPage;
