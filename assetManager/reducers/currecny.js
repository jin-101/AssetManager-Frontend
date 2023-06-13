import {CURRENCY_UPDATE,CURRENCY_RESET} from "../constants"

const initialState = {
    buyPrice:"",
    buyQuantity:"",
    buyDate:""
};

export default function currency(state=initialState,action){
    switch(action.type){
        case CURRENCY_UPDATE:
        return {
            ...state,
            [action.key]:action.value
        }
        case CURRENCY_RESET:
            return {
                ...initialState
            }
        default:
            return state;
    }
}