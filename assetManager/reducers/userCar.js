import {
  USER_CAR_INITIALIZE,
  USER_CAR_UPDATE,
  USER_CAR_REMOVE,
} from "../constants";

const InitialData = {
  userCar: [],
};

export default function userCar(state = InitialData, action) {
  console.log(action.value);
  switch (action.type) {
    case USER_CAR_INITIALIZE:
      return {
        ...InitialData,
      };
    case USER_CAR_UPDATE:
      return {
        userCar: action.list,
      };
    case USER_CAR_REMOVE:
      return {
        userCar: state.userCar.filter((car, index) => index !== action.id),
      };
    default:
      return state;
  }
}
