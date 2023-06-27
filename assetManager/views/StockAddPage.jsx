import React from "react";
import { Box, FormControl, ScrollView, VStack, Button } from "native-base";
import InputDateComponent from "@components/InputDateComponent";
import InputTextComponent from "@components/InputTextComponent";
import { makeDateString } from "../utils";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { stockInputUpdate, stockInputReset } from "../action";
import axios from "axios";
import { apiPath } from "../services";
import { boxStyle } from "../styles";

function StockAddPage() {
  const currentDate = makeDateString(new Date());
  const year = Number(currentDate.substring(0, 4));
  const { stockName, buyPrice, buyQuantity, buyDate } = useSelector(
    (state) => state.stock
  );
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onRest = () => dispatch(stockInputReset());

  const onSubmit = () => {
    const buyDay = buyDate;
    const stockInputDTO = {
      userId: token,
      stockName,
      price: buyPrice,
      buyDay,
      shares: buyQuantity,
    };

    axios
      .post(`${apiPath}/stock/stockAssetInput`, null, { params: stockInputDTO })
      .then(function (response) {
        if (response.data === "등록완료") {
          Alert.alert("자산등록완료");
          onRest();
        } else {
          Alert.alert("자산등록실패 다시 등록해주세요");
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("서버에러 잠시만 기다려주세요0");
      });
  };

  return (
    <ScrollView>
      <VStack alignItems="center" mt="5" mb="5">
        <Box {...boxStyle} mt="5" mb="5">
          <Box w="100%">
            <InputTextComponent
              name="stockName"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "매수종목" }}
              textInputStyle={{ width: "100%" }}
              placeholder="EX)삼성전자"
              value={stockName}
              dispatchF={stockInputUpdate}
            />
            <InputDateComponent
              name="buyDate"
              formControlProps={{ w: "100%", mt: "0" }}
              formControlLabelProps={{ text: "매수날짜" }}
              value={buyDate}
              dispatchF={stockInputUpdate}
              datePickerProps={{
                type: "YYYY-MM-DD",
                minDate: `${year - 30}-01-01`,
                maxDate: `${year + 10}-12-31`,
                daySuffix: "일",
                width: 300,
                rowHeight: 60,
                selectedBorderLineWidth: "2",
                toolBarCancelStyle: { color: "black" },
              }}
            />
            <InputTextComponent
              name="buyPrice"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "매수가격" }}
              textInputStyle={{ width: "100%" }}
              value={buyPrice}
              dispatchF={stockInputUpdate}
            />
            <InputTextComponent
              name="buyQuantity"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "매수수량" }}
              textInputStyle={{ width: "100%" }}
              placeholder="EX)100주"
              value={buyQuantity}
              dispatchF={stockInputUpdate}
            />
            <Button mb="5" onPress={onSubmit}>
              자산등록
            </Button>
            <Button onPress={onRest}>초기화</Button>
          </Box>
        </Box>
      </VStack>
    </ScrollView>
  );
}

export default StockAddPage;
