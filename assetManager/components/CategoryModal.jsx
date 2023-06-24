import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, HStack, Center, Icon } from "native-base";
import axios from "axios";
import { Text, FlatList, View, Modal, StyleSheet, Image } from "react-native";
import { isAndroid } from "../utils";
import { apiPath } from "../services";

function CategoryModal({
  item,
  showState,
  showSetState,
  itemList,
  setItemList,
  categorySetState,
}) {
  const [categoryData, setCategoryData] = useState([]);

  const InputCategory = (category) => {
    showSetState(); //모달 닫기
    categorySetState(category);
    // setItemList([...itemList.filter((el,i)=>), ])
    // itemList.forEach((data) => {
    //   if (Number(data.detailCode) === index) data.category = category;
    // });
    // ===는 타입과 값이 모두 같아야 한다.
    // ==는 값만 같으면 된다.
    // AccountBookContainer에서 item 값을 보내주었기 때문에
    // item의 detail code 사용가능
    // 아이템마다 detail code 다르기 때문에 키 값으로 사용 가능
    if (itemList) {
      itemList.map((data) => {
        if (Number(data.detailCode) == item.detailCode) {
          data.category = category;
        }
      });
      setItemList(itemList);
    }
  };
  const imageData = [
    require("../assets/gift.png"),
    require("../assets/pencil.png"),
    require("../assets/bus.png"),
    require("../assets/finance.png"),

    require("../assets/culture.png"),
    require("../assets/sendmoney.png"),
    require("../assets/beauty.png"),
    require("../assets/life.png"),

    require("../assets/alchohol.png"),
    require("../assets/travel.png"),
    require("../assets/shopping.png"),
    require("../assets/medical.png"),

    require("../assets/eat.png"),
    require("../assets/phone.png"),
    require("../assets/house.png"),
    require("../assets/coffee.png"),

    require("../assets/insurance.png"),
    require("../assets/donate.png"),
    require("../assets/pay.png"),
    require("../assets/money.png"),
    // ...
  ];

  useEffect(() => {
    axios({
      method: "post",
      url: apiPath + "/rest/webboard/categorylist.do",
    })
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      {/* 카테고리 모달 2 (진형거) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showState}
        onRequestClose={showSetState}
      >
        <View style={styles.modalBg}></View>
        <View style={styles.modalContaniner}>
          <HStack style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>{"카테고리"}</Text>

            <Pressable cursor="pointer" onPress={showSetState}>
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
                      {/* <Feather name="gift" size={25} color="black" /> */}
                      {/* <Feather
                        name={iconData[index].name}
                        size={iconData[index].size}
                        color={iconData[index].color}
                      /> */}
                      <Image
                        source={imageData[index]}
                        style={{ width: 45, height: 45 }}
                      />

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
    </>
  );
}

const styles = StyleSheet.create({
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

export default CategoryModal;
