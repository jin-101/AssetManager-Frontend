import { SIGNIN_STATES, SIGNIN_INITIALIZE } from "../constants/signin";

export const signinInitialize = () => ({ type: SIGNIN_INITIALIZE });
export const signinStates = (key, value) => ({
  type: SIGNIN_STATES,
  key,
  value,
});
