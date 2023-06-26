import {STOCK_UPDATE,STOCK_RESET,HAVINGSTOCK_UPDATE,BESTWORST_PAGEMODE} from '../constants';


export const stockInputUpdate = (value,id,key) => ({type:STOCK_UPDATE,value,id,key});
export const stockInputReset = () => ({type:STOCK_RESET});
export const havingStockUpdate = (stocks) =>({type:HAVINGSTOCK_UPDATE,stocks});
export const bestWorstPageUpdate = (pageMode1)=>({type:BESTWORST_PAGEMODE,pageMode1});



