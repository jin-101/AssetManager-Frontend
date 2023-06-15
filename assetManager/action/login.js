import { LOGIN_INITIALIZE, LOGIN_STATE_UPDATE } from "../constants";

export const loginInitialize = () => ({
  type: LOGIN_INITIALIZE,
});
export const loginStateUpdate = (token, userName, lastAccessDate) => ({
  type: LOGIN_STATE_UPDATE,
  token,
  userName,
  lastAccessDate,
});
