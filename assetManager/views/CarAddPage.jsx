import React, { useEffect } from "react";
import { VStack } from "native-base";
import CarSearchContainer from "../pages/CarSearchContainer";
import CarAddContainer from "../pages/CarAddContainer";
import { useDispatch, useSelector } from "react-redux";
import { carInitialize } from "../action";
import { Alert } from "react-native";
import axios from "axios";
import { apiPath } from "../services";
import ContentScrollView from "@components/ContentScrollView";

function CarAddPage(props) {
  const dispatch = useDispatch();
  const { carCompany, carModel, carYear, carId } = useSelector(
    (state) => state.car
  );

  useEffect(() => {
    dispatch(carInitialize());
  }, []); //처음에 초기화

  const responseFunction = (text) => {
    Alert.alert("", text);
    dispatch(carInitialize());
  };
  const errorFunction = (err) => {
    console.log("err", err);
    Alert.alert(
      "",
      "차량번호의 정보를 찾지 못했습니다. \n\n직접 입력해주세요."
    );
    dispatch(carInitialize());
  };

  const register = (type) => {
    if (type === "add1") {
      axios({
        url: apiPath + `/car/mySearch.do/${carId.replaceAll(" ", "")}`,
        method: "POST",
      }) //id 넘겨줘야됨
        .then((res) => {
          console.log(res.data);
          responseFunction(res.data);
        })
        .catch((err) => {
          errorFunction(err);
        });
    } else if (type === "add2") {
      console.log("고객정보", carCompany, carModel, carYear);
      axios({
        url: apiPath + `/car/insert.do/${carCompany}/${carModel}/${carYear}`,
        method: "POST",
      })
        .then((res) => {
          console.log(res.data);
          responseFunction(res.data);
        })
        .catch((err) => {
          errorFunction(err);
        });
    }
  };
  return (
    <ContentScrollView>
      <VStack alignItems="center" mt="5" mb="5">
        <CarSearchContainer register={register} />
        <CarAddContainer register={register} />
      </VStack>
    </ContentScrollView>
  );
}
export default CarAddPage;
