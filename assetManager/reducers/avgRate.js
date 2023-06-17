import { GET_AVGRATE, RESET_AVGRATE } from "../constants";

const initialState = {
  bankAndAvgRate: {},
};

export default function avgRate(state = initialState, action) {
  switch (action.type) {
    case GET_AVGRATE:
      return {
        ...state,
        bankAndAvgRate: action.bankAndAvgRate,
      };
    case RESET_AVGRATE:
      return { ...initialState };
    default:
      return state;
  }
}
