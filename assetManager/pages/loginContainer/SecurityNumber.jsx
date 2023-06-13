import { FormControl, HStack, Icon, Pressable, Stack, Text } from "native-base";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signinStates } from "../../action/signin";
import { alertText, req } from "../../utils";

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

function SecurityNumber() {
  const { securityNoFirst, securityNoSecond } = useSelector(
    (state) => state.signin
  );
  const dispatch = useDispatch();

  const [securityNoSecondShow, setSecurityNoSecondShow] = useState(false);

  const setterFunction = (key, text) => {
    const format = req.num;
    if (text.length > 0 && !format.test(text[text.length - 1])) {
      Alert.alert(alertText.basic.title, alertText.basic.content);
      return;
    }
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
          {"주민등록번호"}
        </Text>
        <HStack alignItems="center">
          <View style={{ width: "45%" }}>
            <TextInput
              keyboardType="numeric"
              style={{ ...custom.inputStyle, width: "100%" }}
              value={securityNoFirst}
              onChangeText={(text) => {
                setterFunction("securityNoFirst", text);
              }}
              maxLength={6}
            />
            <Icon
              style={{ position: "absolute", top: 12.5 }}
              as={<MaterialIcons name="security" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          </View>
          <Text w="10%" textAlign="center" fontSize="lg">
            {"-"}
          </Text>
          <View style={{ width: "45%" }}>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={!securityNoSecondShow}
              style={{ ...custom.inputStyle, width: "100%" }}
              value={securityNoSecond}
              onChangeText={(text) => {
                setterFunction("securityNoSecond", text);
              }}
              maxLength={7}
            />
            <Pressable
              style={{ position: "absolute", top: 12.5, right: 2 }}
              onPress={() => {
                setSecurityNoSecondShow(!securityNoSecondShow);
              }}
            >
              <Icon
                as={
                  <MaterialIcons
                    name={
                      securityNoSecondShow ? "visibility" : "visibility-off"
                    }
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          </View>
        </HStack>
        {/* 부연설명 text */}
        <FormControl.HelperText>
          {"사용자의 주민등록번호를 입력해주세요."}
        </FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default SecurityNumber;
