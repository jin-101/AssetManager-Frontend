import { Box, HStack, Text } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { inputPriceFormat } from "../utils";

const screenWidth = Dimensions.get("window").width;

function ChartLabelComponent({
  labelColor = "gray.100",
  dotRatio = 0.04,
  label = "알수없음",
  currentValue = 0,
  totalValue = 1,
}) {
  const chartCircleSize = screenWidth * dotRatio;
  const percentText = Math.round((currentValue / totalValue) * 1000) / 10 + "%";
  const labelText = label + "  " + percentText;
  return (
    <HStack justifyContent={"space-between"} ml={5} mr={5} mt={3} mb={3}>
      <HStack alignItems={"center"}>
        <Box
          bg={labelColor}
          w={chartCircleSize}
          h={chartCircleSize}
          borderRadius={chartCircleSize * 0.5}
          mr={3}
        />
        <Text fontSize={20}>{labelText}</Text>
      </HStack>
      <Text fontSize={20}>{inputPriceFormat(currentValue)}원</Text>
    </HStack>
  );
}

export default ChartLabelComponent;
