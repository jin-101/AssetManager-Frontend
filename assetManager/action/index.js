import {
  PAGE_UPDATE,
  DEPOSIT_INITIALIZE,
  DEPOSIT_ADD,
  DEPOSIT_UPDATE,
  DEPOSIT_DELETE,
  CAR_COMPANYLIST_SEARCH,
  CAR_MODELLIST_SEARCH,
  CAR_INITIALIZE,
  CAR_ID_UPDATE,
  CAR_COMPANY_UPDATE,
  CAR_MODEL_UPDATE,
  CAR_YEAR_UPDATE,
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

export const carCompanyList = (arr) => ({ type: CAR_COMPANYLIST_SEARCH, arr });
export const carModelList = (key, arr) => ({
  type: CAR_MODELLIST_SEARCH,
  key,
  arr,
});

export const carInitialize = () => ({ type: CAR_INITIALIZE });
export const carIdUpdate = (value) => ({
  type: CAR_ID_UPDATE,
  value,
});
export const carCompanyUpdate = (value) => ({
  type: CAR_COMPANY_UPDATE,
  value,
});
export const carModelUpdate = (value) => ({ type: CAR_MODEL_UPDATE, value });
export const carYearUpdate = (value) => ({ type: CAR_YEAR_UPDATE, value });
