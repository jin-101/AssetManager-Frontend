import { LOGIN_STATE_UPDATE } from "../constants";
const initialData = {
  id: "",
};

export default function loginState(state = initialData, action) {
  switch (action.type) {
    case LOGIN_STATE_UPDATE:
      return {
        id: action.id,
      };
    default:
      return state;
  }
}
