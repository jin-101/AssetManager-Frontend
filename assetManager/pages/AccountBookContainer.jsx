import React from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "native-base";

function AccountBookContainer() {
  return (
    <>
      <ScrollView>
        <Box>
          <Text fontSize="4xl">가계부 콘텐츠 화면 만들기</Text>
        </Box>
      </ScrollView>
    </>
  );
}

export default AccountBookContainer;
