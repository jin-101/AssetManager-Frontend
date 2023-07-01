import React, { useState } from "react";
import {
  View,
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Divider, HStack, PresenceTransition } from "native-base";
import { loginInitialize, resetAvgRate } from "../action";
import axios from "axios";
import { apiPath } from "../services";
import { delay, searchNavigate } from "../utils";
import { btnStyle, btnTextStyle } from "../styles";

function MainPageModalContent({ onPress = async () => {}, toast = "" }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token, userName, lastAccessDate } = useSelector(
    (state) => state.login
  );

  const [firstCategory, setFirstCategory] = useState(0);
  const [dropdownState, setDropdownState] = useState(999);
  // 리스트(콘텐츠) 길이 구한 변수
  const modalContentHeight =
    Dimensions.get("window").height -
    native.titleLayout.height -
    native.userInfoLayout.height;

  // 로그아웃 버튼 클릭시 호출 함수
  const logoutOnPress = () => {
    axios({
      url: `${apiPath}/user/logout`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify({ userId: token }),
    })
      .then((res) => {
        // console.log("로그아웃 성공");

        if (toast)
          toast.show({
            placement: "top",
            mt: 100, // 이걸로 뜨는 위치 설정
            description: token + "님 로그아웃 되었습니다.",
          });
        dispatchInitializeFunction();
        navigation.navigate("Login");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  //기본 정보 변경
  async function basicInfoChangeBtn() {
    // console.log("기본정보 변경 페이지로 이동", navigation.navigate);
    await onPress(); // 받은 모달변경함수 실행(모달 종료)
    await delay(200);
    navigation.navigate("UserInfo");
  }

  //회원 탈퇴
  const userDeleteBtn = () => {
    //회원 탈퇴 터치 시 기능 구현 필요
    //axios로 리덕스 스토어 에서 꺼낸 id 값을 스프링부트로 보낸다
    // console.log("회원탈퇴 버튼을 터치");
  };

  // 로그아웃 시 초기화 함수
  const dispatchInitializeFunction = () => {
    dispatch(resetAvgRate());
    dispatch(loginInitialize());
  };

  // 전체보기 왼쪽 선택지
  const firstCategoryChoice = (index) => {
    setFirstCategory(index);
    setDropdownState(999);
  };

  // 전체보기 오른쪽 선택지
  const dropdwonChoice = (index) => {
    setDropdownState(index);
  };

  // 전체보기 최종 선택 시 콜백함수
  async function navigatorChoice(naviItem) {
    // console.log({ naviItem });
    await onPress(); // 받은 모달변경함수 실행(모달 종료)
    await delay(200);
    navigation.navigate(naviItem.go, { naviState: naviItem?.naviState });
    // onPress();
  }

  return (
    <>
      {/* 상단 바 */}
      <HStack
        {...base.titleLayout}
        style={native.titleLayout} //gap
      >
        <View style={native.titleLeft}>
          <Text
            style={native.titleLeftWelcome}
          >{`${userName}님 반갑습니다.`}</Text>
          <HStack {...base.titleLeftLogoutBox}>
            <Button
              {...base.titleLeftLogoutBtn}
              _pressed={{
                bg: "gray.100",
              }}
              onPress={logoutOnPress}
            >
              <Text style={{ color: "gray" }}>로그아웃</Text>
            </Button>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>
              {`최근 접속 : ${lastAccessDate}`}
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
      <View style={{ marginTop: native.titleLayout.height }}>
        {/* 기본정보변경 */}
        <HStack justifyContent={"center"}>
          <View
            style={{
              height: native.userInfoLayout.height,
              justifyContent: "center",
            }}
          >
            <Button
              {...btnStyle}
              borderColor="warning.400"
              width={150}
              height={50}
              marginRight={5}
              onPress={basicInfoChangeBtn}
              _text={{
                ...btnTextStyle,
                color: "warning.400",
              }}
              _pressed={{
                bg: "warning.100",
                borderColor: "white",
              }}
            >
              기본정보변경
            </Button>
          </View>
          <View
            style={{
              height: native.userInfoLayout.height,
              justifyContent: "center",
            }}
          >
            <Button
              {...btnStyle}
              borderColor="danger.400"
              width={150}
              height={50}
              marginRight={5}
              onPress={userDeleteBtn}
              _text={{
                ...btnTextStyle,
                color: "danger.400",
              }}
              _pressed={{
                bg: "danger.100",
                borderColor: "white",
              }}
            >
              회원탈퇴
            </Button>
          </View>
        </HStack>
        <Divider bg={"black"} />
      </View>
      {/* 기본정보변경 + 리스트 */}
      <ScrollView style={{ height: "100%" }}>
        {/* 카테고리 리스트(콘텐츠) */}
        <View style={{ minHeight: modalContentHeight, borderColor: "gray" }}>
          <HStack h={"100%"}>
            {/* 왼쪽 가장 큰 카테고리 */}
            <Box borderRightWidth={0.8} borderColor={"gray.400"} w={"35%"}>
              {searchNavigate?.map((fistItem, index) => (
                <Box
                  key={fistItem.key}
                  borderBottomWidth={0.5}
                  borderColor={"gray.400"}
                  bg={firstCategory === index ? "amber.100" : "white"}
                  onTouchEnd={() => firstCategoryChoice(index)}
                >
                  <Text style={native.contentLeft}>{fistItem.title}</Text>
                </Box>
              ))}
            </Box>
            <Box w={"60%"} alignItems={"center"}>
              {searchNavigate[firstCategory]?.list?.map((secondItem, j) => (
                /* 여기 오른쪽 두번째 카테고리 부터 */
                <>
                  <Box
                    key={searchNavigate[firstCategory]?.key + secondItem.key}
                    backgroundColor={dropdownState === j ? "blue.100" : "white"}
                    height={50}
                    w={"100%"}
                    borderBottomWidth={0.5}
                    borderColor={"gray.400"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onTouchEnd={() => {
                      if (secondItem?.list !== undefined) dropdwonChoice(j);
                      else navigatorChoice(secondItem);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color:
                          dropdownState === j || secondItem?.list === undefined
                            ? "black"
                            : "gray",
                      }}
                    >
                      {secondItem.title}
                    </Text>
                  </Box>
                  {dropdownState === j &&
                    secondItem.list?.map((thirdItem, k) => (
                      <PresenceTransition
                        key={
                          searchNavigate[firstCategory]?.key +
                          secondItem.key +
                          thirdItem.key
                        }
                        visible={dropdownState === j}
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 250,
                          },
                        }}
                        style={{ width: "100%", alignItems: "center" }}
                      >
                        <Box
                          bg={"gray.100"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          height={30}
                          w={"100%"}
                          // borderBottomWidth={0.3}
                          onTouchEnd={() => navigatorChoice(thirdItem)}
                        >
                          <Text style={{ fontSize: 12 }}>
                            {thirdItem.title}
                          </Text>
                        </Box>
                      </PresenceTransition>
                    ))}
                </>
              ))}
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
  userInfoLayout: {
    height: 90,
  },
  titleLeft: {
    width: "80%",
    paddingLeft: 20,
  },
  titleLeftWelcome: { marginBottom: 10, fontSize: 25 },
  titleLeftLogoutBtn: { borderColor: "gray" },
  contentLeft: {
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    fontSize: 20,
    textAlign: "center",
  },
});

export default MainPageModalContent;
