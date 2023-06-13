import { Button, Center } from "native-base";
import React from "react";
import { View, ScrollView, Alert } from "react-native";
import UserId from "../pages/loginContainer/UserId";
import UserPassword from "../pages/loginContainer/UserPassword";
import UserName from "../pages/loginContainer/UserName";
import SecurityNumber from "../pages/loginContainer/SecurityNumber";
import PhoneNumber from "../pages/loginContainer/PhoneNumber";
import Email from "../pages/loginContainer/Email";
import Address from "../pages/loginContainer/Address";
import { useSelector } from "react-redux";
import { apiPath } from "../services";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function Signin(props) {
  const navigation = useNavigation();
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
    if (userId === "") {
      Alert.alert("", "아이디를 입력하세요.");
      return;
    }

    if (userPw === "") {
      Alert.alert("", "비밀번호를 입력하세요.");
      return;
    }

    if (userName === "") {
      Alert.alert("", "이름을 입력하세요.");
      return;
    }

    if (userPwCheck === "") {
      Alert.alert("", "비밀번호 확인을 입력하세요.");
      return;
    } else if (userPw !== userPwCheck) {
      Alert.alert("", "입력한 비밀번호가 같지 않습니다.");
      return;
    }

    if (securityNoFirst === "" || securityNoSecond === "") {
      Alert.alert("", "주민등록번호를 입력하세요.");
      return;
    } else if (
      Number(securityNoSecond[0]) > 4 ||
      securityNoFirst.length !== 6 ||
      securityNoSecond.length !== 7
    ) {
      Alert.alert("", "주민등록번호를 형식이 잘못되었습니다.");
      return;
    } else {
      const dateRegex = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
      if (!dateRegex.test(securityNoFirst)) {
        Alert.alert("", "주민등록번호의 생년월일이 올바르지 않습니다.");
        return;
      }
    }

    if (phoneNoFirst === "" || phoneNoSecond === "" || phoneNoThird === "") {
      Alert.alert("", "전화번호를 입력하세요.");
      return;
    } else {
      if (phoneNoSecond.length < 4 || phoneNoThird.length < 4) {
        Alert.alert("", "전화번호의 형식이 잘못되었습니다.");
        return;
      }
    }

    if (email === "") {
      Alert.alert("", "이메일을 입력하세요.");
      return;
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        Alert.alert("", "이메일을 형식이 잘못되었습니다.");
        return;
      }
    }

    if (zonePost === "") {
      Alert.alert("", "주소를 입력하세요.");
      return;
    }

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
        userAddress: `${addressFirst} ${addressSecond}`,
      }),
    })
      .then((res) => {
        console.log(res);
        Alert.alert(res.data);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err, "//");
      });

    console.log("모두 통과 등록~~~", {
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
