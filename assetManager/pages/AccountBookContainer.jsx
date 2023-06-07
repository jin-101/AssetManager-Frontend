import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Box,
  Button,
} from "native-base";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { apiPath } from "../services";

function AccountBookContainer() {
  const [service, setService] = React.useState("");

  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
  const day = today.getDate(); // 일

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [data, setData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios({
      method: "post",
      url: apiPath + "/rest/webboard/list.do",
      data: JSON.stringify({
        year: currentYear,
        month: currentMonth,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((response) => {
        //console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {});
  }, [currentYear, currentMonth]);

  const styles = StyleSheet.create({
    margin: {
      marginLeft: 150,
    },
    smallgray: {
      fontSize: 13,
      color: "gray",
    },
  });

  const handleMinusMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handlePlusMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
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

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
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

            {/*  */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
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
                    }}
                  >
                    <Select
                      selectedValue={selectedYear}
                      minWidth={100}
                      accessibilityLabel="년도 선택"
                      onValueChange={(value) => setSelectedYear(value)}
                    >
                      {[2020, 2021, 2022, 2023].map((year) => (
                        <Select.Item
                          key={year}
                          label={year.toString() + "년"}
                          value={year}
                        />
                      ))}
                    </Select>

                    <Select
                      selectedValue={selectedMonth}
                      minWidth={100}
                      accessibilityLabel="월 선택"
                      onValueChange={(value) => setSelectedMonth(value)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                        <Select.Item
                          key={month}
                          label={month.toString() + "월"}
                          value={month}
                        />
                      ))}
                    </Select>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 45,
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
                        marginRight: 45,
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
            </Modal>
            {/*  */}

            <TouchableOpacity onPress={handlePlusMonth}>
              <Ionicons
                name="caret-forward-outline"
                style={{ marginTop: 9, marginLeft: 10, fontSize: 13 }}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          // 인덱스 = 0 즉, 첫번째 순서에는 null 할당
          // 그 이후 애들한테는 그 전의 아이템 할당
          const previousItem = index > 0 ? data[index - 1] : null;
          const showDate =
            !previousItem || previousItem.exchangeDate !== item.exchangeDate;

          return (
            <View>
              {showDate && (
                <View>
                  <Text style={{ marginTop: 30 }}>{item.exchangeDate}</Text>
                  <View
                    style={{
                      backgroundColor: "gray",
                      height: 1,
                      marginTop: 10,
                      width: 350,
                    }}
                  />
                </View>
              )}

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Text>{item.content}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {item.withdraw > 0 ? (
                    <Text>- {item.withdraw.toLocaleString()}원</Text>
                  ) : (
                    <Text>{item.deposit.toLocaleString()}원</Text>
                  )}
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.smallgray}>{item.bank}</Text>
                <Text style={styles.smallgray}>
                  {" "}
                  | {item.exchangeTime.slice(0, -3)}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={styles.smallgray}>
                    {item.balance.toLocaleString()}원
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="카테고리 작성" />
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <TextInput placeholder="메모 작성" />
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.detailCode}
      ></FlatList>
    </SafeAreaView>
  );
}

export default AccountBookContainer;
