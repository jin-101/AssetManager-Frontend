import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import Footerbar from "@components/Footerbar";
import HomeContainer from "@pages/HomeContainer";
import SearchContainer from "@pages/SearchContainer";
import AssetContainer from "@pages/AssetContainer";
import AccountBookContainer from "@pages/AccountBookContainer";
import { Button } from "native-base";
import { loginStateUpdate } from "../action";
import axios from "axios";
import { apiPath } from "../services";

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
  const { id } = useSelector((state) => state.login);

  const logoutOnPress = () => {
    axios({
      url: `${apiPath}/user/logout`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify(id),
    })
      .then((res) => {
        dispatch(loginStateUpdate(""));
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <View style={styles.container}>
      {returnComponent()}
      <Footerbar />
    </View>
  );
}

export default MainPage;
