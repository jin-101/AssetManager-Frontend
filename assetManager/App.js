import { NativeBaseProvider } from "native-base";
import Login from "@views/Login";
import MainPage from "@views/MainPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import { headerStyle } from "./styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={MainPage}
              options={headerStyle}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={headerStyle}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
