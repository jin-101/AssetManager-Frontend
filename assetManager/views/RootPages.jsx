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
  DepositCrudPage,
  CarCrudPage,
  StockCRUDpage,
  AccountBookAddPage,
  CashReceiptUpload,
  GoldGraphPage,
  DepositUpdate,
  SavingsUpdate,
  CarUpdate,
  CarService,
  StockCRUDpageUpdate,
  CalculatePage,
  CurrencyGraphPage,
} from "@views";
// import CustomHeader from "../components/CustomHeader";

function RootPages() {
  const Stack = createNativeStackNavigator();
  const { token } = useSelector((state) => state.login);

  return (
    <Stack.Navigator
    // screenOptions={{
    //   header: () => <CustomHeader />,
    // }}
    >
      {token !== "" ? (
        <>
          {/*  메인 페이지 */}
          <Stack.Screen
            name="Home"
            component={MainPage}
            options={{ ...commonHeaderStyle, title: "홈" }}
          />
          {/* 기본정보 변경 */}
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
          {/* 현금영수증 업로드 페이지 */}
          <Stack.Screen
            name="CashReceiptUpload"
            component={CashReceiptUpload}
            options={{ ...commonHeaderStyle, title: "현금영수증 업로드" }}
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

          {/* 목돈마련플래너 */}
          <Stack.Screen
            name="mokdonPlanner"
            component={MokdonPlanner}
            options={{ ...commonHeaderStyle, title: "목돈 마련 플래너" }}
          />
          {/* 연말정산 예산 계산기 */}
          <Stack.Screen
            name="calculate"
            component={CalculatePage}
            options={{ ...commonHeaderStyle, title: "연말정산 예상 계산기" }}
          />

          {/* 보유자산 상세내역 */}
          <Stack.Screen
            name="depositCrud"
            component={DepositCrudPage}
            options={{ ...commonHeaderStyle, title: "예적금 보유내역" }}
          />
          {/* 예금내역 수정 */}
          <Stack.Screen
            name="depositUpdate"
            component={DepositUpdate}
            options={{ ...commonHeaderStyle, title: "예금내역 수정" }}
          />
          {/* 적금내역 수정 */}
          <Stack.Screen
            name="savingsUpdate"
            component={SavingsUpdate}
            options={{ ...commonHeaderStyle, title: "적금내역 수정" }}
          />
          <Stack.Screen
            name="carCrud"
            component={CarCrudPage}
            options={{ ...commonHeaderStyle, title: "자동차 보유내역" }}
          />
          {/* 차내역 수정 */}
          <Stack.Screen
            name="carUpdate"
            component={CarUpdate}
            options={{ ...commonHeaderStyle, title: "차 내역 수정" }}
          />
          {/* 차 서비스 */}
          <Stack.Screen
            name="carService"
            component={CarService}
            options={{ ...commonHeaderStyle, title: "차 서비스" }}
          />
          <Stack.Screen
            name="stockCrud"
            component={StockCRUDpageUpdate}
            options={{ ...commonHeaderStyle, title: "주식잔고" }}
          />
          <Stack.Screen
            name="currencyGraphPage"
            component={CurrencyGraphPage}
            options={{ ...commonHeaderStyle, title: "외화서비스" }}
          />
          <Stack.Screen
            name="GoldGraphPage"
            component={GoldGraphPage}
            options={{ ...commonHeaderStyle, title: "금서비스" }}
          />
        </>
      ) : (
        <>
          {/* 로그인 페이지 */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ ...commonHeaderStyle, title: "로그인" }}
          />
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootPages;
