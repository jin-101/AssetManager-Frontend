import {
  DEPOSIT_INITIALIZE,
  DEPOSIT_ADD,
  DEPOSIT_UPDATE,
  DEPOSIT_DELETE,
} from "../constants";

export const depositInitialize = () => ({ type: DEPOSIT_INITIALIZE });
export const depositAdd = (id) => ({ type: DEPOSIT_ADD, id });
export const depositDelete = (id) => ({ type: DEPOSIT_DELETE, id });
export const depositUpdate = (value, id, key) => ({
  type: DEPOSIT_UPDATE,
  id,
  key,
  value,
});
