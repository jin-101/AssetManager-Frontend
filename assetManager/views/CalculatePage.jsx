import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Pressable,
  Stack,
  Text,
  PresenceTransition,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";
import Counter from "@components/Counter";
import InputTextComponent from "@components/InputTextComponent";
import InputRadioComponent from "@components/InputRadioComponent";
import { btnStyle, btnTextStyle } from "../styles";
import axios from "axios";
import { inputPriceFormat } from "../utils";
import { Alert } from "react-native";

const taxCheck = (value) => {
  const str = value.toString();
  const obj = { type: "", val: "" };
  if (str.indexOf("-") !== -1) {
    const fixVal = str.replace("-", "");
    obj.type = "환급";
    obj.val = inputPriceFormat(fixVal);
  } else {
    obj.type = "납부";
    obj.val = inputPriceFormat(str);
  }
  return `${obj.val}원\n${obj.type}예정입니다.`;
};

function CalculatePage(props) {
  const { token } = useSelector((state) => state.login);
  const [data, setData] = useState({
    salary: 0,
    nonTaxIncome: 0,
    spouse: 0,
    parents: 0,
    children: 0,
    sibling: 0,
    fosterChildren: 0,
    lowIncomePeople: 0,
    oldPeople: 0,
    disabledPerson: 0,
    woman: 0,
    oneParent: 0,
    newBirthChild: 0,
    loanRepaymentPrincipal: 0,
    loanRepaymentInterest: 0,
    ginapbuseaek: 0,
  }); //연말정산 관련 받아온 데이터가 있을 때 담기
  const [tax, setTax] = useState(0);
  const [paging, setPaging] = useState(0);
  const maxPage = 3;
  const [btnIsVisible, setBtnIsVisible] = useState(false);
  const [calculateUpdate, setCalculateUpdate] = useState(false);
  const [detailC, setDetailC] = useState("");
  const navigation = useNavigation();

  const accountBookNavi = () => {
    navigation.navigate("Home");
    navigation.navigate("AccountBook");
  };

  const buttonControl = () => {
    setBtnIsVisible(!btnIsVisible);
  };

  const movePaging = (type) => {
    let np;
    if (type === "pre") {
      np = paging > 0 ? paging - 1 : 0;
    } else if (type === "next") {
      np = paging < maxPage ? paging + 1 : maxPage;
    }
    setPaging(np);
  };

  // 조회상태인지 수정상태인지
  const update = () => {
    setCalculateUpdate(!calculateUpdate);
  };
  // 등록시 axios로 데이터 보내기
  const register = () => {
    if (Object.keys(data).every((el) => data[el] !== "")) {
      update();
      axios({
        url: `${apiPath}/rest/yearEndTax/saveAndUpdateTaxInformation.do`,
        method: "POST",
        headers: { "Content-Type": `application/json` },
        data: JSON.stringify({
          ...data,
          detailCode: detailC,
          memberId: token,
          userId: token,
        }),
      }).then((res) => {
        setTax(res.data);
      });
    } else {
      Alert.alert("", "입력이 누락된 항목이 있습니다.");
    }
  };

  // 각각의 상태값 변경
  const onChangeValue = (value, id, name) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //count관련 상태값 변경을 위한 매개함수
  const countOnChange = (sign, name) => {
    let newCount;
    if (sign === "plus") {
      newCount = data[name] < 9 ? data[name] + 1 : 9;
    } else if (sign === "minus") {
      newCount = data[name] === 0 ? 0 : data[name] - 1;
    }
    onChangeValue(newCount, "", name);
  };

  //수정-등록 버튼
  const updateOrSubmitButton = () => {
    return (
      <Center>
        <Button
          onPress={calculateUpdate ? register : update}
          colorScheme={calculateUpdate ? "success" : "warning"}
          _pressed={{
            bg: calculateUpdate ? "success" : "warning",
          }}
          w="90%"
          mt="5"
          mb="10"
        >
          {calculateUpdate ? "등록" : "수정"}
        </Button>
      </Center>
    );
  };

  //처음 시작시 데이터 받아오기
  useEffect(() => {
    axios({
      url: `${apiPath}/rest/yearEndTax/saveTaxInformation.do`,
      method: "GET",
      params: {
        userId: token,
      },
    }).then((res) => {
      const { calculatedTax, detailCode, memberId, year, ...rest } = res.data;
      setData(rest);
      setDetailC(detailCode);
      setTax(calculatedTax || 0);
      if (calculatedTax) buttonControl();
    });
  }, []);

  return (
    <ContentScrollView>
      <Center>
        {Object.keys(data)?.length > 0 && data.salary !== 0 && (
          <Box
            mt={5}
            mb={5}
            w={"90%"}
            bg={"gray.200"}
            borderRadius={20}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box mt={5} mb={5}>
              <Text fontSize={20}>
                {token}님은 {taxCheck(tax)}
              </Text>
            </Box>
          </Box>
        )}
        <Box mt={5} mb={5} w={"90%"}>
          <Box alignItems={"center"}>
            <Button
              {...btnStyle}
              w={"60%"}
              size="lg"
              onPress={accountBookNavi}
              mb={2.5}
            >
              <Text {...btnTextStyle}>가계부로 이동</Text>
            </Button>
            <Text>가계부 입력시 더 정확하게 계산할 수 있습니다.</Text>
          </Box>
        </Box>
        <Divider />
        <Box mt={5} mb={5} w={"90%"}>
          <Box alignItems={"center"}>
            {btnIsVisible ? (
              <Button {...btnStyle} w={"60%"} size="lg" onPress={buttonControl}>
                <Text {...btnTextStyle}>숨기기</Text>
              </Button>
            ) : (
              <Button {...btnStyle} w={"60%"} size="lg" onPress={buttonControl}>
                <Text {...btnTextStyle}>세부 정보 입력하기</Text>
              </Button>
            )}
          </Box>
          <PresenceTransition
            visible={btnIsVisible}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 250,
              },
            }}
          >
            <Stack bg w={"100%"} mt={5} justifyContent={"flex-start"}>
              <HStack>
                <Pressable m={2.5} onPress={() => movePaging("pre")}>
                  <AntDesign name="arrowleft" size={30} color="black" />
                </Pressable>
                <Pressable m={2.5} onPress={() => movePaging("next")}>
                  <AntDesign name="arrowright" size={30} color="black" />
                </Pressable>
              </HStack>
              {paging === 0 && (
                <Box
                  bg={"light.50"}
                  w={"100%"}
                  // h={500}
                  borderRadius={20}
                >
                  <Box alignItems={"center"}>
                    <Box w={"90%"}>
                      <InputTextComponent
                        name="salary"
                        inputType="number"
                        value={data?.salary}
                        parentSetState={onChangeValue}
                        formControlLabelProps={{ text: "연봉(원)" }}
                        priceFormat={true}
                        textInputProps={{
                          editable: calculateUpdate,
                        }}
                        textInputStyle={{
                          color: calculateUpdate ? "black" : "gray",
                        }}
                        formControlProps={{ marginTop: 10 }}
                        formControlHelperProps={{ h: 0 }}
                      />
                      <InputTextComponent
                        name="nonTaxIncome"
                        inputType="number"
                        value={data?.nonTaxIncome}
                        parentSetState={onChangeValue}
                        formControlLabelProps={{ text: "비과세 소득(원)" }}
                        priceFormat={true}
                        textInputProps={{
                          editable: calculateUpdate,
                        }}
                        textInputStyle={{
                          color: calculateUpdate ? "black" : "gray",
                        }}
                        formControlProps={{ marginTop: 5 }}
                        formControlHelperProps={{ h: 0 }}
                      />
                    </Box>
                  </Box>
                  {updateOrSubmitButton()}
                </Box>
              )}
              {paging === 1 && (
                <Box bg={"light.50"} w={"100%"} borderRadius={20}>
                  <InputRadioComponent
                    name="spouse"
                    formControlProps={{ mt: 12, ml: 5, mb: 5 }}
                    formControlLabelProps={{
                      text: "배우자 유무",
                      fontSize: 20,
                    }}
                    radioButtonList={[
                      {
                        text: "무",
                        value: 0,
                        liStyle: {
                          alignItems: "center",
                          ml: "5",
                          mr: "10",
                        },
                        RadioButtonItemProps: {
                          size: "sm",
                          isDisabled: !calculateUpdate,
                        },
                      },
                      {
                        text: "유",
                        value: 1,
                        liStyle: { alignItems: "center" },
                        RadioButtonItemProps: {
                          size: "sm",
                          isDisabled: !calculateUpdate,
                        },
                      },
                    ]}
                    formControlHelperProps={{ h: 0 }}
                    value={data?.spouse}
                    parentSetState={onChangeValue}
                  />
                  <Counter
                    title={"직계비속 수"}
                    name="children"
                    isDisabled={!calculateUpdate}
                    state={data?.children}
                    onChange={countOnChange}
                  />
                  <Counter
                    title={"직계존속 수"}
                    name="parents"
                    isDisabled={!calculateUpdate}
                    state={data?.parents}
                    onChange={countOnChange}
                  />
                  <Counter
                    title={"형제/자매 수"}
                    name="sibling"
                    isDisabled={!calculateUpdate}
                    state={data?.sibling}
                    onChange={countOnChange}
                  />
                  <Counter
                    title={"위탁아동 수"}
                    name="fosterChildren"
                    isDisabled={!calculateUpdate}
                    state={data?.fosterChildren}
                    onChange={countOnChange}
                  />
                  <Counter
                    title={"기초수급자 수"}
                    name="lowIncomePeople"
                    isDisabled={!calculateUpdate}
                    state={data?.lowIncomePeople}
                    onChange={countOnChange}
                  />
                  {updateOrSubmitButton()}
                </Box>
              )}
              {paging === 2 && (
                <Box bg={"light.50"} w={"100%"} borderRadius={20}>
                  <Box mt={10}>
                    <Counter
                      title={"경로우대자"}
                      name="oldPeople"
                      isDisabled={!calculateUpdate}
                      state={data?.oldPeople}
                      onChange={countOnChange}
                    />
                    <Counter
                      title={"장애인"}
                      name="disabledPerson"
                      isDisabled={!calculateUpdate}
                      state={data?.disabledPerson}
                      onChange={countOnChange}
                    />
                    <Counter
                      title={"부녀자"}
                      name="woman"
                      isDisabled={!calculateUpdate}
                      state={data?.woman}
                      onChange={countOnChange}
                    />
                    <InputRadioComponent
                      name="oneParent"
                      formControlProps={{
                        mt: 5,
                        ml: 5,
                        mb: 5,
                        isDisabled: true,
                      }}
                      formControlLabelProps={{
                        text: "한부모 여부",
                        // fontWeight: "600",
                        fontSize: 20,
                      }}
                      radioButtonList={[
                        {
                          text: "네",
                          value: 0,
                          liStyle: {
                            alignItems: "center",
                            ml: "5",
                            mr: "10",
                          },
                          RadioButtonItemProps: {
                            size: "sm",
                            isDisabled: !calculateUpdate,
                          },
                        },
                        {
                          text: "아니오",
                          value: 1,
                          liStyle: { alignItems: "center" },
                          RadioButtonItemProps: {
                            size: "sm",
                            isDisabled: !calculateUpdate,
                          },
                        },
                      ]}
                      formControlHelperProps={{ h: 0 }}
                      // id={item.index}
                      value={data?.oneParent}
                      parentSetState={onChangeValue}
                    />
                  </Box>
                  {updateOrSubmitButton()}
                </Box>
              )}
              {paging === 3 && (
                <Box bg={"light.50"} w={"100%"} borderRadius={20}>
                  <InputRadioComponent
                    name="newBirthChild"
                    formControlProps={{ mt: 12, ml: 5, mb: 5 }}
                    formControlLabelProps={{
                      text: "이번해 출생 또는 입양한 자녀",
                      fontSize: 20,
                    }}
                    radioButtonList={[
                      {
                        text: "없음",
                        value: 0,
                        liStyle: {
                          alignItems: "center",
                          ml: "2",
                          mr: "2.5",
                        },
                        RadioButtonItemProps: {
                          size: "sm",
                          isDisabled: !calculateUpdate,
                        },
                      },
                      {
                        text: "첫째",
                        value: 1,
                        liStyle: {
                          alignItems: "center",
                          ml: "2.5",
                          mr: "2.5",
                        },
                        RadioButtonItemProps: {
                          size: "sm",
                          isDisabled: !calculateUpdate,
                        },
                      },
                      {
                        text: "둘째",
                        value: 2,
                        liStyle: { alignItems: "center", ml: "2.5", mr: "2.5" },
                        RadioButtonItemProps: {
                          size: "sm",
                          isDisabled: !calculateUpdate,
                        },
                      },
                      {
                        text: "셋째이상",
                        value: 3,
                        liStyle: { alignItems: "center", ml: "2.5" },
                        RadioButtonItemProps: {
                          size: "sm",
                          isDisabled: !calculateUpdate,
                        },
                      },
                    ]}
                    formControlHelperProps={{ h: 0 }}
                    value={data?.newBirthChild}
                    parentSetState={onChangeValue}
                  />
                  <Box alignItems={"center"}>
                    <Box w={"90%"}>
                      <InputTextComponent
                        name="loanRepaymentPrincipal"
                        inputType="number"
                        value={data?.loanRepaymentPrincipal}
                        parentSetState={onChangeValue}
                        formControlLabelProps={{ text: "대출상환원금" }}
                        priceFormat={true}
                        textInputProps={{
                          editable: calculateUpdate,
                        }}
                        textInputStyle={{
                          color: calculateUpdate ? "black" : "gray",
                        }}
                        formControlProps={{ marginTop: 5 }}
                        formControlHelperProps={{ h: 0 }}
                      />
                      <InputTextComponent
                        name="loanRepaymentInterest"
                        inputType="number"
                        value={data?.loanRepaymentInterest}
                        parentSetState={onChangeValue}
                        formControlLabelProps={{ text: "대출상환이자" }}
                        priceFormat={true}
                        textInputProps={{
                          editable: calculateUpdate,
                        }}
                        textInputStyle={{
                          color: calculateUpdate ? "black" : "gray",
                        }}
                        formControlProps={{ marginTop: 5 }}
                        formControlHelperProps={{ h: 0 }}
                      />
                      <InputTextComponent
                        name="ginapbuseaek"
                        inputType="number"
                        value={data?.ginapbuseaek}
                        parentSetState={onChangeValue}
                        formControlLabelProps={{ text: "기납부세액" }}
                        priceFormat={true}
                        textInputProps={{
                          editable: calculateUpdate,
                        }}
                        textInputStyle={{
                          color: calculateUpdate ? "black" : "gray",
                        }}
                        formControlProps={{ marginTop: 5 }}
                        formControlHelperProps={{ h: 0 }}
                      />
                    </Box>
                  </Box>
                  {updateOrSubmitButton()}
                </Box>
              )}
            </Stack>
          </PresenceTransition>
        </Box>
      </Center>
    </ContentScrollView>
  );
}

export default CalculatePage;
