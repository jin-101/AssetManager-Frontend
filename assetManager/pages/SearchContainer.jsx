//연습중..
import { Box, Center, Divider, Input, Text, View } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { footerHeight, windowHeight } from "../styles";
import ContentScrollView from "../components/ContentScrollView";

function SearchContainer() {
  console.log("SeachContainer >>>");

  return (
    <>
      <View>
        <Center>
          <Box
            bg="blue.100"
            w="90%"
            h={windowHeight * 0.12}
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
            bg={"gray.200"}
            w="90%"
            h={windowHeight * 0.5}
            mt="10"
            mb="10"
            borderRadius="2xl"
          >
            <ContentScrollView>
              <Text fontSize={25}>aaaaaaa</Text>
              <Text fontSize={25}>bbbbbbb</Text>
              <Text fontSize={25}>ccccccc</Text>
              <Text fontSize={25}>ddddddd</Text>
              <Text fontSize={25}>eeeeeee</Text>
              <Text fontSize={25}>aaa</Text>
              <Text fontSize={25}>bbb</Text>
              <Text fontSize={25}>ccc</Text>
              <Text fontSize={25}>ddd</Text>
              <Text fontSize={25}>esee</Text>
              <Text fontSize={25}>aaaaa</Text>
              <Text fontSize={25}>bbbbb</Text>
              <Text fontSize={25}>ccccc</Text>
              <Text fontSize={25}>ddddd</Text>
              <Text fontSize={25}>eeeee</Text>
            </ContentScrollView>
          </Box>
        </Center>
      </View>
      <View style={{ height: footerHeight }}></View>
    </>
  );
}

export default SearchContainer;
