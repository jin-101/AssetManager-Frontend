import { Box, Button, Center, HStack, Stack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { loginLayoutStyle } from "../styles";
import InputTextComponent from "@components/InputTextComponent";
import SearchAddress from "../external/SearchAddress";
import { TextInput } from "react-native";

const initialState = {
  userId: "",
  userPw: "",
  userPwCheck: "",
  userName: "",
  securityNumber1: "",
  securityNumber2: "",
  phoneNumber1: "010",
  phoneNumber2: "",
  phoneNumber3: "",
  email: "",
  zonePost: "",
  address1: "",
  address2: "",
};

function Signin(props) {
  //   const { userId, setUserId } = useState("");
  //   const { userPassword, setUserPassword } = useState({
  //     userPw: "",
  //     userPw2: "",
  //   });
  //   const { userName, setUserName } = useState("");
  //   const { securityNumber, setSecurityNumber } = useState({
  //     firstNum: "",
  //     secondNum: "",
  //   });
  //   const { phoneNumber, setPhoneNumber } = useState({
  //     firstNum: "010",
  //     secondNum: "",
  //     thirdNum: "",
  //   });

  //   const { email, setEmail } = useState("");
  //   const { address, setAddress } = useState({
  //     zonePost: "",
  //     address1: "",
  //     address2: "",
  //   });

  const [signinState, setSigninState] = useState(initialState);
  const {
    userId,
    userPw,
    userPwCheck,
    userName,
    securityNumber1,
    securityNumber2,
    phoneNumber1,
    phoneNumber2,
    phoneNumber3,
    email,
    zonePost,
    address1,
    address2,
  } = signinState;

  const setterFunction = ({ key, text }) => {
    setSigninState((prev) => ({
      ...prev,
      [key]: text,
    }));
  };
  const onChange = (text, id, key) => {
    console.log(text, key);
    switch (key) {
      case "securityNumber1":
        if (text.length <= 6) setterFunction({ key, text });
        break;
      case "securityNumber2":
        if (text.length <= 7) setterFunction({ key, text });
        break;
      case "phoneNumber2":
      case "phoneNumber3":
        if (text.length <= 4) setterFunction({ key, text });
        break;
      default:
        setterFunction({ key, text });
        break;
    }
  };

  // 회원가입
  const signUpBtn = () => {
    // const signUpData = { userId: userId, userPw: userPw };
    // console.log(signUpData);
    // axios({
    //   url: `${apiPath}/user/signUp`,
    //   method: "POST",
    //   headers: { "Content-Type": `application/json` },
    //   data: JSON.stringify(signUpData),
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     // const result = res.data;
    //     // if (result === "로그인 성공") {
    //     //   Alert.alert(result);
    //     //   // 그리고 화면 넘어가게끔
    //     // } else {
    //     //   Alert.alert(result);
    //     // }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  console.log(signinState, "////");
  return (
    <View style={style.container}>
      <ScrollView>
        <Center>
          {/* 계정 부분 */}
          <HStack {...baseStyle.elementLayout}>
            <Box {...baseStyle.iconBoxLayout}>
              <Feather name="user" {...baseStyle.iconStyle} />
            </Box>
            <InputTextComponent
              name="userId"
              title="계정"
              helperText="사용할 아이디를 입력해주세요."
              formControlProps={baseStyle.buttonExistFormControlStyle}
              inputStyle={style.inputHeight}
              value={userId}
              parentSetState={onChange}
            />
            <Button h="50" w="20%">
              {"중복체크"}
            </Button>
          </HStack>

          {/* 비밀번호 부분 */}
          <HStack {...baseStyle.elementLayout}>
            <Box {...baseStyle.iconBoxLayout}>
              <Feather name="lock" {...baseStyle.iconStyle} />
            </Box>
            <InputTextComponent
              name="userPw"
              title="비밀번호"
              helperText="사용할 비밀번호를 입력해주세요."
              formControlProps={baseStyle.oneInputWidth}
              inputStyle={style.inputHeight}
              value={userPw}
              parentSetState={onChange}
            />
          </HStack>

          {/* 비밀번호 확인 부분 */}
          <HStack {...baseStyle.elementLayout}>
            <Box {...baseStyle.iconBoxLayout}>
              <Feather name="lock" {...baseStyle.iconStyle} />
            </Box>
            <InputTextComponent
              name="userPwCheck"
              title="비밀번호 확인"
              helperText="비밀번호를 한번 더 입력해주세요."
              formControlProps={baseStyle.oneInputWidth}
              inputStyle={style.inputHeight}
              value={userPwCheck}
              parentSetState={onChange}
            />
          </HStack>

          {/* 이름 부분 */}
          <HStack {...baseStyle.elementLayout}>
            <Box {...baseStyle.iconBoxLayout}>
              <Feather name="user" {...baseStyle.iconStyle} />
            </Box>
            <InputTextComponent
              name="userName"
              title="이름"
              helperText="사용자 이름을 입력해주세요."
              formControlProps={baseStyle.oneInputWidth}
              inputStyle={style.inputHeight}
              value={userName}
              parentSetState={onChange}
            />
          </HStack>

          {/* 주민등록번호 부분 */}
          <View
            style={{ marginTop: "5%", width: "100%", alignItems: "center" }}
          >
            <Box ml="10%" w="80%" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold">
                {"주민등록번호"}
              </Text>
            </Box>
            <HStack mt="-5" alignItems="center">
              <Box {...baseStyle.iconBoxLayout}>
                <MaterialIcons name="security" {...baseStyle.iconStyle} />
              </Box>
              <InputTextComponent
                name="securityNumber1"
                inputType={"number2"}
                // title="주민등록번호"
                formControlProps={{
                  w: baseStyle.twoInputWidth.w,
                }}
                inputStyle={style.numberInputStyle}
                value={securityNumber1}
                parentSetState={onChange}
              />
              <Text
                w={baseStyle.twoInputWidth.gap}
                textAlign="center"
                fontSize="lg"
              >
                {"-"}
              </Text>
              <InputTextComponent
                name="securityNumber2"
                inputType={"number2"}
                formControlProps={{ w: baseStyle.twoInputWidth.w }}
                inputStyle={style.numberInputStyle}
                value={securityNumber2}
                parentSetState={onChange}
              />
            </HStack>
            <Box ml="10%" w="80%" mt="-5" mb="5" alignItems="flex-start">
              <Text fontSize="xs" color="gray.500">
                {"사용자의 주민등록번호를 입력해주세요."}
              </Text>
            </Box>
          </View>

          {/* 전화번호 부분 */}
          <View
            style={{ marginTop: "5%", width: "100%", alignItems: "center" }}
          >
            <Box ml="10%" w="80%" alignItems="flex-start">
              <Text fontSize="lg" fontWeight="bold">
                {"전화번호"}
              </Text>
            </Box>
            <HStack alignItems="center" mt="-5">
              <Box {...baseStyle.iconBoxLayout}>
                <MaterialIcons name="smartphone" {...baseStyle.iconStyle} />
              </Box>
              <InputTextComponent
                inputType={"number2"}
                formControlProps={{ w: baseStyle.threeInputWidth.w }}
                inputStyle={style.numberInputStyle}
                textInputProps={baseStyle.disableInput}
                value={phoneNumber1}
              />
              <Text
                w={baseStyle.threeInputWidth.gap}
                textAlign="center"
                fontSize="lg"
              >
                {"-"}
              </Text>
              <InputTextComponent
                name="phoneNumber2"
                inputType={"number2"}
                formControlProps={{ w: baseStyle.threeInputWidth.w }}
                inputStyle={style.numberInputStyle}
                value={phoneNumber2}
                parentSetState={onChange}
              />
              <Text
                w={baseStyle.threeInputWidth.gap}
                textAlign="center"
                fontSize="lg"
              >
                {"-"}
              </Text>
              <InputTextComponent
                name="phoneNumber3"
                inputType={"number2"}
                formControlProps={{ w: baseStyle.threeInputWidth.w }}
                inputStyle={style.numberInputStyle}
                value={phoneNumber3}
                parentSetState={onChange}
              />
            </HStack>
            <Box ml="10%" w="80%" mt="-5" mb="5" alignItems="flex-start">
              <Text fontSize="xs" color="gray.500">
                {"사용자의 전화번호를 입력해주세요."}
              </Text>
            </Box>
          </View>

          {/* <HStack {...baseStyle.elementLayout}>
            <Box {...baseStyle.iconBoxLayout}>
              <Feather name="smartphone" {...baseStyle.iconStyle} />
            </Box>
            <InputTextComponent
              name="phoneNumber"
              inputType={"number2"}
              title="전화번호"
              helperText="사용자 전화번호를 입력해주세요."
              formControlProps={baseStyle.oneInputWidth}
              //   labelStyle={{ height: 0 }}
              //   formHelperTextProps={{ height: 0 }}
              inputStyle={style.numberInputStyle}
              value={phoneNumber}
              parentSetState={onChange}
            />
          </HStack> */}

          {/* 이메일 부분 */}
          <HStack {...baseStyle.elementLayout}>
            <Box {...baseStyle.iconBoxLayout}>
              <MaterialIcons name="email" {...baseStyle.iconStyle} />
            </Box>
            <InputTextComponent
              name="email"
              title="이메일"
              helperText="사용자 이메일을 입력해주세요."
              formControlProps={baseStyle.oneInputWidth}
              inputStyle={style.inputHeight}
              value={email}
              parentSetState={onChange}
            />
          </HStack>

          {/* 주소부분 */}
          <View style={{ alignItems: "flex-end" }}>
            <HStack alignItems="center" mt="5">
              <Box {...baseStyle.iconBoxLayout}>
                <Entypo name="address" {...baseStyle.iconStyle} />
              </Box>
              <InputTextComponent
                name="zonePost"
                title="주소"
                formControlProps={baseStyle.buttonExistFormControlStyle}
                inputStyle={style.addressInputStyle}
                textInputProps={baseStyle.disableInput}
                value={zonePost}
              />
              <SearchAddress btnStyle={style.inputHeight} />
            </HStack>
            <InputTextComponent
              name="address1"
              labelStyle={{ height: 0, margin: -25 }}
              formHelperTextProps={{ height: 0, margin: 0 }}
              formControlProps={{ w: "78%" }}
              inputStyle={style.addressInputStyle}
              textInputProps={baseStyle.disableInput}
              value={address1}
            />
            <InputTextComponent
              name="address2"
              helperText="사용자의 주소를 검색해주세요."
              labelStyle={{ height: 0 }}
              formControlProps={{ w: "78%", margin: 0, marginBottom: 5 }}
              inputStyle={style.addressInputStyle}
              textInputProps={address1 !== "" ? baseStyle.disableInput : {}}
              value={address2}
              parentSetState={onChange}
            />
          </View>
          <Button w="90%" mt="5" mb="10">
            {"등록"}
          </Button>
        </Center>
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  ...loginLayoutStyle,
  inputHeight: {
    height: 50,
  },
  numberInputStyle: {
    height: 50,
    textAlign: "center",
  },
  addressInputStyle: {
    height: 50,
    backgroundColor: "lightgray",
  },
});

const baseStyle = StyleSheet.create({
  iconBoxLayout: {
    w: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    size: 30,
    color: "black",
  },
  buttonExistFormControlStyle: { w: "58%", mr: "2%" },
  oneInputWidth: {
    w: "80%",
  },
  twoInputWidth: {
    w: "38%",
    gap: "4%",
  },
  threeInputWidth: {
    w: "24%",
    gap: "4%",
  },
  elementLayout: {
    alignItems: "center",
    mt: "5",
    mb: "5",
  },
  disableInput: {
    editable: false,
  },
});

export default Signin;
