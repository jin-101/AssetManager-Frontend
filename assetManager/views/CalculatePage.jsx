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
  Icon,
  ArrowBackIcon,
  Image,
} from "native-base";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";
import Counter from "../components/Counter";
import InputTextComponent from "../components/InputTextComponent";
import InputRadioComponent from "../components/InputRadioComponent";

function CalculatePage(props) {
  const { token } = useSelector((state) => state.login);
  const [data, setData] = useState({}); //연말정산 관련 받아온 데이터가 있을 때 담기
  const [paging, setPaging] = useState(0);
  const maxPage = 2;
  const [btnIsVisible, setBtnIsVisible] = useState(false);
  const [calculateUpdate, setCalculateUpdate] = useState(false);
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
  const register = () => {
    console.log(data);
  };

  const onChangeValue = (value, id, name) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const countOnChange = (sign, name) => {
    let newCount;
    if (sign === "plus") {
      newCount = data[name] < 9 ? data[name] + 1 : 9;
    } else if (sign === "minus") {
      newCount = data[name] === 0 ? 0 : data[name] - 1;
    }
    onChangeValue(newCount, "", name);
  };

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

  useEffect(() => {
    //    axios({
    //      url: `${apiPath}/`,
    //      method: "GET",
    //      params: {
    //        userId: token,
    //      },
    //    }).then((res) => {
    //      setData(res.data);
    //    });
    setData({
      salary: 36000000,
      nonTaxIncome: 1200000,
      spouse: 1,
      parents: 2,
      children: 1,
      sibling: 1,
      fosterChildren: 1,
      lowIncomePeople: 1,
      oldPeople: 1,
      disabledPerson: 1,
      woman: 1,
      oneParent: 1,
    });
  }, []);
  console.log(data);

  return (
    <ContentScrollView>
      <Center>
        {Object.keys(data)?.length > 0 && data.salary !== 0 && (
          <Box mt={5} mb={5} w={"90%"} bg={"amber.100"}>
            <Box mt={5} mb={5}>
              <Text>연말정산 예상 환급액 여기 만들기</Text>
            </Box>
          </Box>
        )}
        <Box mt={5} mb={5} w={"90%"}>
          <Box alignItems={"center"}>
            <Button w={"60%"} size="lg" onPress={accountBookNavi} mb={2.5}>
              가계부로 이동
            </Button>
            <Text>가계부 입력시 더 정확하게 계산할 수 있습니다.</Text>
          </Box>
        </Box>
        <Divider />
        <Box mt={5} mb={5} w={"90%"}>
          <Box alignItems={"center"}>
            {btnIsVisible ? (
              <Button w={"60%"} size="lg" onPress={buttonControl}>
                숨기기
              </Button>
            ) : (
              <Button w={"60%"} size="lg" onPress={buttonControl}>
                세부 정보 입력하기
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
            </Stack>
          </PresenceTransition>
        </Box>
      </Center>
    </ContentScrollView>
  );
}

export default CalculatePage;
