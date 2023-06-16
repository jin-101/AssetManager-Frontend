import React from "react";

import { ScrollView, Pressable, Text } from "react-native";
import { Box,Button} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"

function AssetContainer() {

  const navigation = useNavigation();
  const onPressStock = () => {
    navigation.navigate("stockCrud")
  };

  return (
    <>
      <ScrollView>
        <Box h={"250"} bg={"amber.100"}>
          <Text fontSize="4xl">자산 콘텐츠 화면 만들기</Text>
        </Box>

        <Box h={"150"} bg={"blue.300"}>
          <ScrollView horizontal>
            <Box bg={"amber.100"}>
              <Pressable onPress={() => {}}>
                <AntDesign name="bars" size={24} color="white" />
                <Text style={{ color: "white" }}>예/적금</Text>
              </Pressable>
            </Box>
            <Box bg={"amber.100"}>
              <Button onPress={onPressStock}> 주식crud</Button>
            </Box>
            <Box bg={"amber.100"}></Box>
          </ScrollView>
        </Box>
      </ScrollView>
    </>
  );
}

export default AssetContainer;
