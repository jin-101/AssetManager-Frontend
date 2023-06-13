import { HStack, Heading, Spinner, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

function Loading(props) {
  return (
    <View>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
}

const loadingStyle = StyleSheet.create({});

export default Loading;
