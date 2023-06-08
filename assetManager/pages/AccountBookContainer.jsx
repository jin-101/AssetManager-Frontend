import axios from "axios";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";

import {
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Box,
  Button,
  Modal as BaseModal,
  Input,
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
  const [showModal2, setShowModal2] = useState(false);

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

  const openCategoryModal = () => {
    setShowModal2((prevState) => !prevState);
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
                <TouchableOpacity onPress={openCategoryModal}>
                  <Text style={{ color: "gray" }}>카테고리 작성</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <TextInput placeholder="메모 작성" />
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.detailCode}
      ></FlatList>
      {/* 카테고리 모달!!! */}
      <View>
        <Button onPress={() => setShowModal2(true)}>Button</Button>
        <BaseModal isOpen={showModal2} onClose={() => setShowModal2(false)}>
          <BaseModal.Content
            maxWidth="600px"
            width="100%"
            style={{
              marginBottom: 0,
              marginTop: "auto",
            }}
          >
            <BaseModal.CloseButton />
            <BaseModal.Header>Contact Us</BaseModal.Header>
            <BaseModal.Body>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
            </BaseModal.Body>
            <BaseModal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal2(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setShowModal2(false);
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </BaseModal.Footer>
          </BaseModal.Content>
        </BaseModal>
      </View>
      {/* 카테고리 모달!!! */}
    </View>
  );
}

export default AccountBookContainer;
