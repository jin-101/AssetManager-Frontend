import React from "react";
import Titlebar from "@components/Titlebar";
import { ScrollView } from "react-native";
import { Box, Text } from "native-base";

function AssetContainer() {
  return (
    <>
      <Titlebar title={"3.자산"} />
      <ScrollView>
        <Box>
          <Text fontSize="4xl">자산 콘텐츠 화면 만들기</Text>
        </Box>
      </ScrollView>
    </>
  );
}

export default AssetContainer;
