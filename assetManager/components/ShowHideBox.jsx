import React, { useState } from "react";
import { Box, FormControl, Input, HStack } from "native-base";
import { View, Button, StyleSheet } from "react-native";
import InputTextComponent from "./InputTextComponent";

const ShowHideBox = ({ state, setState }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showButtonClick = () => {
    setIsVisible(true);
  };
  const hideButtonClick = () => {
    setIsVisible(false);
  };

  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [date, setDate] = useState(0);

  return (
    <>
      <HStack alignItems="center">
        <FormControl.Label w="100%">
          대출이 있을 경우에만 입력해주세요.
        </FormControl.Label>
      </HStack>
      <View style={styles.container}>
        {isVisible ? (
          <Button title="숨기기" onPress={hideButtonClick} />
        ) : (
          <Button title="대출 정보 입력하기" onPress={showButtonClick} />
        )}

        {isVisible && (
          <View style={styles.box}>
            <Box mb="10">
              <FormControl.Label>대출금액 (원)</FormControl.Label>
              <InputTextComponent
                inputType="double"
                inputStyle={{ width: "100%" }}
                value={price}
                parentSetState={setPrice}
              ></InputTextComponent>
              <FormControl.Label>대출금리 (%)</FormControl.Label>
              <InputTextComponent
                inputType="double"
                inputStyle={{ width: "100%" }}
                value={rate}
                parentSetState={setRate}
              ></InputTextComponent>
              <FormControl.Label>대출만기 (남은 기간)</FormControl.Label>
              <InputTextComponent
                placeholder="1~50년 사이로??"
                inputType="double"
                value={date}
                parentSetState={setDate}
              />
            </Box>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
  },
});

export default ShowHideBox;
