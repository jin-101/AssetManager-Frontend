//연습중..
import React from "react";
import { DatePicker } from "react-native-common-date-picker";
function SearchContainer() {
  return (
    <DatePicker
      type="YYYY"
      minDate="2009-01-01"
      maxDate="2023-06-08"
      defaultDate="2023-06-08"
      showToolBar={true}
      titleText="날짜를 선택해주세요."
      cancelText="취소"
      confirmText="확인"
      onValueChange={(selectedDate) => console.warn(selectedDate)}
      yearSuffix="년"
      monthSuffix="월"
      daySuffix="일"
      confirm={(date) => {
        console.log(date);
      }}
    />
  );
}

export default SearchContainer;
