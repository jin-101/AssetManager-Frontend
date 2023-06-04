import React from "react";
import Titlebar from "@components/Titlebar";
import { ScrollView } from "react-native";
import { Box, Text } from "native-base";

function SearchContainer() {
  return (
    <>
      <Titlebar title={"2.검색"} />
      <ScrollView>
        <Box>
          <Text fontSize="4xl">검색 콘텐츠 화면 만들기</Text>
        </Box>
      </ScrollView>
    </>
  );
}

export default SearchContainer;
