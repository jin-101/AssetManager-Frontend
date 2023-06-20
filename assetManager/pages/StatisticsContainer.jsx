import React from "react";
import { DatePicker } from "react-native-common-date-picker";

function StatisticsContainer() {
  return (
    <>
      <DatePicker
        // type="YYYY-MM" // 스크롤 유형
        type="HOUR" // 스크롤 유형
        // minDate="2022-01-01" //시작일
        // maxDate="2023-12-31" //종료일
        defaultDate={new Date()} // 처음 보여지는 날짜
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
        yearSuffix="년"
        monthSuffix="월"
        confirm={() => {}} // 확인 클릭 시 콜백함수
        // cancel={modalControlState.setState}
        // {...datePickerProps}
      />
    </>
  );
}

export default StatisticsContainer;
