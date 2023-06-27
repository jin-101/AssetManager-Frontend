import { BESTWORST_PAGEMODE } from "../constants";

const initialState = {pageMode1:""};

export default function bestWorst(state=initialState,action){
    switch (action.type) {
        case BESTWORST_PAGEMODE:
           return {
            ...state,
            pageMode:action.pageMode1
           };
    
        default:
            return state;
    }
}