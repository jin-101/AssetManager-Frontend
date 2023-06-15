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
  const [result, setResult] = useState({}); // ★ 스프링에서 DTO 객체로 받을 생각

  console.log("내가 고른 저축 유형 : " + type);
  console.log("내가 고른 은행 종류 : " + bank);

  // 계산하기 버튼 눌렀을 때
  const calculateBtn = () => {
    let mokdonDto = {
      targetAmount: targetAmount,
      targetPeriod: targetPeriod,
      type: type,
      bank: bank,
    };
    if (targetAmount === "" || targetPeriod === "") {
      Alert.alert("", "목표금액과 목표기간 모두 입력해주세요");
      return;
    }
    console.log(mokdonDto);
    //
    axios({
      url: `${apiPath}/mokdon/calculate`,
      method: "POST",
      data: JSON.stringify(mokdonDto),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("계산한 결과 : " + res.data);
        setResult(res.data);
        // ★ 왜 여기선 바로 반영이 안되고 이전 값이 나오는 거지??
        console.log("(2)axios 안에서 찍은 콘솔 : " + result.principal);
        console.log(result.rateType);
        console.log(result.bank);
        console.log(result.type);
        console.log(result.avgRate);
      })
      .catch((err) => {
        console.log("계산에러 : " + err);
      });
  };

  // ★ 진이형한테 질문 - 왜 여기선 setter로 변경된 값이 바로 반영되고
  console.log("(1) axios 바깥에서 찍은 콘솔 : " + result.principal);
  console.log(result.rateType);
  console.log(result.bank);
  console.log(result.type);
  console.log(result.avgRate);

  return (
    <ScrollView>
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <SelectComponent
            selectItem={saveType}
            value={type}
            parentSetState={setType}
            // CSS
            formControlLabelProps={{
              text: "저축 유형",
              // fontSize: 15,
              // fontWeight: "normal",
              // color: "black",
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
                // fontSize: 15,
                // fontWeight: "normal",
                // color: "black",
              }}
              formControlHelperProps={{
                text: "예금/적금 선택시 은행 골라주세요",
              }}
              formControlProps={{ marginBottom: 5 }}
            ></SelectComponent>
          )}
          <InputTextComponent
            title="목표금액 (만원)"
            inputType="number"
            value={targetAmount}
            parentSetState={setTargetAmount}
            //inputStyle={{ width: "85%" }}
            helperText={"모으고 싶은 목표금액을 입력해주세요"}
            formControlLabelProps={{ text: "목표금액 (만원)" }}
            priceFormat={true}
          ></InputTextComponent>
          <InputTextComponent
            formControlLabelProps={{
              text: "목표기간 (개월)",
            }}
            inputType="number"
            value={targetPeriod}
            parentSetState={setTargetPeriod}
            //inputStyle={{ width: "85%" }}
            helperText={"목돈을 모을 기간을 입력해주세요"}
          ></InputTextComponent>
          <Button onPress={calculateBtn}>계산하기</Button>
        </Box>

        {/* ★ 저축 유형별 보이는 결과창이 다르게 설정하였음! */}
        {type === "자유롭게" && (
          <Box bg="orange.100" w="90%" p="5" borderRadius="2xl" mb="5">
            <InputTextComponent
              formControlLabelProps={{
                text: "자유롭게 이 부분을 어케 할지가 고민이구만...",
              }}
              //value={"약 " + String(result.principal)+" 만원"}
            ></InputTextComponent>
          </Box>
        )}
        {result.type === "예금" && (
          <Box bg="violet.100" w="90%" p="5" borderRadius="2xl" mb="5">
            <InputTextComponent
              formControlLabelProps={{
                text: "(1) 예금이라면 - '필요한 원금은 result 만원입니다'",
              }}
              value={"약 " + String(result.principal) + " 만원"}
            ></InputTextComponent>
          </Box>
        )}
        {result.type === "적금" && (
          <Box bg="red.100" w="90%" p="5" borderRadius="2xl" mb="5">
            <InputTextComponent
              formControlLabelProps={{
                text: "(2) 적금이라면 - '필요한 월납입액은 result 만원입니다'",
              }}
              value={"약 " + String(result.principal) + " 만원"}
            ></InputTextComponent>
          </Box>
        )}
      </VStack>
    </ScrollView>
  );
}

export default MokdonPlanner;
