// Redeux를 사용할 떄, reducer

import { combineReducers } from "redux";
import footerNav from "./footerNav";
const rootReducer = combineReducers({
  // 리듀서들을 입력한다.
  footerNav,
});

export default rootReducer;
