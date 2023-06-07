import React, { useState } from "react";
import { Box, FormControl, Input, HStack } from "native-base";
import { View, Button, StyleSheet } from "react-native";

const ShowHideBox = ({ state, setState }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showButtonClick = () => {
    setIsVisible(true);
  };
  const hideButtonClick = () => {
    setIsVisible(false);
  };

  //
  const onChangePrice = (text) => {
    console.log(text);
    setState({ ...state, price: text });
  };
  //
  const onChangeRate = (text) => {
    console.log(text);
    setState({ ...state, rate: text });
  };
  //
  const onChangeDate = (text) => {
    console.log(text);
    setState({ ...state, date: text });
  };
  return (
    <>
      <HStack alignItems="center">
        <FormControl.Label w="100%">
          대출이 있을 경우에만 입력해주세요.
        </FormControl.Label>
      </HStack>
      <View style={styles.container}>
        {isVisible ? (
          <Button title="대출 정보 가리기" onPress={hideButtonClick} />
        ) : (
          <Button title="대출 입력 보이기" onPress={showButtonClick} />
        )}

        {isVisible && (
          <View style={styles.box}>
            <Box mb="10">
              <FormControl.Label>대출금액 (원)</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={state.price}
                onChangeText={onChangePrice}
                id="price"
              />
              <FormControl.Label>대출금리 (%)</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={state.rate}
                onChangeText={onChangeRate}
              />
              <FormControl.Label>대출만기</FormControl.Label>
              <Input
                placeholder="달력으로??"
                value={state.date}
                onChangeText={onChangeDate}
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
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
  },
});

export default ShowHideBox;
