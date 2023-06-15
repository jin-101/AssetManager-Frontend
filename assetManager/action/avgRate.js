import { GET_AVGRATE, RESET_AVGRATE } from "../constants";

export const getAvgRate = (deposit, savings) => ({
  type: GET_AVGRATE,
  deposit,
  savings,
});
export const resetAvgRate = () => ({ type: RESET_AVGRATE });
