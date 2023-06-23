import {
  USER_CAR_INITIALIZE,
  USER_CAR_UPDATE,
  USER_CAR_REMOVE,
} from "../constants";

export const userCarInitialize = () => ({
  type: USER_CAR_INITIALIZE,
});

export const userCarUpdate = (list) => ({
  type: USER_CAR_UPDATE,
  list,
});

export const userCarRemove = (id) => ({
  type: USER_CAR_REMOVE,
  id,
});
