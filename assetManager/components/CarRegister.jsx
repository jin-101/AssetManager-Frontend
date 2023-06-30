import { Box, Center, HStack, Stack, Text } from "native-base";
import React, { useState } from "react";
import InputRadioComponent from "./InputRadioComponent";
import InputTextComponent from "./InputTextComponent";
import { carTaxCalculate, inputPriceFormat } from "../utils";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { leftPaperButtonNoWidth } from "../styles";

const textListInfo = [
  { title: "제조사", key: "company" },
  { title: "모델명", key: "model" },
  { title: "연식", key: "year", unit: "년식" },
];

function CarRegister({ element, index, totalLen }) {
  const [carUseType, setCarUseType] = useState("com");
  const [carBuyPrice, setCarBuyPrice] = useState(0);
  const [tax, setTax] = useState("");

  const useTypeUpdate = (value) => {
    setCarUseType(value);
  };
  const onChangeText = (text) => {
    setCarBuyPrice(text);
  };
  const onPress = () => {
    setTax(carTaxCalculate(element.model, carUseType, carBuyPrice));
  };
  return (
    <Stack>
      <Box
        bgColor={"white"}
        mt={index === 0 ? 1 : 2}
        mb={index === totalLen - 1 ? 2 : 1}
        padding={5}
        borderRadius={20}
      >
        {textListInfo?.map((li, idx) => (
          <HStack key={idx}>
            <Text fontSize={15} fontWeight={"semibold"}>
              {li?.title + " : "}
            </Text>
            <Text fontSize={15}>
              {li?.isPrice
                ? inputPriceFormat(element[li?.key])
                : element[li?.key]}
              {li?.unit}
            </Text>
          </HStack>
        ))}
        <InputRadioComponent
          name="carUseType"
          formControlProps={{ mt: 3, isDisabled: true }}
          formControlLabelProps={{
            text: "사용용도",
            fontWeight: "600",
            fontSize: 15,
          }}
          radioButtonList={[
            {
              text: "영업용",
              value: "com",
              liStyle: {
                alignItems: "center",
                ml: "5",
                mr: "10",
              },
              RadioButtonItemProps: { size: "sm" },
            },
            {
              text: "비영업용",
              value: "nonCom",
              liStyle: { alignItems: "center" },
              RadioButtonItemProps: { size: "sm" },
            },
          ]}
          formControlHelperProps={{ h: 0 }}
          // id={item.index}
          value={carUseType}
          parentSetState={useTypeUpdate}
        />
        <InputTextComponent
          name="fee"
          inputType="number"
          value={carBuyPrice}
          parentSetState={onChangeText}
          formControlLabelProps={{
            text: "매입가격",
            fontSize: 15,
            fontWeight: 600,
          }}
          priceFormat={true}
          textInputStyle={{ height: 35 }}
          formControlHelperProps={{ h: 0 }}
        />
        <Center mt={3}>
          <Button {...leftPaperButtonNoWidth} w={"40%"} onPress={onPress}>
            계산하기
          </Button>
        </Center>
        {tax && (
          <>
            <Box w={"100%"} mt={5}>
              <HStack>
                <Stack {...styles.table}>
                  <Text>등록세</Text>
                </Stack>
                <Stack {...styles.table}>
                  <Text>{inputPriceFormat(tax.register)}원</Text>
                </Stack>
              </HStack>
              <HStack>
                <Stack {...styles.table}>
                  <Text>취득세</Text>
                </Stack>
                <Stack {...styles.table}>
                  <Text>{inputPriceFormat(tax.get)}원</Text>
                </Stack>
              </HStack>
              <HStack>
                <Stack {...styles.table} bg={"light.100"}>
                  <Text>합계</Text>
                </Stack>
                <Stack {...styles.table} bg={"light.100"}>
                  <Text>{inputPriceFormat(tax.register + tax.get)}원</Text>
                </Stack>
              </HStack>
            </Box>
          </>
        )}
      </Box>
    </Stack>
  );
}

const styles = StyleSheet.create({
  table: {
    w: "50%",
    h: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.3,
  },
});
export default CarRegister;
