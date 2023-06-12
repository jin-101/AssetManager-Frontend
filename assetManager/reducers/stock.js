import {STOCK_UPDATE} from '../constants';

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
        default:
            return state;
    }
};