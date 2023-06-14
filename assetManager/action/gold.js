import {GOLD_RESET,GOLD_UPDATE} from '../constants'

export const goldInputUpdate = (value,id,key)=>({type:GOLD_UPDATE,value,id,key});
export const goldInputReset = () =>({type:GOLD_RESET});