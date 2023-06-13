import { LOGIN_STATE_UPDATE } from "../constants";
const initialData = {
  token: "",
};

export default function loginState(state = initialData, action) {
  switch (action.type) {
    case LOGIN_STATE_UPDATE:
      return {
        token: action.token,
      };
    default:
      return state;
  }
}
