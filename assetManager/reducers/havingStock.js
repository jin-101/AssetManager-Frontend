import {HAVINGSTOCK_UPDATE} from "../constants"

const havingStocks =[];

export default function havingStockUpdate(state=havingStocks,action) {
    switch (action.type) {
        case HAVINGSTOCK_UPDATE:
           return action.stocks;
        default:
           return havingStocks;
    }
};