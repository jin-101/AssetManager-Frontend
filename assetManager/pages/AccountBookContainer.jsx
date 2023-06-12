import axios from "axios";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, HStack, Center, Icon } from "native-base";

import {
  Text,
  FlatList,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { apiPath } from "../services";
import { isAndroid } from "../utils";
const styles = StyleSheet.create({
  categorytouchable: {
    flex: 1,
    flexDirection: "row",
  },
  margin: {
    marginLeft: 150,
  },
  smallgray: {
    fontSize: 13,
    color: "gray",
  },
  leftSpace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    opacity: 0.5,
  },
  modalContaniner: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalTitle: {
    height: 60,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  modalTitleText: {
    fontSize: 20,
    fontWeight: 700,
  },
  modalContent: {
    backgroundColor: "white",
  },
  modalFooter: {
    height: isAndroid ? 0 : 20,
    backgroundColor: "white",
  },
});
function AccountBookContainer() {
  // const [service, setService] = React.useState("");

  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
  const day = today.getDate(); // 일

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [Category, setCategory] = useState("카테고리 입력");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [show, setShow] = useState(false);
  const modalShow = (e) => {
    setShow((prev) => !prev);
    //console.log(data2);
  };

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

  useEffect(() => {
    axios({
      method: "post",
      url: apiPath + "/rest/webboard/categorylist.do",
    })
      .then((response) => {
        //console.log(response.data);
        setCategoryData(response.data);
      })
      .catch((error) => {});
  }, []);

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

  const InputCategory = (category) => {
    modalShow();
    setCategory(category);
  };

  const [itemList, setItemList] = useState(data);
  console.log("아이템 리스트!!!" + itemList);

  const List = ({ item, setItemList, itemList }) => {
    return (
      <ScrollView>
        <View>
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
            <TouchableOpacity
              onPress={() => {
                //console.log({ index });
                setShow((prev) => !prev);
              }}
            >
              <Text style={{ color: "gray" }}>{Category}</Text>
              {/* <Text>{index}</Text> */}
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TextInput placeholder="메모 입력" />
            </View>
          </View>
        </View>
      </ScrollView>
    );
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

      {/* 카드내역 스크롤 뷰 자리 */}
      {itemList.map((item, index) => {
        return (
          <List item={item} itemList={itemList} setItemList={setItemList} />
        );
        <button
          onClick={() => {
            console.log(itemList);
          }}
        >
          확인
        </button>;
      })}

      {/* 카테고리 모달 2 (진형거) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={modalShow}
      >
        <View style={styles.modalBg}></View>
        <View style={styles.modalContaniner}>
          <HStack style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>{"카테고리"}</Text>
            <Pressable cursor="pointer" onPress={modalShow}>
              <Center>
                <Icon
                  as={
                    <Feather
                      name="x"
                      size={25}
                      color="black"
                      style={{ fontWeight: 700 }}
                    />
                  }
                />
              </Center>
            </Pressable>
          </HStack>
          <View style={styles.modalContent}>
            <FlatList
              Style
              columnWrapperStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              data={categoryData}
              numColumns={4}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      borderRadius: 10,
                      padding: 5,
                      borderWidth: 1,
                      borderColor: "gray",
                      margin: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "20%",
                    }}
                    onTouchEnd={() => InputCategory(item.category)}
                  >
                    <View
                      style={{
                        alignItems: "center",
                      }}
                    >
                      {/* <Image
                          source={require("../assets/rockcrab.png")}
                          style={{ width: 45, height: 45 }}
                        /> */}
                      {/* const aa = [{  name:"gift" size:45, color:"black"},{},{}]  ---->   {...aa[index]} */}
                      <Feather name="gift" size={45} color="black" />
                      <Text>{item.category}</Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>
          <View style={styles.modalFooter}></View>
        </View>
      </Modal>
      {/* 카테고리 모달 2 (진형거) */}
    </View>
  );
}

export default AccountBookContainer;
