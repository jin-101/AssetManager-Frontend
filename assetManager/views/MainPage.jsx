import React from "react";
import { StyleSheet, View } from "react-native";
import Footerbar from "@components/Footerbar";
import { useSelector } from "react-redux";
import HomeContainer from "@pages/HomeContainer";
import SearchContainer from "@pages/SearchContainer";
import AssetContainer from "@pages/AssetContainer";
import AccountBookContainer from "@pages/AccountBookContainer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 60,
  },
});

function MainPage() {
  const { pageState } = useSelector((state) => state.footerNav);

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      {pageState == 0 ? (
        <HomeContainer />
      ) : pageState == 1 ? (
        <SearchContainer />
      ) : pageState == 2 ? (
        <AssetContainer />
      ) : (
        <AccountBookContainer />
      )}
      <Footerbar />
    </View>
  );
}

export default MainPage;
