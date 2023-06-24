import { AntDesign } from "@expo/vector-icons";
import { HStack, Pressable, Stack, Text } from "native-base";
import React, { useState } from "react";

function Counter({
  title,
  titleProps,
  counterSize = 24,
  name,
  state = 0,
  isDisabled = false,
  onChange = () => {},
}) {
  const color = isDisabled ? "gray" : "black";
  const increase = () => {
    onChange("plus", name);
  };
  const decrease = () => {
    onChange("minus", name);
  };
  return (
    <HStack justifyContent={"space-between"} alignItems={"center"} mb={5}>
      <Text ml={5} fontSize={20} {...titleProps}>
        {title}
      </Text>
      <HStack alignItems={"center"} justifyContent={"flex-end"}>
        <Pressable ml={5} mr={5} onPress={isDisabled ? () => {} : decrease}>
          <AntDesign name="minuscircleo" size={counterSize} color={color} />
        </Pressable>
        <Text fontSize={counterSize - 4} color={color}>
          {state}
        </Text>
        <Pressable ml={5} mr={5} onPress={isDisabled ? () => {} : increase}>
          <AntDesign name="pluscircleo" size={counterSize} color={color} />
        </Pressable>
      </HStack>
    </HStack>
  );
}

export default Counter;
