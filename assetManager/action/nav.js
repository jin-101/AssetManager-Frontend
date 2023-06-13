import { PAGE_INITIALIZE, PAGE_UPDATE } from "../constants";

export const pageInitialize = () => ({ type: PAGE_INITIALIZE });
export const pageUpdate = (data) => ({ type: PAGE_UPDATE, data });
