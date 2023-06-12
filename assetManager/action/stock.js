import stock from '../constants'
import { STOCK_UPDATE } from '../constants/stock';

export const stockInfoUpdate = (name,value) => ({type:STOCK_UPDATE,name,value});