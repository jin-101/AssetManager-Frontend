import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { commonHeaderStyle } from "../styles";
import { useSelector } from "react-redux";

import Login from "@views/Login";
import Signin from "@views/Signin";
import MainPage from "@views/MainPage";
import DepositAddPage from "@views/DepositAddPage";
import AptAddPage from "@views/AptAddPage";
import CoinAddPage from "@views/CoinAddPage";
import AccountBookContainer from "@pages/AccountBookContainer";
import CarAddPage from "@views/CarAddPage";
import StockAddPage from "./StockAddPage";
import SearchIdPage from "./SearchIdPage";
import SearchPwPage from "./SearchPwPage";
import GuestPage from "./GuestPage";
import CurrencyAddPage from "./CurrencyAddPage";

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

      {/* 비밀번호 찾기 페이지 */}
      <Stack.Screen
        name="Guest"
        component={GuestPage}
        options={{ ...commonHeaderStyle, title: "비회원 시세조회" }}
      />

      <Stack.Screen
        name="AccountBook"
        component={AccountBookContainer}
        options={{ ...commonHeaderStyle, title: "가계부" }}
      />
      {/* 로그인 페이지
              <Stack.Screen
                name="Login"
                component={Login}
                options={commonHeaderStyle}
              /> */}

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
        component={DepositAddPage}
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
    </Stack.Navigator>
  );
}

export default RootPages;
