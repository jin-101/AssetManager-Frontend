import React from "react";
import Titlebar from "@components/Titlebar";
import { ScrollView } from "react-native";
import { Box, Text } from "native-base";

function AccountBookContainer() {
  return (
    <>
      <Titlebar title={"4.가계부"} />
      <ScrollView>
        <Box>
          <Text fontSize="4xl">가계부 콘텐츠 화면 만들기</Text>
        </Box>
      </ScrollView>
    </>
  );
}

export default AccountBookContainer;
