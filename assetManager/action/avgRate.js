import { GET_AVGRATE, RESET_AVGRATE } from "../constants";

export const getAvgRate = (bankAndAvgRate) => ({
  type: GET_AVGRATE,
  bankAndAvgRate,
});
export const resetAvgRate = () => ({ type: RESET_AVGRATE });
