import { LOGIN_STATE_UPDATE } from "../constants";
const initialData = {
  isLoggedIn: false,
};

export default function loginState(state = initialData, action) {
  switch (action.type) {
    case LOGIN_STATE_UPDATE:
      return {
        isLoggedIn: action.state,
      };
    default:
      return state;
  }
}
