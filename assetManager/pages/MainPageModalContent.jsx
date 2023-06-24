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
import { Box, Button, Divider, HStack } from "native-base";
import { loginInitialize, resetAvgRate } from "../action";
import axios from "axios";
import { apiPath } from "../services";
import { delay } from "../utils";
import { btnStyle, btnTextStyle } from "../styles";

// 데이터 받아올 형식,,, 추후 삭제
const tempData = [
  {
    key: "A",
    title: "자산",
    list: [
      {
        key: "A1",
        title: "A",
        list: [
          { key: "a11", title: "a1", go: "1a1" },
          { key: "a12", title: "a2", go: "2a2" },
          { key: "a13", title: "a3", go: "3a3" },
        ],
      },
      {
        key: "A2",
        title: "AA",
        list: [
          { key: "a21", title: "aa1", go: "1aa1" },
          { key: "a22", title: "aa2", go: "2aa2" },
          { key: "a23", title: "aa3", go: "3aa3" },
        ],
      },
      {
        key: "A3",
        title: "AAA",
        list: [
          { key: "a31", title: "aaa1", go: "1aaa1" },
          { key: "a32", title: "aaa2", go: "2aaa2" },
          { key: "a33", title: "aaa3", go: "3aaa3" },
        ],
      },
    ],
  },
  {
    key: "B",
    title: "통계",
    list: [
      {
        key: "B1",
        title: "B",
        list: [
          { key: "b11", title: "b1", go: "1b1" },
          { key: "b12", title: "b2", go: "2b2" },
          { key: "b13", title: "b3", go: "3b3" },
        ],
      },
      {
        key: "B2",
        title: "BB",
        list: [
          { key: "b21", title: "bb1", go: "1bb1" },
          { key: "b22", title: "bb2", go: "2bb2" },
          { key: "b23", title: "bb3", go: "3bb3" },
        ],
      },
      {
        key: "B3",
        title: "BBB",
        list: [
          { key: "b31", title: "bbb1", go: "1bbb1" },
          { key: "b32", title: "bbb2", go: "2bbb2" },
          { key: "b33", title: "bbb3", go: "3bbb3" },
        ],
      },
    ],
  },
  {
    key: "C",
    title: "가계부",
    list: [
      {
        key: "C1",
        title: "C",
        list: [
          { key: "c11", title: "c1", go: "1c1" },
          { key: "c12", title: "c2", go: "2c2" },
          { key: "c13", title: "c3", go: "3c3" },
        ],
      },
      {
        key: "C2",
        title: "CC",
        list: [
          { key: "c21", title: "cc1", go: "1cc1" },
          { key: "c22", title: "cc2", go: "2cc2" },
          { key: "c23", title: "cc3", go: "3cc3" },
        ],
      },
      {
        key: "C3",
        title: "CCC",
        list: [
          { key: "c31", title: "ccc1", go: "1ccc1" },
          { key: "c32", title: "ccc2", go: "2ccc2" },
          { key: "c33", title: "ccc3", go: "3ccc3" },
        ],
      },
    ],
  },
];

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
        console.log("로그아웃 성공");

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
        console.log(err);
      });
  };

  //기본 정보 변경
  async function basicInfoChangeBtn() {
    console.log("기본정보 변경 페이지로 이동", navigation.navigate);
    await onPress(); // 받은 모달변경함수 실행(모달 종료)
    await delay(300);
    navigation.navigate("UserInfo");
  }

  //회원 탈퇴
  const userDeleteBtn = () => {
    //회원 탈퇴 터치 시 기능 구현 필요
    //axios로 리덕스 스토어 에서 꺼낸 id 값을 스프링부트로 보낸다
    console.log("회원탈퇴 버튼을 터치");
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
  const navigatorChoice = (index, naviText) => {
    console.log(firstCategory, dropdownState, index, naviText);
  };

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

      {/* 기본정보변경 + 리스트 */}
      <ScrollView
        style={{ marginTop: native.titleLayout.height, height: "100%" }}
      >
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

        {/* 카테고리 리스트(콘텐츠) */}
        <View
          style={{ minHeight: modalContentHeight, backgroundColor: "pink" }}
        >
          <HStack h={"100%"}>
            {/* 왼쪽 가장 큰 카테고리 */}
            <Box pl={1} pr={1} borderRightWidth={1} w={"35%"}>
              {tempData.map((fistItem, index) => (
                <Box
                  key={fistItem.key}
                  borderWidth={1}
                  borderColor={"blue.100"}
                  onTouchEnd={() => firstCategoryChoice(index)}
                >
                  <Text style={native.contentLeft}>{fistItem.title}</Text>
                </Box>
              ))}
            </Box>
            <Box pl={1} pr={1} w={"60%"}>
              {tempData[firstCategory]?.list.map((secondItem, j) => (
                /* 여기 오른쪽 두번째 카테고리 부터 */
                <>
                  <Box
                    key={secondItem.key}
                    backgroundColor={"blue.200"}
                    height={90}
                    borderWidth={1}
                    borderColor={"blue.100"}
                    onTouchEnd={() => dropdwonChoice(j)}
                  >
                    <Text style={{ width: "100%", fontSize: 25 }}>
                      {secondItem.title}
                    </Text>
                  </Box>
                  {dropdownState === j &&
                    secondItem.list.map((thirdItem, k) => (
                      <Box
                        key={thirdItem.key + k}
                        backgroundColor={"yellow.200"}
                        height={50}
                        borderWidth={1}
                        borderColor={"blue.100"}
                        onTouchEnd={() => navigatorChoice(k, thirdItem.go)}
                      >
                        <Text style={{ width: "100%", fontSize: 25 }}>
                          {thirdItem.title}
                        </Text>
                      </Box>
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
    fontSize: 25,
    textAlign: "center",
  },
});

export default MainPageModalContent;
