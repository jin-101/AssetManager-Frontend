import {CURRENCY_RESET,CURRENCY_UPDATE} from '../constants'

export const currencyInputUpdate = (value,id,key) =>({type:CURRENCY_UPDATE,value,id,key});
export const currencyRest = () =>({type:CURRENCY_RESET});