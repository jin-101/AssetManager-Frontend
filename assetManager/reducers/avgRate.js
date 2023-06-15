import { GET_AVGRATE, RESET_AVGRATE } from "../constants";

const initialState = {
  deposit: "",
  savings: "",
};

export default function avgRate(state = initialState, action) {
  switch (action.type) {
    case GET_AVGRATE:
      return {
        ...state,
        deposit: action.deposit,
        savings: action.savings,
      };
    case RESET_AVGRATE:
      return { ...initialState };
    default:
      return state;
  }
}
