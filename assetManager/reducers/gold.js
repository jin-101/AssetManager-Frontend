import {GOLD_RESET,GOLD_UPDATE} from "../constants"

const initialState = {
    buyGram:"",
    buyDate:"",
    buyPrice:""
}


export default function gold(state=initialState,action){
    switch(action.type){
        case GOLD_UPDATE:
            return {
                ...state,
                [action.key]:action.value
            }
        case GOLD_RESET:
            return{
                ...initialState
            }
        default:
            return state;
    }
};