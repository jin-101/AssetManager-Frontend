import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { commonHeaderStyle } from "../styles";

import Login from "@views/Login";
import Signin from "@views/Signin";
import MainPage from "@views/MainPage";
import DepositAddPage from "@views/DepositAddPage";
import AptAddPage from "@views/AptAddPage";
import CoinAddPage from "@views/CoinAddPage";
import AccountBookContainer from "@pages/AccountBookContainer";
import CarAddPage from "@views/CarAddPage";
import { useSelector } from "react-redux";

function RootPages() {
  const Stack = createNativeStackNavigator();
  const { isLoggedIn } = useSelector((state) => state.login);
  console.log(isLoggedIn);
  return (
    <Stack.Navigator>
      {
        isLoggedIn ? (
          <Stack.Screen
            name="홈"
            component={MainPage}
            options={commonHeaderStyle}
          /> // 메인 페이지
        ) : (
          <Stack.Screen
            name="로그인"
            component={Login}
            options={commonHeaderStyle}
          />
        ) //로그인 페이지
      }

      {/* 회원가입 페이지 */}
      <Stack.Screen
        name="회원가입"
        component={Signin}
        options={commonHeaderStyle}
      />

      <Stack.Screen
        name="AccountBook"
        component={AccountBookContainer}
        options={commonHeaderStyle}
      />
      {/* 로그인 페이지
              <Stack.Screen
                name="Login"
                component={Login}
                options={commonHeaderStyle}
              /> */}

      {/* 모달 이동 페이지 - 자산 */}
      <Stack.Screen
        name="예적금"
        component={DepositAddPage}
        options={{ ...commonHeaderStyle, title: "예적금 추가" }}
      />
      <Stack.Screen
        name="자동차"
        component={CarAddPage}
        options={{ ...commonHeaderStyle, title: "자동차 추가" }}
      />
      <Stack.Screen
        name="부동산"
        component={AptAddPage}
        options={{ ...commonHeaderStyle, title: "부동산 추가" }}
      />
      <Stack.Screen
        name="금"
        component={DepositAddPage}
        options={{ ...commonHeaderStyle, title: "금 추가" }}
      />
      <Stack.Screen
        name="외환"
        component={DepositAddPage}
        options={{ ...commonHeaderStyle, title: "외환 추가" }}
      />
      <Stack.Screen
        name="주식"
        component={DepositAddPage}
        options={{ ...commonHeaderStyle, title: "주식 추가" }}
      />
      <Stack.Screen
        name="코인"
        component={CoinAddPage}
        options={{ ...commonHeaderStyle, title: "코인 추가" }}
      />
    </Stack.Navigator>
  );
}

export default RootPages;
