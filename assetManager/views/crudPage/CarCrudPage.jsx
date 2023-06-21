import { Center, View, Text, Box, HStack, Button } from "native-base";
import { apiPath } from "../../services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inputPriceFormat } from "../../utils";
import AssetSurmary from "../../components/AssetSurmary";

function CarCrudPage(props) {
  const { token } = useSelector((state) => state.login);
  const [userCar, setUserCar] = useState([]);
  useEffect(() => {
    axios({
      url: apiPath + `/car/carCrud`,
      method: "GET",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        setUserCar(res.data);
        console.log(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <View bgColor={"white"} w={"90%"} borderRadius={20}>
      <AssetSurmary
        data={userCar}
        title={`소유중인 차량 : ${userCar?.length}대`}
        textListInfo={[
          { title: "제조사", key: "company" },
          { title: "모델명", key: "model" },
          { title: "연식", key: "year", unit: "년식" },
          { title: "현재 예상가격", key: "price", unit: "원", isPrice: true },
        ]}
        onPressUpdate={() => {}}
        onPressAdditional={() => {}}
      />
    </View>
  );
}

export default CarCrudPage;
