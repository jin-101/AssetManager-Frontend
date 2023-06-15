import {
  CAR_COMPANYLIST_SEARCH,
  CAR_MODELLIST_SEARCH,
  CAR_INITIALIZE,
  CAR_ID_UPDATE,
  CAR_COMPANY_UPDATE,
  CAR_MODEL_UPDATE,
  CAR_YEAR_UPDATE,
} from "../constants";

export const carCompanyListSearch = (arr) => ({
  type: CAR_COMPANYLIST_SEARCH,
  arr,
});
export const carModelListSearch = (key, arr) => ({
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
