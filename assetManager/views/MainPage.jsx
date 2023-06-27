import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

import Footerbar from "@components/Footerbar";
import HomeContainer from "@pages/HomeContainer";
import SearchContainer from "@pages/SearchContainer";
import AssetContainer from "@pages/AssetContainer";
import AccountBookContainer from "@pages/AccountBookContainer";
import MainPageModalContent from "@pages/MainPageModalContent";
import { pageInitialize } from "../action";
import { KeyboardAvoidingView, useToast } from "native-base";
import StatisticsContainer from "@pages/StatisticsContainer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 60,
  },
});

function MainPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { pageState } = useSelector((state) => state.footerNav);
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const toast = useToast();

  //모달슬라이드 상태관리 함수
  async function modalSlideFunction() {
    setSlideModalOpen(!slideModalOpen);
  }

  const headerMenuBtn = () => {
    return (
      <>
        <Pressable onPress={modalSlideFunction}>
          {/* <HStack justifyContent={"center"} alignItems={"center"}> */}
          {/* <Text style={{ color: "white" }}>메뉴</Text> */}
          <AntDesign name="bars" size={30} color="white" />
          {/* </HStack> */}
        </Pressable>
      </>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerMenuBtn,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(pageInitialize());
  }, []);

  const returnComponent = () => {
    switch (pageState) {
      case 0:
        return <HomeContainer />;
      case 1:
        return <SearchContainer />;
      case 2:
        return <AssetContainer />;
      case 3:
        return <StatisticsContainer />;
      case 4:
        return <AccountBookContainer />;
      default:
        return <HomeContainer />;
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <View style={styles.container}>
          {returnComponent()}
          <Footerbar />
        </View>
      </KeyboardAvoidingView>
      <Modal
        // backdropColor="white"
        // backdropOpacity={1}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          // alignItems: "stretch",
        }}
        isVisible={slideModalOpen}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <MainPageModalContent onPress={modalSlideFunction} toast={toast} />
      </Modal>
    </>
  );
}

export default MainPage;
