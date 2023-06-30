import React, { useState, useEffect } from "react";
import { Box, FormControl, HStack } from "native-base";

import { View, StyleSheet } from "react-native";
import InputTextComponent from "@components/InputTextComponent";
import { useDispatch, useSelector } from "react-redux";
import { addLoanValue } from "../action";
import { loanInitialize } from "../action/loan";
import { Button } from "react-native-paper";

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
  return (
    <Box mb="5">
      <HStack alignItems="center">
        <FormControl.Label w="100%">
          대출이 있을 경우에만 입력해주세요.
        </FormControl.Label>
      </HStack>
      <View style={styles.container}>
        <Box mb={5}>
          {isVisible ? (
            <Button mode="contained" onPress={buttonControl}>
              숨기기
            </Button>
          ) : (
            <Button mode="contained" onPress={buttonControl}>
              대출 정보 입력하기
            </Button>
          )}
        </Box>
        <Box>
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
              {/* 0~ 40년 1~12개월 */}
              <InputTextComponent
                name="maturityDate"
                formControlLabelProps={{ text: "대출만기 (남은 기간)" }}
                placeholder="최소 1년 ~ 최대 50년"
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
