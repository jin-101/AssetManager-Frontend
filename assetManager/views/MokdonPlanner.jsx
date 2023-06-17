import React, { useState, useEffect } from "react";
import {
  Box,
  ScrollView,
  Stack,
  Text,
  VStack,
  Button,
  HStack,
  Divider,
  Radio,
} from "native-base";
import axios from "axios";
import { Alert, StyleSheet, View, Pressable } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { apiPath } from "../services";
import { useDispatch, useSelector } from "react-redux";
import InputTextComponent from "@components/InputTextComponent";
import SelectComponent from "../components/SelectComponent";
import { getAvgRate } from "../action/avgRate";
import Loading from "../components/Loading";
import { bankType } from "../utils";
import { MaterialIcons } from "@expo/vector-icons";

function MokdonPlanner(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { bankAndAvgRate } = useSelector((state) => state.avgRate);
  const [targetAmount, setTargetAmount] = useState("");
  const [targetPeriod, setTargetPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");

  const [avgRate, setAvgRate] = useState("");
  const saveType = ["예금", "적금", "My 소득(용돈)"];
  const asdf = {
    예금: "depositAvgRate",
    적금: "savingsAvgRate",
    //자유롭게: "",
  };
  const [type, setType] = useState("");
  const [bank, setBank] = useState("");
  const [result, setResult] = useState({});
  const [rateType, setRateType] = useState("");

  // 2-1. 목돈 계산하기 버튼 눌렀을 마
  const mokdoncalculatorBtn = () => {
    let mokdonDto = {
      targetAmount: targetAmount,
      targetPeriod: targetPeriod,
      type: type, // 예금, 적금
      rateType: rateType, // 단리, 복리
      bank: bank,
      avgRate: bankAndAvgRate[bank][asdf[type]], // 평균금리 (여기서 직접 set)
    };
    console.log("목돈계산기 버튼 누름 " + mokdonDto);
    if (targetAmount === "" || targetPeriod === "") {
      Alert.alert("", "금액과 기간 모두 입력해주세요");
      return;
    }
    console.log(mokdonDto);
    //
    axios({
      url: `${apiPath}/mokdon/mokdonCalculate`,
      method: "POST",
      data: JSON.stringify(mokdonDto),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("계산한 결과 : " + res.data);
        // ★ 왜 여기선 바로 반영이 안되고 이전 값이 나오는 거지??
        setResult(res.data);
      })
      .catch((err) => {
        console.log("계산에러 : " + err);
      });
  };

  // 2-2. 이자 계산기 버튼 눌렀을 떄
  const interestCalculatorBtn = () => {
    let mokdonDto = {
      targetAmount: amount,
      targetPeriod: period,
      type: type, // 예금, 적금
      rateType: rateType, // 단리, 복리
      bank: bank,
      avgRate: bankAndAvgRate[bank][asdf[type]], // 평균금리 (여기서 직접 set)
    };
    console.log("이자계산기 버튼 누름 " + mokdonDto);
    if (amount === "" || period === "") {
      Alert.alert("", "금액과 기간 모두 입력해주세요");
      return;
    } else if (type === "") {
      Alert.alert("", "예금 또는 적금을 선택해주세요");
      return;
    } else if (rateType === "") {
      Alert.alert("", "단리 또는 복리를 선택해주세요");
      return;
    }
    console.log(mokdonDto);
    //
    axios({
      url: `${apiPath}/mokdon/interestCalculate`,
      method: "POST",
      data: JSON.stringify(mokdonDto),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("계산한 결과 : " + res.data);
        // ★ 왜 여기선 바로 반영이 안되고 이전 값이 나오는 거지??
        setResult(res.data);
      })
      .catch((err) => {
        console.log("계산에러 : " + err);
      });
    setRateType(""); // 단리, 복리 라디오 버튼 초기화
  };

  // 1. 은행-평균금리 정보 받아오기
  useEffect(() => {
    // 데이터 로딩 작업 수행
    // key의 개수가 총 17개인데, 처음에 데이터가 dispatch 안됐을 땐 17이 아니므로 처음에만 로딩 걸어주게끔 설정하였음
    //if (Object.keys(bankAndAvgRate).length < 0)
    setIsLoading(true);

    // ★ bankAndAvgRate를 초기화가 안되서 그런지, if문 안에 넣으면 제대로 값을 못 불러오는 거 같음요
    axios({
      url: `${apiPath}/mokdon/getAvgRate`,
      method: "GET",
    }).then((res) => {
      dispatch(getAvgRate(res.data));
      //if (Object.keys(bankAndAvgRate).length === 17)
      setIsLoading(false);
    });
  }, []); // [] : 렌더링 될때 처음 1번만 실행한다는 뜻.

  // ★ 진이형한테 질문 - 왜 여기선 setter로 변경된 값이 바로 반영되고
  console.log("길이 " + Object.keys(bankAndAvgRate));

  // (1)목돈, (2)계산기 왔다갔다 버튼
  const [btnStatus, setBtnStatus] = useState(true);
  const mokdonBtn = () => {
    setBtnStatus(true);
  };
  const calculatorBtn = () => {
    setBtnStatus(false);
    setType("");
  };
  console.log("라디오11 버튼 타입 뭐고 " + type);
  console.log("라디오22 버튼 타입 뭐고 " + rateType);
  console.log("목돈계산기 금액 " + targetAmount);
  console.log("목돈계산기 기간 " + targetPeriod);
  console.log("이자계산기 금액 " + amount);
  console.log("이자계산기 기간 " + period);

  if (isLoading) return <Loading />; // 로딩

  return (
    <ScrollView mt="10" mb="10">
      <HStack space={5} justifyContent="center">
        <Button width={"40%"} size="lg" variant="outline" onPress={mokdonBtn}>
          목돈 마련 플래너
        </Button>
        <Button
          width={"40%"}
          size="lg"
          variant="outline"
          colorScheme="secondary"
          onPress={calculatorBtn}
        >
          예적금 이자 계산기
        </Button>
      </HStack>

      {/* (1) 목돈 마련 플래너 */}
      {btnStatus ? (
        <VStack mt="10" mb="10" alignItems="center">
          <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
            <Text mb={2.5} fontSize={25}>
              목돈 마련 플래너
            </Text>
            <Divider></Divider>
            <SelectComponent
              selectItem={saveType}
              value={type}
              parentSetState={setType}
              // CSS
              formControlLabelProps={{
                text: "저축 유형",
              }}
              formControlHelperProps={{
                text: "목돈을 모으는 방법을 선택해주세요",
              }}
              formControlProps={{ marginBottom: 5, marginTop: 5 }}
            ></SelectComponent>
            {(type === "예금" || type === "적금") && (
              <>
                <SelectComponent
                  selectItem={bankType}
                  value={bank}
                  parentSetState={setBank}
                  // CSS
                  formControlLabelProps={{
                    text: "은행 선택",
                  }}
                  formControlHelperProps={{
                    text: "예금/적금 선택시 은행 골라주세요",
                  }}
                  formControlProps={{ marginBottom: 5 }}
                ></SelectComponent>

                {bank !== "" && (
                  <InputTextComponent
                    formControlLabelProps={{
                      text: `평균 ${type}금리`,
                    }}
                    value={bankAndAvgRate[bank][asdf[type]]}
                    textInputProps={{ readOnly: true }}
                  ></InputTextComponent>
                )}
              </>
            )}
            <InputTextComponent
              inputType="number"
              value={targetAmount}
              parentSetState={setTargetAmount}
              // formControlHelperProps={{
              //   text: "모으고 싶은 목표금액을 입력해주세요",
              // }}
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
              // formControlHelperProps={{
              //   text: "목돈을 모을 기간을 입력해주세요",
              // }}
            ></InputTextComponent>
            <Button onPress={mokdoncalculatorBtn}>계산하기</Button>
          </Box>

          {btnStatus === true && result.type === "예금" && (
            <Box bg="violet.100" w="90%" p="5" borderRadius="2xl" mb="5">
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} 가입 시 필요한 원금`,
                }}
                value={"약 " + result.roundedPrincipal + " 만원"}
              ></InputTextComponent>
            </Box>
          )}
          {btnStatus === true && result.type === "적금" && (
            <Box bg="red.100" w="90%" p="5" borderRadius="2xl" mb="5">
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} 가입 시 필요한 월납입액`,
                }}
                value={"약 " + result.roundedPrincipal + " 만원"}
              ></InputTextComponent>
            </Box>
          )}
        </VStack>
      ) : (
        <VStack mt="10" mb="10" alignItems="center">
          <Box bg="red.100" w="90%" p="5" borderRadius="2xl" mb="5">
            <Text mb={2.5} fontSize={25}>
              예적금 이자 계산기
            </Text>
            <Divider></Divider>
            <Radio.Group
              mt={2.5}
              alignItems="center"
              onChange={(type) => setType(type)}
            >
              <Stack direction={"row"} space={20}>
                <Radio value="예금" my={1}>
                  예금
                </Radio>
                <Radio value="적금" my={1}>
                  적금
                </Radio>
              </Stack>
            </Radio.Group>
            <SelectComponent
              selectItem={bankType}
              value={bank}
              parentSetState={setBank}
              // CSS
              formControlLabelProps={{
                text: "은행 선택",
              }}
              formControlHelperProps={{
                text: "예금/적금 선택시 은행 골라주세요",
              }}
              formControlProps={{ marginBottom: 5, marginTop: 5 }}
            ></SelectComponent>

            {bank !== "" && (
              <InputTextComponent
                formControlLabelProps={{
                  text: `평균 ${type}금리`,
                }}
                value={bankAndAvgRate[bank][asdf[type]]}
                readOnly="true"
              ></InputTextComponent>
            )}
            <InputTextComponent
              inputType="number"
              value={amount}
              parentSetState={setAmount}
              helperText={"목표기간 동안 예치할 금액을 입력해주세요"}
              formControlLabelProps={{ text: "예치금액 (만원)" }}
              priceFormat={true}
            ></InputTextComponent>
            {/* {type === "예금" ? (
              <InputTextComponent
                inputType="number"
                value={amount}
                parentSetState={setAmount}
                helperText={"목표기간 동안 예치할 금액을 입력해주세요"}
                formControlLabelProps={{ text: "예치금액 (만원)" }}
                priceFormat={true}
              ></InputTextComponent>
            ) : (
              <InputTextComponent
                inputType="number"
                value={amount}
                parentSetState={setAmount}
                helperText={"매달 적립할 금액을 입력해주세요"}
                formControlLabelProps={{ text: "월 납입액 (만원)" }}
                priceFormat={true}
              ></InputTextComponent>
            )} */}
            <InputTextComponent
              formControlLabelProps={{
                text: "목표기간 (개월)",
              }}
              inputType="number"
              value={period}
              parentSetState={setPeriod}
            ></InputTextComponent>
            <Radio.Group
              mb={5}
              alignItems="center"
              onChange={(rateType) => setRateType(rateType)}
            >
              <Stack direction={"row"} space={20}>
                <Radio value="단리" my={1}>
                  단리
                </Radio>
                <Radio value="복리" my={1}>
                  복리
                </Radio>
              </Stack>
            </Radio.Group>
            <Button onPress={interestCalculatorBtn}>계산하기</Button>
          </Box>

          {btnStatus === false && result.type === "예금" && (
            <Box bg="green.100" w="90%" p="5" borderRadius="2xl" mb="5">
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 일반 (15.4%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr15_4 + " 원"}
              ></InputTextComponent>
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (9.5%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr9_5 + " 원"}
              ></InputTextComponent>
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (1.4%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr1_4 + " 원"}
              ></InputTextComponent>
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 비과세 (0.0%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr0_0 + " 원"}
              ></InputTextComponent>
            </Box>
          )}
          {btnStatus === false && result.type === "적금" && (
            <Box bg="green.100" w="90%" p="5" borderRadius="2xl" mb="5">
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 일반 (15.4%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr15_4 + " 원"}
              ></InputTextComponent>
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (9.5%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr9_5 + " 원"}
              ></InputTextComponent>
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (1.4%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr1_4 + " 원"}
              ></InputTextComponent>
              <InputTextComponent
                formControlLabelProps={{
                  text: `${result.type} - 비과세 (0.0%)`,
                }}
                textInputProps={{ readOnly: true }}
                priceFormat={true}
                value={"약 " + result.netIntr0_0 + " 원"}
              ></InputTextComponent>
            </Box>
          )}
        </VStack>
      )}
      {/* bank !== "" 조건의 이유 : ★ 처음엔 bank가 ""인데, key값에 bank값을 주니까 자꾸 undefined value 어쩌고 하는 에러가 떴음 ㅅㅂ */}
      {/* ★ 저축 유형별 보이는 결과창이 다르게 설정하였음! */}
    </ScrollView>
  );
}

export default MokdonPlanner;
