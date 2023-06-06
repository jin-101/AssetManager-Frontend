import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";

import { Login, MainPage, DepartAddPage } from "./views";
import { commonHeaderStyle } from "./styles";
import AptAddPage from "./views/AptAddPage";
import CoinAddPage from "./views/CoinAddPage";

export default function App() {
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider>
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
              component={DepartAddPage}
              options={{ ...commonHeaderStyle, title: "예적금 추가" }}
            />
            <Stack.Screen
              name="자동차"
              component={DepartAddPage}
              options={{ ...commonHeaderStyle, title: "자동차 추가" }}
            />
            <Stack.Screen
              name="부동산"
              component={AptAddPage}
              options={{ ...commonHeaderStyle, title: "부동산 추가" }}
            />
            <Stack.Screen
              name="금"
              component={DepartAddPage}
              options={{ ...commonHeaderStyle, title: "금 추가" }}
            />
            <Stack.Screen
              name="외환"
              component={DepartAddPage}
              options={{ ...commonHeaderStyle, title: "외환 추가" }}
            />
            <Stack.Screen
              name="주식"
              component={DepartAddPage}
              options={{ ...commonHeaderStyle, title: "주식 추가" }}
            />
            <Stack.Screen
              name="코인"
              component={CoinAddPage}
              options={{ ...commonHeaderStyle, title: "코인 추가" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
