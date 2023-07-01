import React, { useCallback } from "react";
import { Box, ScrollView, Stack, VStack } from "native-base";

import InputDateComponent from "@components/InputDateComponent";
import InputTextComponent from "@components/InputTextComponent";
import { makeDateString } from "../utils";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { goldInputReset, goldInputUpdate } from "../action";
import axios from "axios";
import { apiPath } from "../services";
import { boxStyle, leftPaperButton, rightPaperButton } from "../styles";
import { Button } from "react-native-paper";

function GoldAddPage() {
  const currentDate = makeDateString(new Date());
  const year = Number(currentDate.substring(0, 4));
  const { buyGram, buyDate, buyPrice } = useSelector((state) => state.gold);
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onReset = useCallback(() => {
    dispatch(goldInputReset());
  }, [buyGram, buyDate, buyPrice]);

  const onSubmit = useCallback(() => {
    const buyDay = buyDate;
    const goldInputDTO = {
      userId: token,
      price: buyPrice,
      buyDay,
      buyGram,
    };

    console.log(goldInputDTO);

    try {
      if (
        goldInputDTO.price === "" ||
        goldInputDTO.buyDay === "" ||
        goldInputDTO.buyGram === ""
      ) {
        throw new Error("모든");
      }

      axios
        .post(`${apiPath}/gold/goldAssetInput`, null, { params: goldInputDTO })
        .then(function (response) {
          if (response.data === "등록완료") {
            Alert.alert("자산등록완료");
            onReset();
          } else {
            Alert.alert("자산등록실패 다시 등록해주세요");
          }
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert("서버에러 잠시만 기다려주세요0");
        });
    } catch (error) {
      Alert.alert("모든요소를 입력하세요");
      onReset();
    }
  }, [buyGram, buyDate, buyPrice]);

  return (
    <ScrollView>
      <VStack alignItems="center" mt="5" mb="5">
        <Box {...boxStyle} mt="5" mb="5">
          <Box w="100%">
            {/* <FormControl> */}
            <InputTextComponent
              name="buyGram"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "보유수량" }}
              textInputStyle={{ width: "100%" }}
              placeholder="gram 단위로 입력해주세요 EX)30g"
              value={buyGram}
              dispatchF={goldInputUpdate}
            />
            <InputDateComponent
              name="buyDate"
              formControlProps={{ w: "100%", mt: "0" }}
              formControlLabelProps={{ text: "매수날짜" }}
              value={buyDate}
              dispatchF={goldInputUpdate}
              datePickerProps={{
                type: "YYYY-MM-DD",
                minDate: `${year - 30}-01-01`,
                maxDate: `${year + 1}-12-31`,
                daySuffix: "일",
                width: 300,
                rowHeight: 60,
                selectedBorderLineWidth: "2",
                toolBarCancelStyle: { color: "black" },
              }}
            />
            <InputTextComponent
              name="buyPrice"
              inputType={"number"}
              formControlProps={{ mb: "2.5" }}
              formControlLabelProps={{ text: "매수가격" }}
              textInputStyle={{ width: "100%" }}
              value={buyPrice}
              dispatchF={goldInputUpdate}
            />
            <Stack
              mb="2.5"
              direction="row" // direction="row" => "column"으로 바꾸면 수직으로 쌓이게 됨
              space={2}
              // mx 이거 적용하면 버튼 너비가 줄어듦.
              mx={{
                base: "auto",
                md: "0",
              }}
            >
              <Button {...leftPaperButton} onPress={onReset}>
                초기화
              </Button>
              <Button
                {...rightPaperButton}
                style={{ width: "50%" }}
                onPress={onSubmit}
              >
                자산등록
              </Button>
            </Stack>
            {/* </FormControl> */}
          </Box>
        </Box>
      </VStack>
    </ScrollView>
  );
}

export default GoldAddPage;
