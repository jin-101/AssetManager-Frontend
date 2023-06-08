import {
  PAGE_UPDATE,
  DEPOSIT_INITIALIZE,
  DEPOSIT_ADD,
  DEPOSIT_UPDATE,
  DEPOSIT_DELETE,
} from "../constants";

// Redeux를 사용할 떄, action 함수
export const pageUpdate = (data) => ({ type: PAGE_UPDATE, data });

export const depositInitialize = () => ({ type: DEPOSIT_INITIALIZE });
export const depositAdd = (id) => ({ type: DEPOSIT_ADD, id });
export const depositDelete = (id) => ({ type: DEPOSIT_DELETE, id });
export const depositUpdate = (value, id, key) => ({
  type: DEPOSIT_UPDATE,
  id,
  key,
  value,
});
