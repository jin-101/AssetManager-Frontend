import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
  VStack,
  Select,
  Button,
  Icon,
  Ionicons,
} from "native-base";
import axios from "axios";
import {
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  View,
} from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import { makeDateString } from "../utils";
import InputTextComponent from "@components/InputTextComponent";
import SelectComponent from "../components/SelectComponent";

function MokdonPlanner(props) {
  const [targetAmount, setTargetAmount] = useState("");
  const [targetPeriod, setTargetPeriod] = useState("");
  const saveType = ["자유롭게", "예금", "적금"];
  const bankType = ["신한은행", "국민은행"]; // ★ 여기 뱅크타입을 이제 Back에서 데이터 받아서 사용해야 함
  const [type, setType] = useState("");
  const [bank, setBank] = useState("");

  console.log("내가 고른 저축 유형 : " + type);
  console.log("내가 고른 은행 종류 : " + bank);

  // 계산하기 버튼 눌렀을 때
  const calculateBtn = () => {
    const data = {
      targetAmount: targetAmount,
      targetPeriod: targetPeriod,
      type: type,
      bank: bank,
    };
    console.log(data);

    if (targetAmount === "" || targetPeriod === "") {
      Alert.alert("", "목표금액과 목표기간 모두 입력해주세요");
      return;
    }
    axios({
      url: `${apiPath}/mokdon/calculate`,
      method: "GET",
      data: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <ScrollView>
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <InputTextComponent
            title="목표금액"
            inputType="number"
            value={targetAmount}
            parentSetState={setTargetAmount}
            textLabel={{
              endText: "만원",
            }}
            inputStyle={{ width: "85%" }}
            helperText={"모으고 싶은 목표금액을 입력해주세요"}
            formControlProps={{ mb: "5" }}
            priceFormat={true}
          ></InputTextComponent>
          <InputTextComponent
            title="목표기간"
            formControlLabelProps={{
              text: "ㅁㄴㅇㄹ",
            }}
            inputType="number"
            value={targetPeriod}
            parentSetState={setTargetPeriod}
            textLabel={{
              endText: "년",
            }}
            inputStyle={{ width: "85%" }}
            helperText={"목돈을 모을 기간을 입력해주세요"}
            formControlProps={{ mb: "5" }}
          ></InputTextComponent>
          <SelectComponent
            selectItem={saveType}
            value={type}
            parentSetState={setType}
            // CSS
            formControlLabelProps={{
              text: "저축 유형",
              fontSize: 15,
              fontWeight: "normal",
              color: "black",
            }}
            formControlHelperProps={{
              text: "목돈을 모으는 방법을 선택해주세요",
            }}
            formControlProps={{ marginBottom: 5 }}
          ></SelectComponent>
          {type.length <= 3 && (
            <SelectComponent
              selectItem={bankType}
              value={bank}
              parentSetState={setBank}
              // CSS
              formControlLabelProps={{
                text: "은행 선택",
                fontSize: 15,
                fontWeight: "normal",
                color: "black",
              }}
              formControlHelperProps={{
                text: "예금/적금 선택시 은행 골라주세요",
              }}
              formControlProps={{ marginBottom: 5 }}
            ></SelectComponent>
          )}
          {/* <HStack width="40%" space={5} justifyContent="flex-start">
            <SelectComponent></SelectComponent>
            <SelectComponent></SelectComponent>
          </HStack> */}
          <Button onPress={calculateBtn}>계산하기</Button>
        </Box>
      </VStack>
    </ScrollView>
  );
}

export default MokdonPlanner;
