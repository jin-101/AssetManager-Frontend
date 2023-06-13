import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, HStack, Center, Icon } from "native-base";
import axios from "axios";
import {
  Text,
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { isAndroid } from "../utils";
import { apiPath } from "../services";

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

function AccountBookList({ item, setItemList, itemList, index }) {
  const [memo, setMemo] = useState(item.memo);
  const [category, setCategory] = useState(item.category);
  const [show, setShow] = useState(false);

  const [categoryData, setCategoryData] = useState([]);

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

  const modalShow = (e) => {
    setShow((prev) => !prev);
    //console.log(data2);
  };

  const InputCategory = (category) => {
    modalShow(); //모달 닫기
    setCategory(category);
    // setItemList([...itemList.filter((el,i)=>), ])
    // itemList.forEach((data) => {
    //   if (Number(data.detailCode) === index) data.category = category;
    // });
    itemList.map((data) => {
      if (Number(data.detailCode) === index) data.category = category;
    });
    setItemList(itemList);
  };

  const InputMemo = (text) => {
    //set 함수는 비동기 함수
    //그래서 밑의 문장이 끝나는 걸 기다리지 않는다. 받은 text를 바로 넣어줘야
    //마지막 글자가 잘리지 않는다.
    setMemo(text);
    itemList.map((data) => {
      if (Number(data.detailCode) == index) data.memo = text;
    });
    setItemList(itemList);
  };

  console.log("/////", index, show);

  const previousItem = index > 1 ? item[index - 1] : null;
  //console.log("아이템 하나!!!" + item[1]);

  return (
    <>
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
            <Text style={{ color: "gray" }}>
              {category !== null ? category : "카테고리 입력"}
            </Text>
            {/* <Text>{index}</Text> */}
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
                      <Feather name="gift" size={25} color="black" />
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
    </>
  );
}

export default AccountBookList;
