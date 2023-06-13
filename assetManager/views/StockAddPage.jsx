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
      userId:token,
      stockName,
      price: buyPrice,
      buyDay,
      shares: buyQuantity,
    };

        axios.post(`${apiPath}/stock/stockAssetInput`,null,{params:stockInputDTO})
        .then(function (response) {

          if(response.data==='등록완료'){
            Alert.alert("자산등록완료");
            onRest();
          } else {
            Alert.alert("자산등록실패 다시 등록해주세요");
          }

        })
        .catch(function (error) {
          console.log(error);
          Alert.alert("서버에러 잠시만 기다려주세요0")
        });


  };


  return (
    <ScrollView bg="primary.100">
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="light.50" p="5" w="90%">
          <FormControl>
            <InputTextComponent
              name="stockName"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              inputStyle={{ width: "100%" }}
              title={"매수종목"}
              placeholder="EX)삼성전자"
              value={stockName}
              dispatchF={stockInputUpdate}
            />
            <InputDateComponent
              name="buyDate"
              formControlStyle={{ w: "100%", mt: "0" }}
              title={"매수날짜"}
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
              inputStyle={{ width: "100%" }}
              title={"매수가격"}
              value={buyPrice}
              dispatchF={stockInputUpdate}
            />
            <InputTextComponent
              name="buyQuantity"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              inputStyle={{ width: "100%" }}
              title={"매수수량"}
              placeholder="EX)100주"
              value={buyQuantity}
              dispatchF={stockInputUpdate}
            />
            <Button mb="5" onPress={onSubmit}>
              자산등록
            </Button>
            <Button onPress={onRest}>초기화</Button>
          </FormControl>
        </Box>
      </VStack>
    </ScrollView>
  );
}

export default StockAddPage;
