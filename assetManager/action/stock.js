import {STOCK_UPDATE,STOCK_RESET,HAVINGSTOCK_UPDATE} from '../constants';


export const stockInputUpdate = (value,id,key) => ({type:STOCK_UPDATE,value,id,key});
export const stockInputReset = () => ({type:STOCK_RESET});
export const havingStockUpdate = (oneStock) =>({type:HAVINGSTOCK_UPDATE,oneStock});



