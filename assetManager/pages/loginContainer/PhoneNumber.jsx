import { FormControl, HStack, Icon, Stack, Text } from "native-base";
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { signinStates } from "../../action/signin";
import { useDispatch, useSelector } from "react-redux";

const custom = StyleSheet.create({
  inputStyle: {
    height: 45,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1.5,
    borderRadius: 3,
    textAlign: "center",
    fontSize: 18,
  },
});

function PhoneNumber() {
  const { phoneNoFirst, phoneNoSecond, phoneNoThird } = useSelector(
    (state) => state.signin
  );
  const dispatch = useDispatch();
  const setterFunction = (key, text) => {
    dispatch(signinStates(key, text));
  };

  return (
    <Stack
      w="100%"
      mb={5}
      alignItems="center"
      justifyContent="center"
      space={4}
    >
      <FormControl w="90%">
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          {"전화번호"}
        </Text>
        <HStack alignItems="center">
          <View style={{ width: "30%" }}>
            <TextInput
              keyboardType="numeric"
              style={{ ...custom.inputStyle, width: "100%" }}
              value={phoneNoFirst}
              editable={false}
              maxLength={3}
            />
            <Icon
              style={{ position: "absolute", top: 12.5 }}
              as={<MaterialIcons name="smartphone" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          </View>
          <Text w="5%" textAlign="center" fontSize="lg">
            {"-"}
          </Text>
          <TextInput
            keyboardType="numeric"
            style={{ ...custom.inputStyle, width: "30%" }}
            value={phoneNoSecond}
            onChangeText={(text) => {
              setterFunction("phoneNoSecond", text);
            }}
            maxLength={4}
          />
          <Text w="5%" textAlign="center" fontSize="lg">
            {"-"}
          </Text>
          <TextInput
            keyboardType="numeric"
            style={{ ...custom.inputStyle, width: "30%" }}
            value={phoneNoThird}
            onChangeText={(text) => {
              setterFunction("phoneNoThird", text);
            }}
            maxLength={4}
          />
        </HStack>
        {/* 부연설명 text */}
        <FormControl.HelperText>
          {"사용자의 전화번호를 입력해주세요."}
        </FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default PhoneNumber;
