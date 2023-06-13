import { Box, HStack, Heading, Spinner, View } from "native-base";
import React from "react";
import { modalBg } from "../styles";

function Loading(props) {
  return (
    <View>
      <Box style={{ ...modalBg, opacity: 0.2 }}></Box>
      <Box style={{ ...modalBg, opacity: 0 }}></Box>
      <HStack w="100%" h="100%" alignItems="center" justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
}

export default Loading;
