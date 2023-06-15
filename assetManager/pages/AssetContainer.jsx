import React from "react";
import { ScrollView } from "react-native";
import { Box, Button, Text } from "native-base";
import {useNavigation} from "@react-navigation/native"

function AssetContainer() {

  const navigation = useNavigation();
  const onPressStock = () => {
    navigation.navigate("stockCrud")
  };

  return (
    <>
      <ScrollView>
        <Box>
          <Text fontSize="4xl">자산 콘텐츠 화면 만들기</Text>
        </Box>
        <Box>
          <Button onPress={onPressStock}>주식CRUD Test</Button>
        </Box>
      </ScrollView>
    </>
  );
}

export default AssetContainer;
