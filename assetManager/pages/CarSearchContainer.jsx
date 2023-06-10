import React from "react";
import { apiPath } from "../services";
import axios from "axios";
import { Alert } from "react-native";
import InputTextComponent from "@components/InputTextComponent";
import { Box, Button, Stack } from "native-base";
import { useSelector } from "react-redux";
import { carIdUpdate } from "../action";

function CarSearchContainer({ register }) {
  const { carId } = useSelector((state) => state.car);

  let isPass = carId ? true : false;

  const onPress = () => {
    register("add1");
  };
  return (
    <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
      <Stack>
        <InputTextComponent
          name="car"
          formControlStyle={{ mb: "10" }}
          textLabel={{ frontText: "차량번호" }}
          inputStyle={{ marginTop: 15, width: "75%" }}
          title={"차량번호로 등록"}
          helperText={"소유중인 차량 번호를 입력해주세요."}
          value={carId}
          dispatchF={carIdUpdate}
        />
        <Button
          colorScheme={isPass ? "success" : "gray"}
          disabled={!isPass}
          onPress={onPress}
          m="3"
        >
          등록
        </Button>
      </Stack>
    </Box>
  );
}

export default CarSearchContainer;
