import {STOCK_UPDATE,STOCK_RESET} from '../constants';

const initialState = {
    stockName:"",
    buyPrice:"",
    buyQuantity:"",
    buyDate:""
}

export default  function stock(state=initialState,action) {
    switch (action.type){
        case STOCK_UPDATE:
            return {
                ...state,
                [action.key]:action.value
            };
        case STOCK_RESET:
            return {
                ...initialState
            }
        default:
            return state;
    }
};