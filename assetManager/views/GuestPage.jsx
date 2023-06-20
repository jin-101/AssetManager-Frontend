import { Text, View } from "native-base";
import React, { useState } from "react";
import DatePicker from "../external/CustomDatePicker/DatePicker";
// import Loading from "../components/Loading";
// import { DatePicker } from "react-native-common-date-picker";

function GuestPage(props) {
  // const [isLoading, setIsLoading] = useState(true);
  // console.log(isLoading);
  // if (isLoading) return <Loading />;
  const customData = [
    ["1", "2", "3", "4"],
    ["0", "1", "2", "3", "4"],
    ["0", "1", "2", "3", "4"],
  ];
  return (
    <DatePicker
      isCustom={true}
      customData={customData}
      type="YYYY-MM-DD" // 스크롤 유형
      // type="" // 스크롤 유형
      // minDate="2022-01-01" //시작일
      // maxDate="2022-03-31" //종료일
      // defaultDate={new Date()} // 처음 보여지는 날짜
      showToolBar={true}
      toolBarStyle={{
        justifyContent: "space-around",
        borderTopWidth: 0.5,
        borderBottomWidth: 0,
        borderColor: "lightgray",
        height: 60,
      }}
      rowHeight={60}
      selectedBorderLineWidth="3"
      toolBarPosition="bottom" // 확인 취소 박스 위치
      cancelText="취소"
      confirmText="확인"
      yearSuffix="시"
      monthSuffix="분"
      daySuffix="초"
      confirm={() => {}} // 확인 클릭 시 콜백함수
      // cancel={modalControlState.setState}
      // {...datePickerProps}
    />
  );
}

export default GuestPage;
