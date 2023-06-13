import React, { useCallback } from "react";
import { Box, HStack, VStack, Text } from "native-base";
import InputRadioComponent from "@components/InputRadioComponent";
import InputTextComponent from "@components/InputTextComponent";
import InputDateComponent from "@components/InputDateComponent";
import { useDispatch } from "react-redux";
import { depositDelete, depositUpdate } from "../action";
import { IconButton } from "react-native-paper";
import { makeDateString } from "../utils";

function DepositAddContainer({ item, isOnlyOne }) {
  console.log("DepoAddContainer >>", item);

  const dispatch = useDispatch();
  const startDate = item["startDate"];
  const endDate = item["endDate"];
  const currentDate = makeDateString(new Date());
  const year = Number(currentDate.substring(0, 4));

  const deleteButton = useCallback(() => {
    dispatch(depositDelete(item.index));
  }, []);

  return (
    <VStack alignItems="center">
      <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
        <HStack
          justifyContent="space-around"
          alignItems="center"
          mb="5"
          borderRadius="lg"
          backgroundColor="amber.100"
        >
          <Text fontSize="25" color="black">
            상품 정보 추가
          </Text>
          <IconButton
            icon="delete"
            disabled={isOnlyOne}
            iconColor={"red"}
            size={40}
            style={{
              margin: 0,
              padding: 0,
            }}
            onPress={deleteButton}
          />
        </HStack>
        <InputRadioComponent
          name="depositType"
          formControlProps={{ mb: "5", isDisabled: true }}
          formControlLabelProps={{
            w: "40%",
            _disabled: {
              ...{
                _text: {
                  fontSize: "lg",
                  color: "black",
                  fontWeight: "bold",
                },
              },
            },
          }}
          title={"상품 선택"}
          radioButtonList={[
            {
              text: "예금",
              value: "deposit",
              liStyle: { alignItems: "center", mr: "10" },
            },
            {
              text: "적금",
              value: "saving",
              liStyle: { alignItems: "center" },
            },
          ]}
          id={item.index}
          value={item["depositType"]}
          dispatchF={depositUpdate}
        />
        <InputDateComponent
          name="startDate"
          formControlStyle={{ mb: "5" }}
          title={"가입일"}
          helperText={"상품 가입일을 선택하세요."}
          id={item.index}
          value={startDate || currentDate}
          dispatchF={depositUpdate}
          inputStyle={{ color: startDate ? "black" : "lightgray" }}
          datePickerProps={{
            type: "YYYY-MM-DD",
            minDate: `${year - 5}-01-01`,
            maxDate: `${year + 5}-12-31`,
            daySuffix: "일",
            width: 300,
            rowHeight: 60,
            selectedBorderLineWidth: "2",
            toolBarCancelStyle: { color: "black" },
          }}
        />
        <InputDateComponent
          name="endDate"
          formControlStyle={{ mb: "5" }}
          title={"만기일"}
          helperText={"상품 만기일을 입력하세요."}
          id={item.index}
          value={endDate || currentDate}
          dispatchF={depositUpdate}
          inputStyle={{ color: endDate ? "black" : "lightgray" }}
          datePickerProps={{
            type: "YYYY-MM-DD",
            minDate: `${year - 5}-01-01`,
            maxDate: `${year + 5}-12-31`,
            daySuffix: "일",
            width: 300,
            rowHeight: 60,
            selectedBorderLineWidth: "2",
            toolBarCancelStyle: { color: "black" },
          }}
        />
        <InputTextComponent
          name="price"
          inputType={"number"}
          priceFormat={true}
          formControlProps={{ mb: "5" }}
          textLabel={{ endText: "원" }}
          inputStyle={{ width: "90%" }}
          title={"금액"}
          helperText={"예치금액 / 적립금액을 입력하세요."}
          alertContent={"정확한 금액을 입력해주세요."}
          id={item.index}
          value={item["price"] || ""}
          placeholder="0"
          dispatchF={depositUpdate}
        />
        <InputTextComponent
          name="rate"
          inputType={"double"}
          formControlStyle={{ mb: "10" }}
          textLabel={{ endText: "%" }}
          inputStyle={{ width: "90%" }}
          title={"금리"}
          helperText={"상품가입 시 적용 금리(이자율)를 입력하세요."}
          alertContent={"금리를 올바르게 입력해주세요."}
          id={item.index}
          value={item["rate"] || ""}
          placeholder="0"
          dispatchF={depositUpdate}
        />
      </Box>
    </VStack>
  );
}

export default React.memo(DepositAddContainer);
