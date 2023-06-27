import React, { useState } from "react";
import {
  Box,
  FormControl,
  ScrollView,
  VStack,
  Button,
  Select,
  Text,
  CheckIcon,
} from "native-base";
import InputDateComponent from "@components/InputDateComponent";
import InputTextComponent from "@components/InputTextComponent";
import ContentScrollView from "@components/ContentScrollView";
import { makeDateString } from "../utils";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { boxStyle, formControlLableBasicStyle } from "../styles";
import { currencyInputUpdate, currencyRest } from "../action";
import { apiPath } from "../services";

function CurrencyAddPage() {
  const currentDate = makeDateString(new Date());
  const year = Number(currentDate.substring(0, 4));
  const { buyPrice, buyQuantity, buyDate } = useSelector(
    (state) => state.currecny
  );
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const onSubmit = () => {
    const buyDay = buyDate;
    const currencyInputDTO = {
      userId: token,
      currency: selectedCurrency,
      price: buyPrice,
      buyDay,
      shares: buyQuantity,
    };

    axios
      .post(`${apiPath}/currency/currencyAssetInput`, null, {
        params: currencyInputDTO,
      })
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
  };

  const onReset = () => dispatch(currencyRest());

  return (
    <ContentScrollView>
      <VStack alignItems="center" mt="5" mb="5">
        <Box {...boxStyle} mt="5" mb="5">
          <Box w="100%">
            <FormControl>
              <FormControl.Label>
                <Text style={formControlLableBasicStyle.label}>매수외환</Text>
              </FormControl.Label>
              <Select
                mb="10"
                w="95%"
                alignSelf="center"
                accessibilityLabel="매수외환"
                onValueChange={(value) => setSelectedCurrency(value)}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                <Select.Item label="USD(달러)" value="usd" />
                <Select.Item label="EUR(유로)" value="eur" />
                <Select.Item label="CHN(위안)" value="cnh" />
                <Select.Item label="JPY(엔)" value="jpy" />
                <Select.Item label="GBP(파운드)" value="gbp" />
              </Select>

              <InputDateComponent
                name="buyDate"
                formControlProps={{ w: "100%", mt: "0" }}
                formControlLabelProps={{ text: "매수날짜" }}
                value={buyDate}
                dispatchF={currencyInputUpdate}
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
                formControlLabelProps={{ text: "매수환율" }}
                textInputStyle={{ width: "100%" }}
                placeholder="EX) 1320원"
                value={buyPrice}
                dispatchF={currencyInputUpdate}
              />
              <InputTextComponent
                name="buyQuantity"
                inputType={"text"}
                formControlProps={{ mb: "5" }}
                formControlLabelProps={{ text: "매수수량" }}
                textInputStyle={{ width: "100%" }}
                placeholder="EX)100USD"
                value={buyQuantity}
                dispatchF={currencyInputUpdate}
              />
              <Button mb="5" onPress={onSubmit}>
                외환등록
              </Button>
              <Button onPress={onReset}>초기화</Button>
            </FormControl>
          </Box>
        </Box>
      </VStack>
    </ContentScrollView>
  );
}

export default CurrencyAddPage;
