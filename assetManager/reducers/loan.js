import { LOAN_INITIALIZE, ADD_LOAN_VALUE } from "../constants";

const initialState = {
  loanAmount: "", // 대출금액
  rate: "", // 대출금리
  maturityDate: "", // 대출만기
};

export default function loan(state = initialState, action) {
  switch (action.type) {
    case LOAN_INITIALIZE:
      return {
        ...initialState,
      };
    case ADD_LOAN_VALUE:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
