import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { commonHeaderStyle } from "@styles";
import { useSelector } from "react-redux";

import {
  Login,
  Signin,
  MainPage,
  DepositAddPage,
  AptAddPage,
  CoinAddPage,
  AccountBookContainer,
  CarAddPage,
  StockAddPage,
  SearchIdPage,
  SearchPwPage,
  GuestPage,
  CurrencyAddPage,
  GoldAddPage,
  AccountBookAnalysis,
  MokdonPlanner,
  UserInfoPage,
  AccountBookUpload,
  StockCRUDpage,
  AccountBookAddPage,
} from "@views";

function RootPages() {
  const Stack = createNativeStackNavigator();
  const { token } = useSelector((state) => state.login);
  console.log(token);
  return (
    <Stack.Navigator>
      {
        token !== "" ? (
          <Stack.Screen
            name="Home"
            component={MainPage}
            options={{ ...commonHeaderStyle, title: "홈" }}
          /> // 메인 페이지
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ ...commonHeaderStyle, title: "로그인" }}
          />
        ) //로그인 페이지
      }

      {/* 회원가입 페이지 */}
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ ...commonHeaderStyle, title: "회원가입" }}
      />

      {/* 아이디 찾기 페이지 */}
      <Stack.Screen
        name="SearchId"
        component={SearchIdPage}
        options={{ ...commonHeaderStyle, title: "아이디 찾기" }}
      />

      {/* 비밀번호 찾기 페이지 */}
      <Stack.Screen
        name="SearchPassword"
        component={SearchPwPage}
        options={{ ...commonHeaderStyle, title: "비밀번호 찾기" }}
      />

      {/* 비회원 시세조회 페이지 */}
      <Stack.Screen
        name="Guest"
        component={GuestPage}
        options={{ ...commonHeaderStyle, title: "비회원 시세조회" }}
      />

      {/* 사용자 기본정보 변경 페이지 */}
      <Stack.Screen
        name="UserInfo"
        component={UserInfoPage}
        options={{ ...commonHeaderStyle, title: "기본정보 변경" }}
      />

      {/* 가계부 페이지 */}
      <Stack.Screen
        name="AccountBook"
        component={AccountBookContainer}
        options={{ ...commonHeaderStyle, title: "가계부" }}
      />

      {/* 가계부 분석 페이지 */}
      <Stack.Screen
        name="AccountBookAnalysis"
        component={AccountBookAnalysis}
        options={{ ...commonHeaderStyle, title: "가계부 분석" }}
      />

      {/* 가계부 업로드 페이지 */}
      <Stack.Screen
        name="AccountBookUpload"
        component={AccountBookUpload}
        options={{ ...commonHeaderStyle, title: "가계부 업로드" }}
      />

      {/* 가계부 추가 페이지 */}
      <Stack.Screen
        name="AccountBookAddPage"
        component={AccountBookAddPage}
        options={{ ...commonHeaderStyle, title: "가계부 추가" }}
      />

      {/* 모달 이동 페이지 - 자산 */}
      <Stack.Screen
        name="AddDeposit"
        component={DepositAddPage}
        options={{ ...commonHeaderStyle, title: "예적금 추가" }}
      />
      <Stack.Screen
        name="AddApt"
        component={AptAddPage}
        options={{ ...commonHeaderStyle, title: "부동산 추가" }}
      />
      <Stack.Screen
        name="AddCar"
        component={CarAddPage}
        options={{ ...commonHeaderStyle, title: "자동차 추가" }}
      />
      <Stack.Screen
        name="AddGold"
        component={GoldAddPage}
        options={{ ...commonHeaderStyle, title: "금 추가" }}
      />
      <Stack.Screen
        name="AddExchange"
        component={CurrencyAddPage}
        options={{ ...commonHeaderStyle, title: "외환 추가" }}
      />
      <Stack.Screen
        name="AddStock"
        component={StockAddPage}
        options={{ ...commonHeaderStyle, title: "주식 추가" }}
      />
      <Stack.Screen
        name="AddCoin"
        component={CoinAddPage}
        options={{ ...commonHeaderStyle, title: "코인 추가" }}
      />
      {/*  */}
      <Stack.Screen
        name="mokdonPlanner"
        component={MokdonPlanner}
        options={{ ...commonHeaderStyle, title: "목돈 마련 플래너" }}
      />
      <Stack.Screen
        name="stockCrud"
        component={StockCRUDpage}
        options={{ ...commonHeaderStyle, title: "주식잔고" }}
      />
    </Stack.Navigator>
  );
}

export default RootPages;
