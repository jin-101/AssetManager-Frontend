import {
  ACCOUNT_INITIALIZE,
  ACCOUNT_INPUT_DATA,
  ACCOUNT_UPDATE_DATA,
  ACCOUNT_DELETE_DATA,
  IS_ADD_DELETE_DATA,
  CURRENT_KEY,
} from "../constants";

const initialState = {
  accountTotalList: {},
  isAdd: "",
  key: "",
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_INITIALIZE:
      return {
        ...initialState,
      };
    case ACCOUNT_INPUT_DATA:
      return {
        ...state,
        accountTotalList: {
          ...state.accountTotalList,
          [action.key]: action.data,
        },
        isAdd: action.addDelData,
        key: action.key,
      };
    case ACCOUNT_UPDATE_DATA:
      return {
        ...state,
        accountTotalList: {
          ...state.accountTotalList,
          [action.key]: state.accountTotalList[action.key].map((el) => {
            if (el.detailCode === action.detailCode) {
              el.category = action.category;
              el.memo = action.memo;
            }
            return el;
          }),
        },
      };
    case ACCOUNT_DELETE_DATA:
      return {
        ...state,
        accountTotalList: {
          ...state.accountTotalList,
          [action.key]: state.accountTotalList[action.key].filter(
            (el) => el.detailCode !== action.detailCode
          ),
        },
      };
    case IS_ADD_DELETE_DATA:
      return {
        ...state,
        isAdd: action.text,
      };
    case CURRENT_KEY:
      return {
        ...state,
        key: action.key,
      };
    default:
      return state;
  }
}
