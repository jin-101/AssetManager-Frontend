import axios from "axios";
import { View, Divider } from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiPath } from "../../services";
import AssetSurmary from "../../components/AssetSurmary";
import { useNavigation } from "@react-navigation/native";

const textListInfo = [
  { title: "은행", key: "bank" },
  { title: "상품명", key: "productName" },
  { title: "시작일", key: "startDate" },
  { title: "만기일", key: "endDate" },
  { title: "금액", key: "price", unit: "원", isPrice: true },
  { title: "이자율", key: "rate", unit: "%" },
];

function DepositCrudPage({ parentLoading }) {
  const { token } = useSelector((state) => state.login);
  const navigation = useNavigation();
  const [userDeposit, setUserDeposit] = useState([]);
  const { deposit, savings } = userDeposit;
  useEffect(() => {
    axios({
      url: `${apiPath}/deposit/depositCrud`,
      method: "GET",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        setUserDeposit(res.data);
        parentLoading();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateOnPress = () => {
    navigation.navigate("depositUpdate");
  };
  const serviceOnPress = () => {};
  const updateOnPressTwo = () => {
    navigation.navigate("savingsUpdate");
  };
  const serviceOnPressTwo = () => {};
  return (
    <View bgColor={"white"} w={"90%"} borderRadius={20}>
      <AssetSurmary
        data={deposit}
        title={`소유중인 예금 : ${deposit?.length}개`}
        textListInfo={textListInfo}
        updateBtn={{ title: "내역수정", onPress: updateOnPress }}
        serviceBtn={{ title: "예금 서비스", onPress: serviceOnPress }}
      />
      <Divider />
      <AssetSurmary
        data={savings}
        title={`소유중인 적금 : ${savings?.length}개`}
        textListInfo={textListInfo}
        updateBtn={{ title: "내역수정", onPress: updateOnPressTwo }}
        serviceBtn={{ title: "적금 서비스", onPress: serviceOnPressTwo }}
      />
    </View>
  );
}

export default DepositCrudPage;
