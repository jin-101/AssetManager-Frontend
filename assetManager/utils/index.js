//초기 설정 값 및 util성 변수 및 함수

// 금액 처리 세자리 마다(,)
export const inputPriceFormat = (str) => {
  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };
  const uncomma = (str) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  };
  return comma(uncomma(str));
};

//키보드 타입
export const keyBoardType = (type) => {
  let keyboard;
  switch (type) {
    case "number":
      keyboard = "numeric";
      break;
    case "number2":
      keyboard = "number-pad";
      break;
    case "double":
      keyboard = "decimal-pad";
      break;
    case "email":
      keyboard = "email-address";
      break;
    case "pad":
      keyboard = "phone-pad";
      break;
    case "url":
      keyboard = "url";
      break;
    default:
      keyboard = "default";
      break;
  }
  return keyboard;
};

//기기가 안드로이드 인지 체크
export const isAndroid = Platform.OS === "android";

// date를 yyyy-mm-dd 형태의 string으로 변환하는 함수
export const makeDateString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().length > 1 ? month : "0" + month}-${
    day.toString().length > 1 ? day : "0" + day
  }`;
};

// inputTag 관련 공통 style
export const inputTagCommonStyle = {
  backgroundColor: "white",
  width: "100%",
  height: 45,
  borderColor: "#e5e7eb",
  borderWidth: 1,
  padding: 0,
  margin: 0,
  textAlign: "center",
  fontSize: 18,
  color: "black",
};
