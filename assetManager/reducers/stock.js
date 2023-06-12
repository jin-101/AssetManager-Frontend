import {STOCK_UPDATE} from '../constants';
const initialState = {
    stockName:'A',
    buyPrice:'',
    buyQuantity:''
    
};

export default function stockInfoUpdate(state=initialState,action){
    switch(action.type){
        case STOCK_UPDATE:
            return {
                ...state,
                [action.name]:action.value
            };
        default:
            return state;
    };

}