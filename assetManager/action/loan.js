import { LOAN_INITIALIZE, ADD_LOAN_VALUE } from "../constants";

export const loanInitialize = () => ({
  type: LOAN_INITIALIZE,
});
export const addLoanValue = (value, id, key) => ({
  type: ADD_LOAN_VALUE,
  key,
  value,
});
