import { LOGIN_STATE_UPDATE } from "../constants";

export const loginStateUpdate = (state) => ({
  type: LOGIN_STATE_UPDATE,
  state,
});
