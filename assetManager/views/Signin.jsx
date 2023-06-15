import { Button, Center } from "native-base";
import React from "react";
import { View, ScrollView, Alert } from "react-native";
import UserId from "@pages/userInfoContainer/UserId";
import UserPassword from "@pages/userInfoContainer/UserPassword";
import UserName from "@pages/userInfoContainer/UserName";
import SecurityNumber from "@pages/userInfoContainer/SecurityNumber";
import PhoneNumber from "@pages/userInfoContainer/PhoneNumber";
import Email from "@pages/userInfoContainer/Email";
import Address from "@pages/userInfoContainer/Address";
import { useDispatch, useSelector } from "react-redux";
import { apiPath } from "../services";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { inputFormCheckFunction } from "../utils";
import { signinInitialize } from "../action/signin";

function Signin(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    userId,
    userPw,
    userPwCheck,
    userName,
    securityNoFirst,
    securityNoSecond,
    phoneNoFirst,
    phoneNoSecond,
    phoneNoThird,
    email,
    zonePost,
    addressFirst,
    addressSecond,
  } = useSelector((state) => state.signin);

  const register = () => {
    if (inputFormCheckFunction("userId", userId)) return;
    if (inputFormCheckFunction("userPw", userPw, userPwCheck)) return;
    if (inputFormCheckFunction("userName", userName)) return;
    if (
      inputFormCheckFunction(
        "securityNumber",
        securityNoFirst,
        securityNoSecond
      )
    )
      return;
    if (
      inputFormCheckFunction(
        "phoneNumber",
        phoneNoFirst,
        phoneNoSecond,
        phoneNoThird
      )
    )
      return;
    if (inputFormCheckFunction("email", email)) return;
    if (inputFormCheckFunction("zonePost", zonePost)) return;

    axios({
      headers: { "Content-Type": `application/json` },
      url: `${apiPath}/user/signUp`,
      method: "POST",
      data: JSON.stringify({
        userId: userId,
        userPw: userPw,
        userName: userName,
        ssn: `${securityNoFirst}-${securityNoSecond}`,
        userEmail: email,
        phoneNumber: `${phoneNoFirst}-${phoneNoSecond}-${phoneNoThird}`,
        zipCode: zonePost,
        userAddress: addressFirst,
        userDetailAddress: addressSecond,
      }),
    })
      .then((res) => {
        console.log(res);
        dispatch(signinInitialize());
        Alert.alert(res.data);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err, "//");
      });
  };
  return (
    <View>
      <ScrollView>
        <Center>
          {/* 계정 부분 */}
          <UserId />
          {/* 비밀번호 부분 */}
          {/* 비밀번호 확인 부분 */}
          <UserPassword />
          {/* 이름 부분 */}
          <UserName />
          {/* 주민등록번호 부분 */}
          <SecurityNumber />
          {/* 전화번호 부분 */}
          <PhoneNumber />
          {/* 이메일 부분 */}
          <Email />
          {/* 주소부분 */}
          <Address />
          <Button onPress={register} w="90%" mt="5" mb="10">
            {"등록"}
          </Button>
        </Center>
      </ScrollView>
    </View>
  );
}

export default Signin;
