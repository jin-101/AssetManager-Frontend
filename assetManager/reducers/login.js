import { LOGIN_INITIALIZE, LOGIN_STATE_UPDATE } from "../constants";
import { makeDateString } from "../utils";
const initialData = {
  token: "",
  userName: "알 수 없는 사용자",
  lastAccessDate: makeDateString(new Date()),
};

export default function loginState(state = initialData, action) {
  switch (action.type) {
    case LOGIN_INITIALIZE:
      return {
        ...initialData,
      };
    case LOGIN_STATE_UPDATE:
      return {
        ...state,
        token: action.token,
        userName: action.userName || initialData.userName,
        lastAccessDate: action.lastAccessDate || initialData.lastAccessDate,
      };
    default:
      return state;
  }
}
