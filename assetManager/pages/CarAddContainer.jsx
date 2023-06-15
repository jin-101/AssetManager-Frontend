import React, { useEffect } from "react";
import { Box, Button } from "native-base";
import SelectComponent from "@components/SelectComponent";
import InputTextComponent from "@components/InputTextComponent";
import InputDateComponent from "@components/InputDateComponent";
import axios from "axios";
import { apiPath } from "../services";
import { Text } from "react-native";
import { formControlLableBasicStyle } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  carCompanyListSearch,
  carCompanyUpdate,
  carModelListSearch,
  carModelUpdate,
  carYearUpdate,
} from "../action";

function CarAddContainer({ register }) {
  console.log("CarAddContainer >>>");

  const dispatch = useDispatch();
  const { companyList, modelList } = useSelector((state) => state.carList);
  const { carCompany, carModel, carYear } = useSelector((state) => state.car);
  const isFirst = companyList.length === 0 || false;
  const year = Number(new Date().getFullYear());

  const isPass = carCompany && carModel && carYear ? true : false;

  const onPress = () => {
    register("add2");
  };

  useEffect(() => {
    if (isFirst) {
      axios({
        url: `${apiPath}/car/companyList.do`,
        method: "GET",
      })
        .then((res) => {
          dispatch(carCompanyListSearch(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    if (carCompany !== "") {
      if (carCompany !== "기타") {
        if (!modelList[carCompany]) {
          axios({
            url: `${apiPath}/car/modelList.do/${carCompany}`,
            method: "GET",
          })
            .then((res) => {
              dispatch(carModelListSearch(carCompany, [...new Set(res.data)]));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  }, [carCompany]);

  return (
    <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
      <Box w="100%">
        <Text
          style={{
            ...formControlLableBasicStyle.label,
            marginBottom: 30,
            fontWeight: "bold",
          }}
        >
          {"직접 등록"}
        </Text>
        <SelectComponent
          isVertical={true}
          formControlProps={{ marginBottom: 10 }}
          formControlLabelProps={{
            text: "제조사 조회",
          }}
          formControlHelperProps={{ text: "소유차량의 제조사를 선택하세요." }}
          // selectProps={{}}
          selectItem={companyList}
          // selectItemStyle={{}}
          value={carCompany}
          dispatchF={carCompanyUpdate}
        />
        {carCompany !== "" && (
          <>
            {carCompany !== "기타" ? (
              <SelectComponent
                formControlProps={{ marginBottom: 10 }}
                formControlLabelProps={{
                  text: "모델 조회",
                  fontWeight: "normal",
                  fontSize: 15,
                  color: "black",
                }}
                formControlHelperProps={{
                  text: "소유차량의 모델을 선택하세요.",
                }}
                // selectProps={{}}
                selectItem={modelList[carCompany]}
                // selectItemStyle={{}}
                value={carModel}
                dispatchF={carModelUpdate}
              />
            ) : (
              <InputTextComponent
                formControlStyle={{ mb: "10" }}
                formControlLabelProps={{ fontWeight: "normal", fontSize: 15 }}
                title={"모델 입력"}
                helperText={"소유차량의 모델을 입력하세요."}
                value={carModel}
                dispatchF={carModelUpdate}
              />
            )}
            <InputDateComponent
              formControlLabelProps={{ fontWeight: "normal", fontSize: 15 }}
              formControlStyle={{ mb: "5" }}
              title={"자동차 연식"}
              helperText={"소유차량의 연식을 선택하세요."}
              value={carYear}
              dispatchF={carYearUpdate}
              inputStyle={{ color: carYear !== "" ? "black" : "lightgray" }}
              datePickerProps={{
                type: "YYYY",
                minDate: `${year - 20}-01-01`,
                maxDate: `${year}-12-31`,
                daySuffix: "년",
                width: 300,
                rowHeight: 60,
                selectedBorderLineWidth: "2",
                toolBarCancelStyle: { color: "black" },
              }}
            />
            <Button
              colorScheme={isPass ? "success" : "gray"}
              disabled={!isPass}
              onPress={onPress}
              m="3"
            >
              등록
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default CarAddContainer;
