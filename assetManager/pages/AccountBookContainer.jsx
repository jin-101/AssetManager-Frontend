import axios from "axios";
import ModalSelector from "react-native-modal-selector";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
// import Loading from "@components/Loading";
import { isAndroid } from "../utils";
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
import {
  Button,
  Pressable,
  HStack,
  Center,
  Icon,
  Box,
  FormControl,
  Select,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import {
  accountInputData,
  accountUpdateData,
  isAddData,
} from "../action/account";
import YearAndMonthSelect from "../components/YearAndMonthSelect";
import { footerHeight } from "../styles";

function AccountBookContainer() {
  const styles = StyleSheet.create({
    depositandwithdraw: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 3,
      marginLeft: 10,
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
    container: {
      flex: 1,
      width: "100%",
      // justifyContent: "center",
      // alignItems: "center",
    },
    picker: {
      // height: 50,
      // width: 200,
      fontSize: 15, // 글씨 크기 조정
      backgroundColor: "white",
    },
    pickerItem: {
      fontSize: 10, // 글씨 크기 조정
    },
  });

  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [currentYearMonthKey, setCurrentYearMonthKey] = useState(
    // currentYear.toString() + currentMonth.toString()
    ""
  );

  const [showModal, setShowModal] = useState(false);
  const { token } = useSelector((state) => state.login); //아이디 가져오는 법
  // const [isLoading, setIsLoading] = useState(false);
  const { accountTotalList, isAdd, key } = useSelector(
    (state) => state.account
  );
  const dispatch = useDispatch();
  let itemList = accountTotalList[key] || [];
  // const [itemList, setItemList] = useState(
  //   accountTotalList[currentYearMonthKey] || []
  // );

  useEffect(() => {
    axios({
      method: "post",
      url: apiPath + "/rest/webboard/list.do",
      data: JSON.stringify({
        year: currentYear,
        month: currentMonth,
        memberId: token,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((response) => {
        const myKey = currentYear.toString() + currentMonth.toString();
        console.log(myKey, "??");
        // if (
        //   !Object.keys(accountTotalList).includes(myKey) ||
        //   isAdd.length > 0
        // ) {
        dispatch(accountInputData(myKey, response.data, ""));
        // } else {
        //   dispatch(currentKey(myKey));
        // }
        // setCurrentYearMonthKey(currentKey);
      })
      .catch((error) => {});
  }, [currentMonth, isAdd, key]);
  const ListSave = () => {
    dispatch(
      accountUpdateData(
        key,
        itemList.detailCode,
        itemList.memo,
        itemList.category
      )
    );
    axios({
      url: apiPath + "/rest/webboard/listsave.do",
      method: "put",
      data: itemList,
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

  // useEffect(() => {
  //   if (currentYearMonthKey !== "") {
  //     console.log("!@#$%^&*", currentYearMonthKey);
  //     setItemList(accountTotalList[currentYearMonthKey]);
  //   }
  // }, [accountTotalList[currentYearMonthKey]]);

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
    // navigation.navigate("AccountBookAnalysis", {
    //   itemList,
    //   currentMonth,
    // });
  };

  const moveToAccountUpload = () => {
    navigation.navigate("AccountBookUpload");
  };

  const moveToCashReceiptUpload = () => {
    navigation.navigate("CashReceiptUpload");
  };

  const moveToAdd = () => {
    navigation.navigate("AccountBookAddPage", { itemList });
  };

  const [show, setShow] = useState(false);
  const modalShow = (e) => {
    setShow((prev) => !prev);
  };
  console.log(key, "//..");
  console.log("axios data >>><<<<<>><<", accountTotalList[key]);

  return (
    <>
      <View>
        <View>
          <View style={{ backgroundColor: "gray" }}>
            <YearAndMonthSelect />
          </View>
          <View style={{ backgroundColor: "pink" }}>
            <Button onPress={moveToAccountUpload}>업로드</Button>
            <Button onPress={moveToCashReceiptUpload}>연말정산</Button>
            <Button onPress={moveToAnalysis}>분석</Button>
          </View>
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "flex-end" }}
        ></View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 20,
          }}
        >
          <Text style={styles.depositandwithdraw}>
            지출 : {inputPriceFormat(calculateWithdrawTotal())}원
          </Text>
          <Text style={styles.depositandwithdraw}>
            수입 : {inputPriceFormat(calculateDepositTotal())}원
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={moveToAdd} style={{ marginRight: 25 }}>
            <Text>
              <Feather name="plus" size={15} color="black" /> 추가
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ListSave} style={{ marginRight: 25 }}>
            <Text>
              <Feather name="save" size={15} color="black" /> 저장
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 카드내역 스크롤 뷰 자리 */}
      <ScrollView style={{ alignSelf: "center" }}>
        {itemList.map((item, index) => {
          return (
            <AccountBookList
              key={item.detailCode}
              item={item}
              preData={itemList[index - 1]?.exchangeDate}
              index={index}
              yearMonthKey={key}
            />
          );
        })}
      </ScrollView>
      <View style={{ height: footerHeight }}></View>
      {/* {isLoading && <Loading />} */}
    </>
  );
}

export default AccountBookContainer;
