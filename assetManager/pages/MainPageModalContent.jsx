import React, { useState } from "react";
import { View, Pressable, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Divider, HStack } from "native-base";
import { loginStateUpdate } from "../action";
import axios from "axios";
import { apiPath } from "../services";
import Loading from "../components/Loading";
import { StyleSheet } from "react-native";
function MainPageModalContent({ onPress = () => {}, toast = "" }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);

  const logoutOnPress = () => {
    axios.interceptors.request.use(
      function (config) {
        setIsLoading(true);
        return config;
      },
      function (error) {
        // 요청 설정을 수정하는 중에 오류가 발생한 경우 실행됩니다.
        return Promise.reject(error);
      }
    );
    axios({
      url: `${apiPath}/user/logout`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify({ userId: token }),
    })
      .then((res) => {
        console.log("로그아웃 성공");

        if (toast)
          toast.show({
            placement: "top",
            mt: 100, // 이걸로 뜨는 위치 설정
            description: token + "님 로그아웃 되었습니다.",
          });
        dispatch(loginStateUpdate(""));
        navigation.navigate("Login");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //검색아이콘 상태관리 함수
  const basicInfoChangeBtn = () => {
    console.log("inof");
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <HStack
        {...base.titleLayout}
        style={native.titleLayout} //gap
      >
        <View style={native.titleLeft}>
          <Text style={native.titleLeftWelcome}>000님 반갑습니다.</Text>
          <HStack {...base.titleLeftLogoutBox}>
            <Button {...base.titleLeftLogoutBtn} onPress={logoutOnPress}>
              <Text style={{ color: "gray" }}>로그아웃</Text>
            </Button>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>
              최근 접속 : 00000
            </Text>
          </HStack>
        </View>
        <HStack
          style={{
            width: "20%",
            alignItems: "center",
          }}
        >
          <Pressable onPress={onPress}>
            <MaterialIcons name="cancel" size={30} color="black" />
          </Pressable>
        </HStack>
      </HStack>
      <ScrollView style={{ marginTop: 130 }}>
        <View
          style={{
            height: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            bg="yellow.300"
            width={200}
            height={60}
            variant="subtle"
            // style={{ borderColor: "gray" }}
            borderRadius="lg"
            onPress={basicInfoChangeBtn}
          >
            <Text style={{ color: "black", fontSize: 20 }}>기본정보변경</Text>
          </Button>
        </View>
        <Divider bg={"black"} />
        <View>
          <HStack>
            <Box>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>비밀번호</Text>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>비밀번호</Text>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>
                비밀번호 확인
              </Text>
            </Box>
            <Box>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>폰번호</Text>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>이메일</Text>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>주소</Text>
            </Box>
          </HStack>
        </View>
      </ScrollView>
    </>
  );
}

const base = StyleSheet.create({
  titleLayout: {
    w: "100%",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bg: "blue.100",
  },
  titleLeftLogoutBox: { alignItems: "center" },
  titleLeftLogoutBtn: {
    bg: "white",
    variant: "outline",
    w: 90,
    borderRadius: "lg",
  },
});
const native = StyleSheet.create({
  titleLayout: {
    height: 130,
  },
  titleLeft: {
    width: "80%",
    paddingLeft: 20,
  },
  titleLeftWelcome: { marginBottom: 10, fontSize: 25 },
  titleLeftLogoutBtn: { borderColor: "gray" },
});

export default MainPageModalContent;
