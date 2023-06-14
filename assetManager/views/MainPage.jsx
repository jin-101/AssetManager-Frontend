import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import Footerbar from "@components/Footerbar";
import HomeContainer from "@pages/HomeContainer";
import SearchContainer from "@pages/SearchContainer";
import AssetContainer from "@pages/AssetContainer";
import AccountBookContainer from "@pages/AccountBookContainer";
import { Button, HStack, useToast } from "native-base";
import { pageInitialize, loginStateUpdate } from "../action";
import axios from "axios";
import { apiPath } from "../services";
import Loading from "../components/Loading";

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
  const toast = useToast();

  const dispatch = useDispatch();
  const { pageState } = useSelector((state) => state.footerNav);
  const { token } = useSelector((state) => state.login);

  const [slideModalOpen, setSlideModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const logoutOnPress = () => {
    axios.interceptors.request.use(
      function (config) {
        setIsLoading(true);
        return config;
      },
      function (error) {
        // 요청 설정을 수정하는 중에 오류가 발생한 경우 실행됩니다.
        return Promise.reject(error);
      }
    );
    axios({
      url: `${apiPath}/user/logout`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify({ userId: token }),
    })
      .then((res) => {
        console.log("로그아웃 성공");
        // Alert.alert("", res.data);
        toast.show({
          placement: "top",
          mt: 100, // 이걸로 뜨는 위치 설정
          description: token + "님 로그아웃 되었습니다.",
        });
        dispatch(loginStateUpdate(""));
        navigation.navigate("Login");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //검색아이콘 상태관리 함수
  const searchBtn = () => {};
  //모달슬라이드 상태관리 함수
  const modalSlideFunction = () => {
    console.log("/", slideModalOpen);
    setSlideModalOpen(!slideModalOpen);
  };

  const headerMenuBtn = () => {
    return (
      <>
        <Pressable onPress={modalSlideFunction}>
          <AntDesign name="bars" size={24} color="white" />
          <Text style={{ color: "white" }}>메뉴</Text>
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
      // case 3:
      //   return <HomeContainer />;
      case 4:
        return <AccountBookContainer />;
      default:
        return <HomeContainer />;
    }
  };

  if (isLoading) return <Loading />;
  console.log(slideModalOpen, "///");
  return (
    <>
      <View style={styles.container}>
        {returnComponent()}
        <Footerbar />
      </View>
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
        <HStack
          w={"100%"}
          alignItems={"center"}
          position={"absolute"}
          top={0}
          bg={"blue.100"}
          style={{ height: 130 }} //gap
        >
          <View
            style={{
              width: "70%",
              paddingLeft: 20,
            }}
          >
            <Text style={{ marginBottom: 10, fontSize: 25 }}>
              000님 반갑습니다.
            </Text>
            <HStack alignItems={"center"}>
              <Button
                bg="white"
                variant="outline"
                style={{ borderColor: "gray" }}
                w={90}
                borderRadius="lg"
                onPress={logoutOnPress}
              >
                <Text style={{ color: "gray" }}>로그아웃</Text>
              </Button>
              <Text style={{ marginLeft: 10, fontSize: 15 }}>
                최근 접속 : 00000
              </Text>
            </HStack>
          </View>
          <HStack
            style={{
              width: "20%",
              alignItems: "center",
            }}
          >
            <Pressable onPress={searchBtn} style={{ marginRight: 20 }}>
              <AntDesign name="search1" size={30} color="black" />
            </Pressable>
            <Pressable onPress={modalSlideFunction}>
              <MaterialIcons name="cancel" size={30} color="black" />
            </Pressable>
          </HStack>
        </HStack>
        <ScrollView style={{ marginTop: 130 }}>
          <View>
            <Text style={{ marginLeft: 10, fontSize: 30 }}>기본정보</Text>
          </View>
          <View>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>비밀번호</Text>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>비밀번호 확인</Text>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>폰번호</Text>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>이메일</Text>
            <Text style={{ marginLeft: 10, fontSize: 15 }}>주소</Text>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}

export default MainPage;
