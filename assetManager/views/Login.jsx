import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { apiPath } from "../services";
import { loginStateUpdate } from "../action";
import { loginLayoutStyle } from "../styles";
import { signinInitialize } from "../action/signin";

const style = StyleSheet.create(loginLayoutStyle);

function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  // 로그인
  const loginBtn = () => {
    const loginData = { userId: userId, userPw: userPw };
    console.log(loginData);
    axios({
      url: `${apiPath}/user/login`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify(loginData),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === "로그인성공") {
          dispatch(loginStateUpdate(loginData.userId));
        } else Alert.alert("", res.data);

        // token 사용 시 코드
        // if (res.data.length > 50) {
        //   const token = res.data;
        //   dispatch(loginStateUpdate(token));
        // } else Alert.alert("", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 회원가입
  const signUpBtn = () => {
    console.log("회원가입 양식으로 이동>>");
    dispatch(signinInitialize());
    navigation.navigate("Signin");
  };

  //아이디 찾기 버튼
  const searchId = () => {
    navigation.navigate("SearchId");
  };

  //비밀번호 찾기 버튼
  const searchPw = () => {
    navigation.navigate("SearchPassword");
  };

  //비회원 시세 조회
  const guestBtn = () => {
    navigation.navigate("Guest");
  };
  return (
    <View style={style.container}>
      <View style={style.header}></View>
      <View style={style.content}>
        <Box w="100%">
          <Box space={4} mb="10" mt="5" alignItems="center">
            <Text fontSize={40}>Welcome</Text>
          </Box>
          <Box
            borderWidth="1"
            borderColor="coolGray.300"
            bg="coolGray.100"
            borderRadius="30"
            height={400}
            w="90%"
            justifyContent="center"
            maxW="400px"
            mx="auto"
            mb="10"
          >
            <Stack alignItems="center" space={4}>
              <Input
                value={userId}
                onChangeText={(userId) => setUserId(userId)}
                bg="white"
                size="xl"
                mt="5"
                w={{
                  base: "90%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Id"
              />
              <Input
                value={userPw}
                onChangeText={(userPw) => setUserPw(userPw)}
                bg="white"
                w={{
                  base: "90%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Password"
              />
              <Stack
                mb="2.5"
                mt="5"
                direction={{
                  base: "row",
                  md: "row",
                }}
                space={5}
              >
                <Button size="md" colorScheme="primary" onPress={signUpBtn}>
                  회원가입
                </Button>
                <Button size="md" colorScheme="primary" onPress={loginBtn}>
                  로그인
                </Button>
              </Stack>
              <HStack mt="3" alignItems="center">
                <Button size="md" variant="ghost" onPress={searchId}>
                  아이디 찾기
                </Button>
                <Text>{"/"}</Text>
                <Button size="md" variant="ghost" onPress={searchPw}>
                  비밀번호 찾기
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Box>
        <Box mt="2">
          <Button size="lg" variant="ghost" onPress={guestBtn}>
            비회원 시세조회
          </Button>
        </Box>
      </View>
      <View style={style.footer}>
        <Stack alignItems="center">
          <Text color="white">Asset Manager</Text>
        </Stack>
      </View>
    </View>
  );
}

export default Login;
