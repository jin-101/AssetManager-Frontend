import { LOGIN_STATE_UPDATE } from "../constants";

export const loginStateUpdate = (token) => ({
  type: LOGIN_STATE_UPDATE,
  token,
});
