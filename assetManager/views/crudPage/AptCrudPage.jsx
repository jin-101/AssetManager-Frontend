import InputTextComponent from "@components/InputTextComponent";
import axios from "axios";
import { Center, View, Text, Box, HStack, Button, Divider } from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiPath } from "../../services";
import { inputPriceFormat } from "../../utils";
import AssetSurmary from "../../components/AssetSurmary";

function AptCrudPage({ parentLoading }) {
  const { token } = useSelector((state) => state.login);
  const [userApt, setUserApt] = useState([]);
  useEffect(() => {
    axios({
      url: apiPath + `/apt/aptCrud`,
      method: "GET",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        setUserApt(res.data);
        parentLoading();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateOnPress = () => {
    //navigation.navigate("depositUpdate");
  };
  const serviceOnPress = () => {};

  return (
    <View bgColor={"white"} w={"90%"} borderRadius={20}>
      <AssetSurmary
        data={userApt}
        title={`소유중인 아파트 : ${userApt.length}채`}
        textListInfo={[
          { title: "아파트명", key: "aptName" },
          { title: "매입시기", key: "purchaseDate" },
          {
            title: "매입가격",
            key: "purchasePrice",
            unit: "원",
            isPrice: true,
          },
          {
            title: "최근 거래가격",
            key: "currentPrice",
            unit: "원",
            isPrice: true,
          },
          { title: "수익률", key: "rateOfReturn" },
        ]}
        updateBtn={{ title: "내역수정", onPress: updateOnPress }}
        serviceBtn={{
          title: "우리집 시세동향",
          onPress: serviceOnPress,
        }}
      />
    </View>
  );
}

export default AptCrudPage;
