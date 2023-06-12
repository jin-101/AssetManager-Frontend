import React, { useEffect } from "react";
import { ScrollView, VStack } from "native-base";
import CarSearchContainer from "../pages/CarSearchContainer";
import CarAddContainer from "../pages/CarAddContainer";
import { useDispatch, useSelector } from "react-redux";
import { carInitialize } from "../action";
import { Alert } from "react-native";
import axios from "axios";
import { apiPath } from "../services";

function CarAddPage(props) {
  const dispatch = useDispatch();
  const { carCompany, carModel, carYear, carId } = useSelector(
    (state) => state.car
  );

  useEffect(() => {
    dispatch(carInitialize());
  }, []); //처음에 초기화

  const successFunction = () => {
    Alert.alert("", "차량등록을 완료하였습니다.");
    dispatch(carInitialize());
  };
  const warnFunction = (warn) => {
    console.log("warn");
    Alert.alert("", `${warn} \n\n정보를 직접 입력해주세요.`);
    dispatch(carInitialize());
  };
  const errorFunction = (err) => {
    console.log("err", err);
    Alert.alert(
      "오류",
      "올바른 형태의 차량번호가 아닙니다.\n\n정보를 직접 입력해주세요."
    );
    dispatch(carInitialize());
  };

  const register = (type) => {
    if (type === "add1") {
      axios({
        url: apiPath + `/car/mySearch.do/${carId}`,
        method: "POST",
      }) //id 넘겨줘야됨
        .then((res) => {
          const { price, year, className } = res.data;
          console.log("고객정보", className, year, price);
          if (!price || !year || !className) warnFunction(className);
          else successFunction();
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
          successFunction();
        })
        .catch((err) => {
          errorFunction(err);
        });
    }
  };
  return (
    <ScrollView>
      <VStack alignItems="center" mt="5" mb="5">
        <CarSearchContainer register={register} />
        <CarAddContainer register={register} />
      </VStack>
    </ScrollView>
  );
}
export default CarAddPage;
