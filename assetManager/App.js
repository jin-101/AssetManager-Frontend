import { NativeBaseProvider } from "native-base";
import Login from "@views/Login";
import MainPage from "@views/MainPage";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";

export default function App() {
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        {/* <Login /> */}
        <MainPage />
      </NativeBaseProvider>
    </Provider>
  );
}
