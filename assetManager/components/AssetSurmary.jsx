import { Box, Center, HStack, Text, Button } from "native-base";
import React from "react";
import { inputPriceFormat } from "../utils";

function AssetSurmary({
  data,
  title,
  textListInfo,
  onPressUpdate,
  onPressAdditional,
}) {
  return (
    <Center borderRadius={20} mt={10} mb={10}>
      <Box>
        <Text fontSize={20} mb={5} fontWeight={"bold"}>
          {title}
        </Text>
      </Box>
      <Box w={"90%"}>
        {data?.map((el, index) => (
          <Box
            bgColor={"amber.50"}
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
        <Button mb="5" mx="1" onPress={onPressUpdate}>
          내역수정
        </Button>
        <Button mb="5" mx="1" onPress={onPressAdditional}>
          부가기능
        </Button>
      </HStack>
    </Center>
  );
}

export default AssetSurmary;
