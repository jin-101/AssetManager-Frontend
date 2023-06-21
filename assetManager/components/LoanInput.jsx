import React, { useState, useEffect } from "react";
import { Box, FormControl, HStack, Button } from "native-base";
import { View, StyleSheet } from "react-native";
import InputTextComponent from "@components/InputTextComponent";
import InputDateComponent from "@components/InputDateComponent";
import { useDispatch, useSelector } from "react-redux";
import { addLoanValue } from "../action";
import { loanInitialize } from "../action/loan";

function LoanInput(props) {
  const dispatch = useDispatch();
  const { loanAmount, rate, maturityDate } = useSelector((state) => state.loan);
  const [isVisible, setIsVisible] = useState(false);
  const buttonControl = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    dispatch(loanInitialize());
  }, []);
  console.log(loanAmount, rate, maturityDate);
  return (
    <Box mb="5">
      <HStack alignItems="center">
        <FormControl.Label w="100%">
          대출이 있을 경우에만 입력해주세요.
        </FormControl.Label>
      </HStack>
      <View style={styles.container}>
        {isVisible ? (
          <Button size="lg" onPress={buttonControl}>
            숨기기
          </Button>
        ) : (
          <Button size="lg" onPress={buttonControl}>
            대출 정보 입력하기
          </Button>
        )}

        <Box mt="5">
          {isVisible && (
            <View style={styles.box}>
              <InputTextComponent
                name="loanAmount"
                formControlLabelProps={{ text: "대출금액 (원)" }}
                inputType="number"
                priceFormat="true" // 금액표시(,) true로 설정
                textInputStyle={{ width: "100%" }}
                value={loanAmount}
                dispatchF={addLoanValue}
              ></InputTextComponent>
              <InputTextComponent
                name="rate"
                formControlLabelProps={{ text: "대출금리 (%)" }}
                inputType="double"
                textInputStyle={{ width: "100%" }}
                value={rate}
                dispatchF={addLoanValue}
              ></InputTextComponent>

              {/* <InputDateComponent
                name="maturityDate"
                formControlProps={{ mb: "5" }}
                formControlLabelProps={{
                  text: "대출만기 (남은 기간)",
                  fontWeight: "normal",
                  fontSize: 15,
                }}
                value={maturityDate}
                dispatchF={addLoanValue}
                inputStyle={{
                  color: maturityDate !== "" ? "black" : "lightgray",
                }}
                datePickerProps={{
                  type: "YYYY-MM",
                  minDate: `${year - 20}-01-01`,
                  maxDate: `${year}-12-31`,
                  yearSuffix: "년",
                  monthSuffix: "개월",
                  width: 300,
                  rowHeight: 60,
                  selectedBorderLineWidth: "2",
                  toolBarCancelStyle: { color: "black" },
                }}
              /> */}
              {/* 0~ 40년 1~12개월 */}
              <InputTextComponent
                name="maturityDate"
                formControlLabelProps={{ text: "대출만기 (남은 기간)" }}
                placeholder="1년 ~ 50년"
                inputType="number"
                value={maturityDate}
                dispatchF={addLoanValue}
              />
            </View>
          )}
        </Box>
      </View>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  box: {
    width: "100%",
  },
});

export default LoanInput;
