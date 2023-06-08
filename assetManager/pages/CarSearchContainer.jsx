import React, { useState } from "react";
import { apiPath } from "../services";
import axios from "axios";
import { Alert } from "react-native";
import InputTextComponent from "@components/InputTextComponent";
import { Box, Button, Stack } from "native-base";

function CarSearchContainer(props) {
  const [carId, useCarId] = useState("");

  const myCarSearch = () => {
    axios({
      url: apiPath + `/car/mySearch.do/${carId}`,
      method: "GET",
    })
      .then((res) => {
        const { price, year, className } = res.data;
        if (price === "-" || !price || !year || !className) {
          Alert.alert(
            "오류",
            "검색한 정보의 차량을 찾을 수 없습니다.\n\n정보를 직접 입력해주세요."
          );
        } else {
          Alert.alert("", "차량등록을 완료하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
      <Stack>
        <InputTextComponent
          name="car"
          formControlStyle={{ mb: "10" }}
          textLabel={{ frontText: "차량번호" }}
          inputStyle={{ marginTop: 15, width: "75%" }}
          title={"차량번호로 조회"}
          helperText={"소유중인 차량 번호를 입력해주세요."}
          value={carId}
          parentSetState={useCarId}
        />
        <Button onPress={myCarSearch}>조회</Button>
      </Stack>
    </Box>
  );
}

export default CarSearchContainer;
