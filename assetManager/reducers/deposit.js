import {
  DEPOSIT_ADD,
  DEPOSIT_UPDATE,
  DEPOSIT_DELETE,
  DEPOSIT_INITIALIZE,
} from "../constants";

const initialOneAdd = {
  depositType: "deposit",
  startDate: "",
  endDate: "",
  price: 0,
  rate: 0,
};

const initialData = {
  depositStateList: [{ ...initialOneAdd, index: 0 }],
};

export default function deposit(state = initialData, action) {
  switch (action.type) {
    case DEPOSIT_INITIALIZE:
      return {
        ...initialData,
      };
    case DEPOSIT_ADD:
      return {
        ...state,
        depositStateList: state.depositStateList.concat({
          index: action.id,
          ...initialOneAdd,
        }),
      };
    case DEPOSIT_UPDATE:
      return {
        ...state,
        depositStateList: state.depositStateList.map((li) =>
          li.index === action.id ? { ...li, [action.key]: action.value } : li
        ),
      };
    case DEPOSIT_DELETE:
      return {
        ...state,
        depositStateList: state.depositStateList.filter(
          (li) => li.index !== action.id
        ),
      };
    default:
      return state;
  }
}
