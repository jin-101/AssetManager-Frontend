import { Box, HStack, Heading, Spinner, View } from "native-base";
import React from "react";
import { footerHeight, modalBg, windowHeight, windowWidth } from "../styles";

function Loading({ isMainPage }) {
  const gap = isMainPage ? footerHeight : 0;
  return (
    <View>
      <Box style={{ ...modalBg, opacity: 0 }}></Box>
      <Box style={{ ...modalBg, opacity: 0 }}></Box>
      <HStack
        w={windowWidth}
        h={windowHeight - gap}
        alignItems="center"
        justifyContent="center"
      >
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
}

export default Loading;
