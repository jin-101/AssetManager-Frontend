import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@components/Loading";
import { isAndroid } from "../utils";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { apiPath } from "../services";
import AccountBookList from "@components/AccountBookList";
import { CheckIcon, HStack, Select } from "native-base";
import { Feather } from "@expo/vector-icons";
import {
  accountInputData,
  accountUpdateData,
  isAddDeleteData,
} from "../action/account";
import YearAndMonthSelect from "../components/YearAndMonthSelect";
import { footerHeight, leftPaperButton, windowWidth } from "../styles";
import { Button } from "react-native-paper";

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
  },
  picker: {
    fontSize: 15, // 글씨 크기 조정
    backgroundColor: "white",
  },
  pickerItem: {
    fontSize: 10, // 글씨 크기 조정
  },
});

function AccountBookContainer() {
  const [yearAndMonth, setYearAndMonth] = useState({
    year: "",
    month: "",
  });
  const { year: currentYear, month: currentMonth } = yearAndMonth;
  const { token } = useSelector((state) => state.login); //아이디 가져오는 법
  const { accountTotalList, isAdd } = useSelector((state) => state.account); // isAdd, key
  const [viewType, setViewType] = useState("전체");
  const dispatch = useDispatch();

  const makeYM = (year, month) => {
    setYearAndMonth({
      ...yearAndMonth,
      year: year.toString(),
      month: month.toString(),
    });
  };

  const axiosGetList = ({ year, month }) => {
    axios({
      method: "post",
      url: apiPath + "/rest/webboard/list.do",
      data: JSON.stringify({
        year: year,
        month: month,
        memberId: token,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((response) => {
        dispatch(accountInputData(year + month, response.data, ""));
      })
      .catch((error) => {});
  };

  // 렌더링
  useEffect(() => {
    const { year, month } = yearAndMonth;
    if (year !== "" && month !== "" && !accountTotalList[year + month]) {
      axiosGetList({ year, month });
    }
  }, [yearAndMonth]); //key ,isAdd

  useEffect(() => {
    //추가 삭제시 엑시오스 다시 요청
    if (isAdd === "Add" || isAdd === "DELETE") {
      dispatch(isAddDeleteData(""));
      axiosGetList({
        year: currentYear,
        month: currentMonth,
      });
    }
  }, [isAdd]);

  let itemList = accountTotalList[currentYear + currentMonth] || [];

  const ListSave = () => {
    dispatch(
      accountUpdateData(
        currentYear + currentMonth,
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
        // console.log("카테고리, 메모 저장 axios 성공");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

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

  const moveToAccountUpload = () => {
    navigation.navigate("AccountBookUpload");
  };

  //추가 페이지로 보내기
  const moveToAdd = () => {
    navigation.navigate("AccountBookAddPage", { itemList });
  };

  return (
    <View
      style={{
        position: "relative",
        alignSelf: "center",
        width: windowWidth * 0.9,
      }}
    >
      {itemList.length === 0 && <Loading isMainPage={true} />}
      <View>
        <HStack mt={5} alignSelf="center">
          <View
            style={{
              width: "55%",
              justifyContent: "center",
            }}
          >
            <YearAndMonthSelect parentCallback={makeYM} />
          </View>
          <HStack
            style={{
              width: "40%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              {...leftPaperButton}
              style={{ width: "70%", marginRight: 10 }}
              //mr={10}
              onPress={moveToAccountUpload}
            >
              업로드
            </Button>
          </HStack>
        </HStack>

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
        <HStack
          justifyContent={"space-around"}
          alignItems={"center"}
          mt={5}
          mb={5}
        >
          <View>
            <Select
              selectedValue={viewType}
              minWidth="100"
              height={35}
              accessibilityLabel="전체"
              placeholder="전체"
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setViewType(itemValue);
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Select.Item label="전체" value={"전체"} />
              <Select.Item label="수입" value={"수입"} />
              <Select.Item label="지출" value={"지출"} />
            </Select>
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
        </HStack>
      </View>

      {/* 카드내역 스크롤 뷰 자리 */}
      <ScrollView style={{ alignSelf: "center", width: "90%" }}>
        {itemList?.map((item, index) => {
          let condition = true;
          if (viewType === "수입" && item?.deposit === 0) {
            console.log(item?.exchangeDate, itemList[index - 1]?.exchangeDate);
            condition = false;
          } else if (viewType === "지출" && item?.withdraw === 0) {
            condition = false;
          }
          return (
            condition && (
              <AccountBookList
                key={item.detailCode}
                item={item}
                preData={itemList[index - 1]?.exchangeDate}
                index={index}
                yearMonthKey={currentYear + currentMonth}
              />
            )
          );
        })}
      </ScrollView>
      <View style={{ height: footerHeight }}></View>
    </View>
  );
}

export default AccountBookContainer;
