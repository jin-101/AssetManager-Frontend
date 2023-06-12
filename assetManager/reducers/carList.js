import { CAR_COMPANYLIST_SEARCH, CAR_MODELLIST_SEARCH } from "../constants";

const InitialData = {
  companyList: [],
  modelList: {},
};

export default function carList(state = InitialData, action) {
  switch (action.type) {
    case CAR_COMPANYLIST_SEARCH:
      return {
        ...state,
        companyList: action.arr,
      };
    case CAR_MODELLIST_SEARCH:
      return {
        ...state,
        modelList: {
          ...state.modelList,
          [action.key]: action.arr,
        },
      };
    default:
      return state;
  }
}
