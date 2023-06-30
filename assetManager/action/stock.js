import {STOCK_UPDATE,STOCK_RESET,BESTWORST_PAGEMODE} from '../constants';


export const stockInputUpdate = (value,id,key) => ({type:STOCK_UPDATE,value,id,key});
export const stockInputReset = () => ({type:STOCK_RESET});
export const bestWorstPageUpdate = (pageMode1)=>({type:BESTWORST_PAGEMODE,pageMode1});



