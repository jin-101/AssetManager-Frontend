import axios from "axios";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// import Loading from "@components/Loading";

import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { apiPath } from "../services";
import AccountBookList from "@components/AccountBookList";
import { Button } from "native-base";
import AccountBookAnalysis from "../components/AccountBookAnalysis";

function AccountBookContainer() {
  const styles = StyleSheet.create({
    depositandwithdraw: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 3,
      marginLeft: 10,
    },
  });

  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("여기들어왔다");
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
        // if (response.data.length > 0) console.log(response.data, "///");
        // setIsLoading(true);
      })
      .catch((error) => {});
  }, [currentMonth]);

  const ListSave = () => {
    //console.log("컨테이너에서///////" + JSON.stringify(itemList));
    axios({
      url: apiPath + "/rest/webboard/listsave.do",
      method: "put",
      data: itemList,
      //headers: { "Content-Type": `application/json` },
    })
      .then((response) => {
        console.log("카테고리, 메모 저장 axios 성공");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleBackdropPress = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setItemList(data);
  }, [data]);

  const [itemList, setItemList] = useState(data);

  const calculateWithdrawTotal = () => {
    return itemList.reduce(
      (total, currentItem) => total + currentItem.withdraw,
      0
    );
  };

  const calculateDepositTotal = () => {
    return itemList.reduce(
      (total, currentItem) => total + currentItem.deposit,
      0
    );
  };

  const inputPriceFormat = (str) => {
    //console.log("s", str);
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

  const navigation = useNavigation();

  const moveToAnalysis = () => {
    navigation.navigate("AccountBookAnalysis", { itemList, currentMonth });
  };

  return (
    <>
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
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 3 }}
                >
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

              <View
                style={{ flex: 1, alignItems: "flex-end", marginRight: 25 }}
              >
                <Button onPress={ListSave}>{"저장"}</Button>
              </View>
              <View style={{ marginRight: 25 }}>
                <Button onPress={moveToAnalysis}>분석</Button>
              </View>
            </View>
            <View>
              <Text style={styles.depositandwithdraw}>
                지출 : {inputPriceFormat(calculateWithdrawTotal())}원
              </Text>
              <Text style={styles.depositandwithdraw}>
                수입 : {inputPriceFormat(calculateDepositTotal())}원
              </Text>
            </View>
          </View>
        </View>
        {/* 카드내역 스크롤 뷰 자리 */}
        <ScrollView>
          {itemList.map((item, index) => {
            return (
              <AccountBookList
                key={item.detailCode}
                item={item}
                itemList={itemList}
                setItemList={setItemList}
                index={index}
              />
            );
          })}
        </ScrollView>
      </View>
      {/* {isLoading && <Loading />} */}
    </>
  );
}

export default AccountBookContainer;
