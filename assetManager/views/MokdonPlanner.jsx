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
import { btnStyle, btnTextStyle } from "../styles";

function MokdonPlanner(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { bankAndAvgRate } = useSelector((state) => state.avgRate);
  // 목돈 계산기의 금액, 기간, 월 소득
  const [targetAmount, setTargetAmount] = useState("");
  const [targetPeriod, setTargetPeriod] = useState("");
  const [income, setIncome] = useState("");
  // 이자 계산기의 금액, 기간
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [avgRate, setAvgRate] = useState(""); // 직접입력한 금리
  const saveType = ["예금", "적금"]; //
  const asdf = {
    예금: "depositAvgRate",
    적금: "savingsAvgRate",
    //자유롭게: "",
  };
  const [type, setType] = useState("");
  const [bank, setBank] = useState("");
  const [result, setResult] = useState({});
  const [rateType, setRateType] = useState("");
  const reset = () => {
    setType("");
    setBank("");
    setAvgRate("");
    setIncome("");
  };

  // 2-1. 목돈 계산하기 버튼 눌렀을 때
  const mokdoncalculatorBtn = () => {
    if (targetAmount === "" || targetPeriod === "") {
      Alert.alert("", "금액과 기간 모두 입력해주세요");
      return;
    } else if (type === "") {
      Alert.alert("", "저축 유형을 선택해주세요");
      return;
    } else if ((type === "예금" || type === "적금") && bank === "") {
      Alert.alert("", "은행을 선택해주세요");
      return;
    } else if (
      (type === "예금" || type === "적금") &&
      bank === "직접입력" &&
      avgRate === ""
    ) {
      Alert.alert("", "금리를 입력해주세요");
      return;
    }
    let mokdonDto = {
      targetAmount: targetAmount,
      targetPeriod: targetPeriod,
      type: type, // 예금, 적금
      rateType: rateType, // 단리, 복리
      bank: bank,
      avgRate: bankAndAvgRate[bank][asdf[type]] || avgRate, // (1)은행 고를경우 왼쪽, (2)직접입력할 경우 오른쪽
      income: income, // 사용자의 저축액
    };
    console.log("목돈계산기 버튼 누름 " + mokdonDto);
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
    if (type === "") {
      Alert.alert("", "예금 또는 적금을 선택해주세요");
      return;
    } else if (rateType === "") {
      Alert.alert("", "단리 또는 복리를 선택해주세요");
      return;
    } else if (bank === "") {
      Alert.alert("", "은행을 선택해주세요");
      return;
    } else if (bank === "직접입력" && avgRate === "") {
      Alert.alert("", "금리를 입력해주세요");
      return;
    } else if (amount === "" || period === "") {
      Alert.alert("", "금액과 기간 모두 입력해주세요");
      return;
    }
    let mokdonDto = {
      targetAmount: amount,
      targetPeriod: period,
      type: type, // 예금, 적금
      rateType: rateType, // 단리, 복리
      bank: bank,
      avgRate: bankAndAvgRate[bank][asdf[type]] || avgRate, // (1)은행 고를경우 왼쪽, (2)직접입력할 경우 오른쪽
    };
    console.log("이자계산기 버튼 누름 " + mokdonDto);
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
  };

  // 1. 은행-평균금리 정보 받아오기
  useEffect(() => {
    //if (Object.keys(bankAndAvgRate).length < 0)
    setIsLoading(true);

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

  // 3. 목돈 <-> 계산기 왔다갔다 상단 버튼
  const [btnStatus, setBtnStatus] = useState(true);
  const mokdonBtn = () => {
    setBtnStatus(true);
    reset();
  };
  const calculatorBtn = () => {
    setBtnStatus(false);
    reset();
  };
  console.log("목돈계산기 타입 " + type);
  console.log("목돈계산기 금리타입 " + rateType);
  console.log("목돈계산기 금액 " + targetAmount);
  console.log("목돈계산기 기간 " + targetPeriod);
  console.log("이자계산기 타입 " + type);
  console.log("이자계산기 금리타입 " + rateType);
  console.log("이자계산기 금액 " + amount);
  console.log("이자계산기 기간 " + period);

  if (isLoading) return <Loading />; // 로딩

  return (
    <ScrollView mt="10" mb="10">
      <HStack space={5} justifyContent="center">
        <Button
          {...btnStyle}
          borderColor="info.400"
          _text={{ ...btnTextStyle, color: "black" }} // color: "info.400"
          _pressed={{
            bg: "info.200",
            borderColor: "white",
          }}
          onPress={mokdonBtn}
        >
          목돈 마련 플래너
        </Button>
        <Button
          {...btnStyle}
          borderColor="secondary.400"
          _text={{ ...btnTextStyle, color: "black" }} // color: "secondary.400"
          _pressed={{
            bg: "secondary.200",
            borderColor: "white",
          }}
          onPress={calculatorBtn}
        >
          예적금 이자 계산기
        </Button>
      </HStack>

      {/* (1) 목돈 마련 플래너 파트 */}
      {btnStatus ? (
        <VStack mt="5" mb="10" alignItems="center">
          <Box
            bg="blue.50"
            w="90%"
            p="5"
            borderRadius="2xl"
            mb="5"
            alignItems={"center"}
          >
            <Text mb={2.5} fontSize={25}>
              목돈 마련 플래너
            </Text>
            <Divider></Divider>
            <InputTextComponent
              inputType="number"
              value={targetAmount}
              parentSetState={setTargetAmount}
              // formControlHelperProps={{
              //   text: "모으고 싶은 목표금액을 입력해주세요",
              // }}
              formControlLabelProps={{ text: "목표금액 (만원)" }}
              priceFormat={true}
              formControlProps={{ marginTop: 5 }}
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
              formControlProps={{ marginBottom: 5 }}
            ></SelectComponent>
            {type !== "" && (
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

                {bank !== "" && bank !== "직접입력" && (
                  <InputTextComponent
                    formControlLabelProps={{
                      text: `평균 ${type}금리 (%)`,
                    }}
                    value={bankAndAvgRate[bank][asdf[type]]}
                    textInputProps={{ readOnly: true }}
                  ></InputTextComponent>
                )}
                {bank !== "" && bank === "직접입력" && (
                  <InputTextComponent
                    formControlLabelProps={{
                      text: `금리 (%)`,
                    }}
                    value={avgRate}
                    parentSetState={setAvgRate}
                    inputType="double"
                  ></InputTextComponent>
                )}

                {type === "예금" && (
                  <InputTextComponent
                    value={income}
                    parentSetState={setIncome}
                    inputType="number"
                    formControlLabelProps={{
                      text: "총 예치금액 (만원)",
                    }}
                    formControlHelperProps={{
                      text: "저축하는 돈이 따로 있는 경우에만 입력",
                    }}
                    formControlProps={{ marginBottom: 5 }}
                  ></InputTextComponent>
                )}
                {type === "적금" && (
                  <InputTextComponent
                    value={income}
                    parentSetState={setIncome}
                    inputType="number"
                    formControlLabelProps={{
                      text: "매달 적금액 (만원)",
                    }}
                    formControlHelperProps={{
                      text: "저축하는 돈이 따로 있는 경우에만 입력",
                    }}
                    formControlProps={{ marginBottom: 5 }}
                  ></InputTextComponent>
                )}
              </>
            )}
            <Button style={styles.calculateBtn} onPress={mokdoncalculatorBtn}>
              계산하기
            </Button>
          </Box>

          {btnStatus === true && result.type === "예금" && (
            <Box bg="violet.50" w="90%" p="5" borderRadius="2xl">
              <InputTextComponent
                value={result.totalPai}
                formControlLabelProps={{
                  text: `내가 저축한 총 원리금`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.lackingAmount}
                formControlLabelProps={{
                  text: `부족한 금액`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.requiredPrincipal}
                formControlLabelProps={{
                  text: `추가로 필요한 예치금 (${result.type} 가입 시)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
            </Box>
          )}
          {btnStatus === true && result.type === "적금" && (
            <Box bg="violet.50" w="90%" p="5" borderRadius="2xl">
              <InputTextComponent
                value={result.totalPai}
                formControlLabelProps={{
                  text: `내가 저축한 총 원리금`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.lackingAmount}
                formControlLabelProps={{
                  text: `부족한 금액`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.requiredPrincipal}
                formControlLabelProps={{
                  text: `추가로 필요한 월납입액 (${result.type} 가입 시)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
            </Box>
          )}
        </VStack>
      ) : (
        // (2) 이자 계산기 파트
        <VStack mt="5" mb="10" alignItems="center">
          <Box
            bg="red.50"
            w="90%"
            p="5"
            borderRadius="2xl"
            mb="5"
            alignItems={"center"}
          >
            <Text mb={2.5} fontSize={25}>
              예적금 이자 계산기
            </Text>
            <Divider></Divider>
            <Radio.Group
              mt={2.5}
              alignItems="center"
              onChange={(type) => setType(type)}
            >
              <Stack direction={"row"} space={20} height={10}>
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
              formControlProps={{ marginBottom: 5 }}
            ></SelectComponent>

            {bank !== "" && bank !== "직접입력" && (
              <InputTextComponent
                formControlLabelProps={{
                  text: `평균 ${type}금리`,
                }}
                value={bankAndAvgRate[bank][asdf[type]]}
                textInputProps={{ readOnly: true }}
              ></InputTextComponent>
            )}
            {bank !== "" && bank === "직접입력" && (
              <InputTextComponent
                formControlLabelProps={{
                  text: `금리 (%)`,
                }}
                value={avgRate}
                parentSetState={setAvgRate}
                inputType="double"
              ></InputTextComponent>
            )}
            {/* <InputTextComponent
              inputType="number"
              value={amount}
              parentSetState={setAmount}
              helperText={"목표기간 동안 예치할 금액을 입력해주세요"}
              formControlLabelProps={{ text: "예치금액 (만원)" }}
              priceFormat={true}
            ></InputTextComponent> */}
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
            {type === "예금" ? (
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
            )}
            <InputTextComponent
              formControlLabelProps={{
                text: "저축기간 (개월)",
              }}
              inputType="number"
              value={period}
              parentSetState={setPeriod}
            ></InputTextComponent>
            <Button style={styles.calculateBtn} onPress={interestCalculatorBtn}>
              계산하기
            </Button>
          </Box>

          {btnStatus === false && result.type === "예금" && (
            <Box bg="green.50" w="90%" p="5" borderRadius="2xl" mb="5">
              <InputTextComponent
                value={result.netIntr15_4}
                formControlLabelProps={{
                  text: `${result.type} - 일반 (15.4%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.netIntr9_5}
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (9.5%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.netIntr1_4}
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (1.4%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.netIntr0_0}
                formControlLabelProps={{
                  text: `${result.type} - 비과세 (0.0%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
            </Box>
          )}
          {btnStatus === false && result.type === "적금" && (
            <Box bg="green.100" w="90%" p="5" borderRadius="2xl" mb="5">
              <InputTextComponent
                value={result.netIntr15_4}
                formControlLabelProps={{
                  text: `${result.type} - 일반 (15.4%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.netIntr9_5}
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (9.5%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.netIntr1_4}
                formControlLabelProps={{
                  text: `${result.type} - 세금우대 (1.4%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
              ></InputTextComponent>
              <InputTextComponent
                value={result.netIntr0_0}
                formControlLabelProps={{
                  text: `${result.type} - 비과세 (0.0%)`,
                }}
                // 부가 설정
                textInputProps={{ readOnly: true }}
                //textInputStyle={{ width: "85%" }}
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

const styles = StyleSheet.create({
  calculateBtn: {
    width: "70%",
  },
});

export default MokdonPlanner;
