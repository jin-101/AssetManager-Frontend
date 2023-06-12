// Redeux를 사용할 떄, reducer

import { combineReducers } from "redux";
import login from "./login";
import footerNav from "./footerNav";
import deposit from "./deposit";
import carList from "./carList";
import car from "./car";
import stock from "./stock";

const rootReducer = combineReducers({
  // 리듀서들을 입력한다.
  login,
  footerNav,
  deposit,
  carList,
  car,
  stock

  
});

export default rootReducer;
