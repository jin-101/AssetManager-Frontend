import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import Footerbar from "@components/Footerbar";
import HomeContainer from "@pages/HomeContainer";
import SearchContainer from "@pages/SearchContainer";
import AssetContainer from "@pages/AssetContainer";
import AccountBookContainer from "@pages/AccountBookContainer";
import { Button } from "native-base";
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

  const dispatch = useDispatch();
  const { pageState } = useSelector((state) => state.footerNav);
  const { token } = useSelector((state) => state.login);

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
        Alert.alert("", res.data);
        dispatch(loginStateUpdate(""));
        navigation.navigate("Login");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const logoutBtn = () => {
    return (
      <Button
        bg="red.500"
        color="white"
        borderRadius="lg"
        onPress={logoutOnPress}
      >
        {"로그아웃"}
      </Button>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: logoutBtn,
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
        return <AccountBookContainer />;
      default:
        return <HomeContainer />;
    }
  };

  if (isLoading) return <Loading />;
  return (
    <View style={styles.container}>
      {returnComponent()}
      <Footerbar />
    </View>
  );
}

export default MainPage;
