import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, HStack, Center, Icon } from "native-base";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { isAndroid } from "../utils";
import { apiPath } from "../services";
import CategoryModal from "./CategoryModal";

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
});

function AccountBookList({ item, setItemList, itemList, index, setDel }) {
  const [memo, setMemo] = useState(item.memo);
  const [category, setCategory] = useState(item.category);
  const [show, setShow] = useState(false);

  const modalShow = (e) => {
    setShow((prev) => !prev);
  };

  const InputMemo = (text) => {
    //set 함수는 비동기 함수
    //그래서 밑의 문장이 끝나는 걸 기다리지 않는다. 받은 text를 바로 넣어줘야
    //마지막 글자가 잘리지 않는다.
    setMemo(text);
    itemList.map((data) => {
      if (Number(data.detailCode) === Number(item.detailCode)) data.memo = text;
    });
    setItemList(itemList);
  };
  const previousItem = index > 0 ? itemList[index - 1] : null;
  const showDate =
    !previousItem ||
    previousItem.exchangeDate.slice(0, 10) !== item.exchangeDate.slice(0, 10); //!null은 true

  const handleDelete = () => {
    Alert.alert("삭제 확인", "정말 삭제하시겠습니까?", [
      { text: "예", onPress: () => handleConfirmDelete(item.detailCode) },
      { text: "아니오", style: "cancel" },
    ]);
  };

  const handleConfirmDelete = (detailCode) => {
    axios({
      url: apiPath + `/rest/webboard/deletelist.do/${detailCode}`,
      method: "delete",
    })
      .then(() => {
        setDel((prv) => !prv);
        //삭제한 detailCode의 아이템만 빼고 선택하여 아이템 리스트에 새로 넣어주는 것
        //item.detailCode : 전체 아이템의 디테일 코드
        //detailCode : 삭제한 디테일 코드
        console.log("delete axios 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("왜 두번찍혀", index);
  // console.log(categoryData.length);
  return (
    <>
      <View>
        {showDate && (
          <View>
            <Text style={{ marginTop: index === 0 ? 5 : 30 }}>
              {item.exchangeDate.slice(0, 10)}
            </Text>

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

        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            marginTop: 8,
          }}
        >
          <TouchableOpacity onPress={handleDelete}>
            <Feather name="trash-2" size={14} color="gray" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
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
          <Text style={styles.smallgray}>{item.accountNumber}</Text>
          <Text style={styles.smallgray}>
            {" "}
            | {item.exchangeDate.slice(11, 16)}
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
              setShow((prev) => !prev);
            }}
          >
            <Text style={{ color: "gray" }}>
              {category !== null ? category : "카테고리 입력"}
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TextInput
              style={{ color: "gray" }}
              placeholder="메모 입력"
              onChangeText={InputMemo}
              value={memo}
            />
          </View>
        </View>
      </View>

      {/* 카테고리 모달 2 (진형거) */}
      <CategoryModal
        item={item}
        showState={show}
        showSetState={modalShow}
        categorySetState={setCategory}
        setItemList={setItemList}
        itemList={itemList}
      />
    </>
  );
}

export default AccountBookList;
