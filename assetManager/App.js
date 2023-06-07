import { NativeBaseProvider } from "native-base";

import { PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";

import { Login, MainPage, DepositAddPage } from "./views";
import { commonHeaderStyle } from "./styles";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default function App() {
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));
  const Stack = createNativeStackNavigator();

  // const [isLoading, setIsLoading] = useState(true);

  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 3000);

  // console.log("app.js입니다");
  // if (isLoading)
  //   return (
  //     <View style={[styles.container, styles.horizontal]}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {/* 메인 페이지 */}
              <Stack.Screen
                name="Home"
                component={MainPage}
                options={commonHeaderStyle}
              />

              {/* 로그인 페이지 */}
              <Stack.Screen
                name="Login"
                component={Login}
                options={commonHeaderStyle}
              />

              {/* 모달 이동 페이지 - 자산 */}
              <Stack.Screen
                name="예적금"
                component={DepositAddPage}
                options={{ ...commonHeaderStyle, title: "예적금 추가" }}
              />
              <Stack.Screen
                name="자동차"
                component={DepositAddPage}
                options={{ ...commonHeaderStyle, title: "자동차 추가" }}
              />
              <Stack.Screen
                name="부동산"
                component={DepositAddPage}
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
                component={DepositAddPage}
                options={{ ...commonHeaderStyle, title: "코인 추가" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
