import { NativeBaseProvider } from "native-base";

import { PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import RootPages from "@views/RootPages";

export default function App() {
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PaperProvider>
          <NavigationContainer>
            <RootPages />
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
