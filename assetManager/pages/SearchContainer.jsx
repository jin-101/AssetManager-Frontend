//연습중..
import { Box, Center, Divider, Input, View } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { footerHeight } from "../styles";

function SearchContainer() {
  console.log("SeachContainer >>>");

  return (
    <>
      <View>
        <Center>
          <Box
            bg="blue.100"
            w="90%"
            h={120}
            p="5"
            borderRadius="2xl"
            mt="10"
            mb="10"
            justifyContent={"center"}
          >
            <Input bg={"white"}></Input>
            <Box position={"absolute"} right={30}>
              <AntDesign name="search1" size={30} color="black" />
            </Box>
          </Box>
          <Divider />
          <Box
            bg={"amber.700"}
            w="90%"
            h={300}
            mt="10"
            borderRadius="2xl"
          ></Box>
        </Center>
      </View>
      <View style={{ height: footerHeight }}></View>
    </>
  );
}

export default SearchContainer;
