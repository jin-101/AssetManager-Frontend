import { PAGE_UPDATE } from "../constants";

// Redeux를 사용할 떄, action 함수
export const pageUpdate = (data) => ({ type: PAGE_UPDATE, data });
