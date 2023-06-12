import { SIGNIN_STATES, SIGNIN_INITIALIZE } from "../constants/signin";

const initialData = {
  userId: "",
  userPw: "",
  userPwCheck: "",
  userName: "",
  securityNoFirst: "",
  securityNoSecond: "",
  phoneNoFirst: "010",
  phoneNoSecond: "",
  phoneNoThird: "",
  email: "",
  zonePost: "",
  addressFirst: "",
  addressSecond: "",
};

export default function signin(state = initialData, action) {
  console.log(action.value);
  switch (action.type) {
    case SIGNIN_INITIALIZE:
      return {
        ...initialData,
      };
    case SIGNIN_STATES:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
