import { LOGIN_STATE_UPDATE } from "../constants";

export const loginStateUpdate = (id) => ({
  type: LOGIN_STATE_UPDATE,
  id,
});
