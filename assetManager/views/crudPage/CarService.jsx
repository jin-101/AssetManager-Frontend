import React, { useState, useEffect } from "react";
import ContentScrollView from "@components/ContentScrollView";
import InputTextComponent from "@components/InputTextComponent";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
} from "native-base";
import SelectComponent from "../../components/SelectComponent";
import { useDispatch, useSelector } from "react-redux";
import { apiPath } from "../../services";
import { carCompanyListSearch } from "../../action";
import axios from "axios";
import { Alert } from "react-native";
import { inputPriceFormat } from "../../utils";
import Loading from "../../components/Loading";

const textListInfo = [
  { title: "제조사", key: "carModel.carCompany.companyName" },
  { title: "모델명", key: "carModel.className" },
  { title: "연식", key: "year", unit: "년식" },
  { title: "현재 예상가격", key: "price", unit: "원", isPrice: true },
];

function CarService(props) {
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.carList);
  const [carType, setCarType] = useState([]);
  const [tab, setTab] = useState(0);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingFunc = () => setIsLoading(!isLoading);

  const [carRecomand, setCarRecomand] = useState({
    carCompany: "",
    type: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const isFirst = companyList.length === 0 || false;
  const changeResultOpen = () => setIsResultOpen(true);

  const changeTab = (index) => setTab(index);

  const onChangeCarRecomand = (value, id, name) => {
    const companyPick = name === "carCompany";
    setCarRecomand((prev) => ({
      ...prev,
      type: companyPick ? "" : prev.type,
      [name]: value,
    }));
    if (companyPick) {
      loadingFunc();
      setCarType([]);
      axios({
        url: `${apiPath}/car/typeList`,
        method: "GET",
        params: {
          carCompany: carRecomand.carCompany,
        },
      })
        .then((res) => {
          console.log(JSON.stringify(res.data), "JSON");
          setCarType(res.data);
          loadingFunc();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const carRecomandOnPress = () => {
    const { carCompany, type, minPrice, maxPrice } = carRecomand;

    if (carCompany === "") {
      Alert.alert("", "제조사를 선택해주세요.");
    } else if (type === "") {
      Alert.alert("", "차 유형을 선택해주세요.");
    } else if (maxPrice < minPrice) {
      Alert.alert("", "최저금액이 최고금액보다 크게 입력되었습니다.");
    } else {
      loadingFunc();
      axios({
        url: `${apiPath}/car/recomand`,
        method: "GET",
        params: {
          ...carRecomand,
        },
      })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          console.log(res.data.length);
          changeResultOpen();
          setSearchList(res.data);
          loadingFunc();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (isFirst) {
      loadingFunc();
      axios({
        url: `${apiPath}/car/companyList.do`,
        method: "GET",
      })
        .then((res) => {
          dispatch(carCompanyListSearch(res.data));
          loadingFunc();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  console.log({ carRecomand });
  return (
    <ContentScrollView>
      {/* 상단 버튼 */}
      <HStack mt={"5"} space={5} justifyContent="center">
        <Button
          width={"40%"}
          size="lg"
          variant="outline"
          onPress={() => changeTab(0)}
        >
          차 추천
        </Button>
        <Button
          width={"40%"}
          size="lg"
          variant="outline"
          colorScheme="secondary"
          onPress={() => changeTab(1)}
        >
          차 취득세 계산기
        </Button>
      </HStack>
      {/* 차 추천 */}
      {tab === 0 && (
        <VStack mt="5" alignItems="center">
          <Box
            bg="blue.100"
            w="90%"
            p="5"
            borderRadius="2xl"
            mb="5"
            alignItems={"center"}
          >
            <Text mb={2.5} fontSize={25} fontWeight={"bold"}>
              차 추천
            </Text>
            <Divider></Divider>
            <SelectComponent
              name="carCompany"
              isVertical={true}
              formControlProps={{ marginTop: 5 }}
              formControlLabelProps={{
                text: "제조사 조회",
              }}
              formControlHelperProps={{ h: 0 }}
              selectItem={companyList}
              value={carRecomand?.carCompany}
              parentSetState={onChangeCarRecomand}
            />
            <SelectComponent
              name="type"
              isVertical={true}
              formControlProps={{ marginTop: 5 }}
              formControlLabelProps={{
                text: "유형 조회",
              }}
              formControlHelperProps={{ h: 0 }}
              selectItem={carType}
              value={carRecomand?.type}
              parentSetState={onChangeCarRecomand}
            />
            <InputTextComponent
              name="minPrice"
              inputType="number"
              value={carRecomand?.minPrice}
              parentSetState={onChangeCarRecomand}
              formControlLabelProps={{ text: "최저금액(원)" }}
              priceFormat={true}
              formControlProps={{ marginTop: 5 }}
              formControlHelperProps={{ h: 0 }}
            />
            <InputTextComponent
              name="maxPrice"
              inputType="number"
              value={carRecomand?.maxPrice}
              parentSetState={onChangeCarRecomand}
              formControlLabelProps={{ text: "최고금액(원)" }}
              priceFormat={true}
              formControlProps={{ marginTop: 5 }}
              // formControlHelperProps={{ h: 0 }}
            />
            <Button onPress={carRecomandOnPress}>검색하기</Button>
          </Box>
          {/* 검색결과 리스트 */}
          {isResultOpen && (
            <Box
              bg="blue.100"
              w="90%"
              p="5"
              borderRadius="2xl"
              mb="5"
              alignItems={"center"}
            >
              {searchList?.map((el, index) => (
                <Box
                  w={"95%"}
                  bgColor={"amber.50"}
                  key={index}
                  mt={index === 0 ? 2.5 : 5}
                  mb={index === searchList?.length - 1 ? 5 : 2.5}
                  padding={5}
                  borderRadius={20}
                >
                  <HStack>
                    <Text fontSize={15} fontWeight={"semibold"}>
                      {"제조사 : "}
                    </Text>
                    <Text fontSize={15}>
                      {el.carModel.carCompany.companyName}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize={15} fontWeight={"semibold"}>
                      {"모델명 : "}
                    </Text>
                    <Text fontSize={15}>{el.carModel.className}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize={15} fontWeight={"semibold"}>
                      {"연식 : "}
                    </Text>
                    <Text fontSize={15}>
                      {el.year}
                      {"년식"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize={15} fontWeight={"semibold"}>
                      {"예상가격 : "}
                    </Text>
                    <Text fontSize={15}>
                      {inputPriceFormat(el.price)}
                      {"원"}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Box>
          )}
        </VStack>
      )}
      {tab === 1 && <VStack mt="5" mb="5" alignItems="center"></VStack>}
      {isLoading && <Loading />}
    </ContentScrollView>
  );
}

export default CarService;
