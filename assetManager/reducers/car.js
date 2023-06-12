import {
  CAR_INITIALIZE,
  CAR_ID_UPDATE,
  CAR_COMPANY_UPDATE,
  CAR_MODEL_UPDATE,
  CAR_YEAR_UPDATE,
} from "../constants";

const InitialData = {
  carId: "",
  carCompany: "",
  carModel: "",
  carYear: "",
};

export default function car(state = InitialData, action) {
  console.log(action.value);
  switch (action.type) {
    case CAR_INITIALIZE:
      return {
        ...InitialData,
      };
    case CAR_ID_UPDATE:
      return {
        ...state,
        carId: action.value,
        carCompany: "",
        carModel: "",
        carYear: "",
      };
    case CAR_COMPANY_UPDATE:
      return {
        ...state,
        carId: "",
        carCompany: action.value,
        carModel: "",
      };
    case CAR_MODEL_UPDATE:
      return {
        ...state,
        carModel: action.value,
      };
    case CAR_YEAR_UPDATE:
      return {
        ...state,
        carYear: action.value,
      };
    default:
      return state;
  }
}
