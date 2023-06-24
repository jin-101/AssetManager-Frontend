import {HAVINGSTOCK_UPDATE} from "../constants"

const havingStocks =[2,5];

export default function havingStockUpdate(state=havingStocks,action) {
    switch (action.type) {
        case HAVINGSTOCK_UPDATE:
           return [...state,action.oneStock];
        default:
           return havingStocks;
    }
};