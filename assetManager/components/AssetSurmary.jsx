import { Box, Center, HStack, Text } from "native-base";
import React from "react";
import { inputPriceFormat } from "../utils";
import { Button } from "react-native-paper";
import {
  leftPaperButton,
  rightPaperButton,
  rightPaperButtonNoWidth,
} from "../styles";

function AssetSurmary({
  data,
  title,
  textListInfo,
  updateBtn = { title: "", onPress: () => {} },
  serviceBtn = { title: "", onPress: () => {} },
}) {
  const { title: updateBtnTitle = "", onPress: updateBtnOnPress = () => {} } =
    updateBtn;
  const { title: serviceBtnTitle = "", onPress: serviceBtnOnPress = () => {} } =
    serviceBtn;

  return (
    <Center borderRadius={20} mt={8} mb={10}>
      <Box>
        <Text fontSize={20} mb={5} fontWeight={"bold"}>
          {title}
        </Text>
      </Box>
      <Box w={"90%"}>
        {data?.map((el, index) => (
          <Box
            bgColor={"#ECEEFF"} // 기존 : amber.50
            key={index}
            mt={index === 0 ? 2.5 : 5}
            mb={index === data?.length - 1 ? 5 : 2.5}
            padding={5}
            borderRadius={20}
          >
            {textListInfo?.map((li, idx) => (
              <HStack key={idx}>
                <Text fontSize={15} fontWeight={"semibold"}>
                  {li?.title + " : "}
                </Text>
                <Text fontSize={15}>
                  {li?.isPrice ? inputPriceFormat(el[li?.key]) : el[li?.key]}
                  {li?.unit}
                </Text>
              </HStack>
            ))}
          </Box>
        ))}
      </Box>
      <HStack>
        <Button
          {...leftPaperButton}
          style={{ marginRight: 5 }}
          //mb="2.5"
          //mx="1"
          onPress={updateBtnOnPress}
        >
          {updateBtnTitle}
        </Button>
        <Button
          {...rightPaperButtonNoWidth}
          //mb="2.5"
          //mx="1"
          onPress={serviceBtnOnPress}
        >
          {serviceBtnTitle}
        </Button>
      </HStack>
    </Center>
  );
}

export default AssetSurmary;
