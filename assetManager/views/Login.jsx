import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import {
  Box,
  //Button,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  useToast,
} from "native-base";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { apiPath } from "../services";
import { loginStateUpdate } from "../action";
import { boxStyle, loginLayoutStyle } from "../styles";
import { signinInitialize } from "../action/signin";
import Loading from "@components/Loading";
import ContentScrollView from "@components/ContentScrollView";
import { KeyboardAvoidingView } from "react-native";

const style = StyleSheet.create(loginLayoutStyle);

function Login() {
  const toast = useToast(); // ★ 로그인 성공시 화면 아래에 'OO님 반갑습니다' 를 띄우기 위한 Toast
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 로그인
  const loginBtn = () => {
    const loginData = { userId: userId, userPw: userPw };
    setIsLoading(true);

    axios({
      url: `${apiPath}/user/login`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify(loginData),
    })
      .then((res) => {
        console.log(res.data, "///");
        const { result, userName } = res.data;
        if (result === "로그인성공") {
          console.log(loginData.userId, userName);
          dispatch(loginStateUpdate(loginData.userId, userName));
          toast.show({
            placement: "top",
            mt: 100, // 이걸로 뜨는 위치 설정
            description: userId + "님 반갑습니다",
          });
        } else {
          Alert.alert("", result);
        }
        setIsLoading(false);
        // ★ 로그인 성공시 toast

        // token 사용 시 코드
        // if (res.data.length > 50) {
        //   const token = res.data;
        //   dispatch(loginStateUpdate(token));
        // } else Alert.alert("", res.data);
      })
      .catch((err) => {
        setIsLoading(false);
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

  if (isLoading) return <Loading />;
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <View style={style.container}>
        <ContentScrollView>
          <Box w="100%" mt={20}>
            <Box space={4} mb="10" alignItems="center">
              <Text fontSize={40}>Welcome</Text>
            </Box>
            <Box
              //{...boxStyle}
              bg="#ECEEFF"
              //bg="blue.100"
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
                  h={{
                    base: 16,
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
                  size="xl"
                  w={{
                    base: "90%",
                    md: "25%",
                  }}
                  h={{
                    base: 16,
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
                  <Button
                    mode="contained"
                    style={{ width: "30%" }}
                    //colorScheme="primary"
                    onPress={signUpBtn}
                  >
                    회원가입
                  </Button>
                  <Button
                    mode="outlined"
                    buttonColor="#F8F8FF"
                    style={{ width: "30%" }}
                    //colorScheme="primary"
                    onPress={loginBtn}
                  >
                    로그인
                  </Button>
                </Stack>
                <HStack mt="3" alignItems="center">
                  <Button size="md" variant="ghost" onPress={searchId}>
                    <Text color={"black"} fontSize={15}>
                      아이디 찾기
                    </Text>
                  </Button>
                  <Text color={"black"} fontSize={15}>
                    {"/"}
                  </Text>
                  <Button size="md" variant="ghost" onPress={searchPw}>
                    <Text color={"black"} fontSize={15}>
                      비밀번호 찾기
                    </Text>
                  </Button>
                </HStack>
              </Stack>
            </Box>
          </Box>
          <Box mt="2">
            {/* <Button size="lg" variant="ghost" onPress={guestBtn}>
              <Text color={"black"} fontSize={15}>
                비회원 시세조회
              </Text>
            </Button> */}
          </Box>
        </ContentScrollView>
        <View style={style.footer}>
          <Stack alignItems="center">
            <Text style={style.footerText}>Asset Manager</Text>
          </Stack>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
