import {
  ACCOUNT_INITIALIZE,
  ACCOUNT_INPUT_DATA,
  ACCOUNT_UPDATE_DATA,
  ACCOUNT_DELETE_DATA,
  IS_ADD_DELETE_DATA,
  CURRENT_KEY,
} from "../constants";

export const accountInitialize = () => ({
  type: ACCOUNT_INITIALIZE,
});
export const accountInputData = (key, data, addDelData) => ({
  type: ACCOUNT_INPUT_DATA,
  key,
  data,
  addDelData,
});
export const accountUpdateData = (key, detailCode, memo, category) => ({
  type: ACCOUNT_UPDATE_DATA,
  key,
  detailCode,
  memo,
  category,
});

export const accountDeleteData = (key, detailCode) => ({
  type: ACCOUNT_DELETE_DATA,
  key,
  detailCode,
});
export const isAddDeleteData = (text) => ({
  type: IS_ADD_DELETE_DATA,
  text,
});

export const currentKey = (key) => ({
  type: CURRENT_KEY,
  key,
});
