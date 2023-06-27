import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";

function YearAndMonthSelect({ parentCallback }) {
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);

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
    setShowModal((prevState) => !prevState);
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
  };

  const handleSelectMonth = () => {
    setCurrentYear(selectedYear);
    setCurrentMonth(selectedMonth);
    setShowModal(false);
  };

  const handleBackdropPress = () => {
    setShowModal(false);
  };

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
              style={{ marginTop: 9, marginRight: 10, fontSize: 13 }}
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleToggleModal}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 3 }}>
              {currentYear}년 {currentMonth}월
            </Text>
          </TouchableOpacity>

          {/* 월별 선택 모달 */}
          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={handleToggleModal}
            presentationStyle="overFullScreen"
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={handleBackdropPress}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 200,
                      height: 40,
                    }}
                  >
                    <ModalSelector
                      data={[
                        { key: 2020, label: "2020년" },
                        { key: 2021, label: "2021년" },
                        { key: 2022, label: "2022년" },
                        { key: 2023, label: "2023년" },
                      ]}
                      initValue={selectedYear.toString() + "년"}
                      onChange={(option) => setSelectedYear(option.key)}
                      style={{
                        flex: 1,
                      }}
                      initValueTextStyle={{ color: "black" }}
                      selectStyle={{ borderWidth: 0 }}
                      optionContainerStyle={{ borderRadius: 5 }}
                      optionTextStyle={{ fontSize: 16 }}
                      cancelText="취소"
                      backdropPressToClose={true}
                    />

                    <ModalSelector
                      data={[
                        { key: 1, label: "1월" },
                        { key: 2, label: "2월" },
                        { key: 3, label: "3월" },
                        { key: 4, label: "4월" },
                        { key: 5, label: "5월" },
                        { key: 6, label: "6월" },
                        { key: 7, label: "7월" },
                        { key: 8, label: "8월" },
                        { key: 9, label: "9월" },
                        { key: 10, label: "10월" },
                        { key: 11, label: "11월" },
                        { key: 12, label: "12월" },
                      ]}
                      initValue={selectedMonth.toString() + "월"}
                      onChange={(option) => setSelectedMonth(option.key)}
                      style={{ flex: 1 }}
                      selectStyle={{ borderWidth: 0 }}
                      optionContainerStyle={{ borderRadius: 5 }}
                      optionTextStyle={{ fontSize: 16 }}
                      cancelText="취소"
                      backdropPressToClose={true}
                      initValueTextStyle={{ color: "black" }}
                    />
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 35,
                      }}
                    >
                      <TouchableOpacity
                        onPress={handleSelectMonth}
                        style={{ marginTop: 20 }}
                      >
                        <Text style={{ fontSize: 16, color: "blue" }}>
                          적용
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        marginRight: 35,
                      }}
                    >
                      <TouchableOpacity
                        onPress={handleToggleModal}
                        style={{ marginTop: 20 }}
                      >
                        <Text style={{ fontSize: 16, color: "blue" }}>
                          닫기
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          {/* 월별 선택 모달 */}
          <TouchableOpacity onPress={handlePlusMonth}>
            <Ionicons
              name="caret-forward-outline"
              style={{ marginTop: 9, marginLeft: 10, fontSize: 13 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default YearAndMonthSelect;
