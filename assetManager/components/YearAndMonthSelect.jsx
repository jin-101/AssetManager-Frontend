import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DatePickerModal from "./DatePickerModal";

function YearAndMonthSelect({ parentCallback }) {
  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  useEffect(() => {
    if (parentCallback) parentCallback(currentYear, currentMonth);
  }, []);

  const handleMinusMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(12);
      if (parentCallback) parentCallback(currentYear - 1, 12);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
      if (parentCallback) parentCallback(currentYear, currentMonth - 1);
    }
  };

  const handlePlusMonth = () => {
    if (year === currentYear && month === currentMonth) return;
    if (currentMonth === 12) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(1);
      if (parentCallback) parentCallback(currentYear + 1, 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
      if (parentCallback) parentCallback(currentYear, currentMonth + 1);
    }
  };

  const handleToggleModal = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        // marginTop: 20,
      }}
    >
      <View style={{ flex: 1, marginLeft: 15, marginBottom: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleMinusMonth}>
            <Ionicons
              name="caret-back-outline"
              style={{ marginTop: 9, marginRight: 10, fontSize: 16 }}
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleToggleModal}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 3 }}>
              {currentYear}년 {currentMonth}월
            </Text>
          </TouchableOpacity>

          {isDatePickerVisible && (
            <DatePickerModal
              modalControlState={{
                state: isDatePickerVisible,
                setState: handleToggleModal,
              }}
              datePickerProps={{
                minDate: `${year - 5}-01-01`,
                maxDate: `${year}-${month}-31`,
              }}
            />
          )}
          {/* 월별 선택 모달 */}
          <TouchableOpacity onPress={handlePlusMonth}>
            <Ionicons
              name="caret-forward-outline"
              style={{ marginTop: 9, marginLeft: 10, fontSize: 16 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default YearAndMonthSelect;
