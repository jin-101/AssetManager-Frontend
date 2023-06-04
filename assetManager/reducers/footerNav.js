import { PAGE_UPDATE } from "../constants";

const initialData = {
  pageState: 0,
};

export default function footerNav(state = initialData, action) {
  switch (action.type) {
    case PAGE_UPDATE:
      return {
        ...state,
        pageState: action.data,
      };
    default:
      return state;
  }
}
