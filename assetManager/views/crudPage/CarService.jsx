import React, { useState, useEffect } from "react";
import ContentScrollView from "@components/ContentScrollView";
import InputTextComponent from "@components/InputTextComponent";
import { Box, Button, HStack, Text, VStack } from "native-base";
import SelectComponent from "../../components/SelectComponent";
import { useDispatch, useSelector } from "react-redux";
import { apiPath } from "../../services";
import { carCompanyListSearch } from "../../action";
import axios from "axios";
import { Alert } from "react-native";
import { inputPriceFormat } from "../../utils";
import Loading from "../../components/Loading";
import CarRegister from "../../components/CarRegister";
import { btnStyle, btnTextStyle } from "../../styles";

function CarService({}) {
  const dispatch = useDispatch();
  const { companyList } = useSelector((state) => state.carList);
  const [carType, setCarType] = useState([]);
  const [tab, setTab] = useState(0);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const { userCar } = useSelector((state) => state.userCar);

  const [carRecomand, setCarRecomand] = useState({
    carCompany: "",
    type: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const isFirst = companyList.length === 0 || false;
  const changeResultOpen = () => setIsResultOpen(true);

  const changeTab = (index) => setTab(index);

  const onChangeCarRecomand = async (value, id, name) => {
    if (name === "carCompany") {
      setCarType([]);
      try {
        const response = await axios.get(`${apiPath}/car/typeList`, {
          params: {
            carCompany: value,
          },
        });
        setCarRecomand((prev) => ({
          ...prev,
          type: "",
          [name]: value,
        }));
        setCarType(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setCarRecomand((prev) => ({
        ...prev,
        [name]: value,
      }));
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
      axios({
        url: `${apiPath}/car/recomand`,
        method: "GET",
        params: {
          ...carRecomand,
        },
      })
        .then((res) => {
          console.log(JSON.stringify(res.data), res.data.length);
          changeResultOpen();
          setSearchList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
  console.log({ userCar });
  return (
    <>
      <ContentScrollView>
        {/* 상단 버튼 */}
        <HStack mt={"5"} space={5} justifyContent="center">
          <Button
            {...btnStyle}
            borderColor="blue.400"
            _text={{ ...btnTextStyle, color: "blue.400" }}
            _pressed={{
              bg: "blue.200",
              borderColor: "white",
            }}
            onPress={() => changeTab(0)}
          >
            자동차 추천
          </Button>
          <Button
            {...btnStyle}
            borderColor="pink.400"
            _text={{ ...btnTextStyle, color: "pink.400" }}
            _pressed={{
              bg: "pink.200",
              borderColor: "white",
            }}
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
                중고 자동차 추천
              </Text>
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
              <Button w={"40%"} onPress={carRecomandOnPress}>
                검색하기
              </Button>
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
                {
                  <Text fontSize={15} fontWeight={"semibold"} mb={2}>
                    {searchList.length === 0
                      ? "조건에 맞는 결과가 없습니다. "
                      : "검색 결과입니다."}
                  </Text>
                }
                {searchList?.map((el, index) => (
                  <Box
                    w={"95%"}
                    bgColor={"white"}
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
                <Text fontSize={12} color={"gray.400"} mb={2}>
                  {searchList.length !== 0 &&
                    "주의 - 견적은 일부 정확하지 않을 수 있습니다."}
                </Text>
              </Box>
            )}
          </VStack>
        )}
        {tab === 1 && (
          <VStack mt="5" mb="5" alignItems="center">
            <Box
              bg="red.100"
              w="90%"
              p="5"
              borderRadius="2xl"
              mb="5"
              alignItems={"center"}
            >
              <Text mb={2.5} fontSize={25} fontWeight={"bold"}>
                자동차 취등록세 계산
              </Text>
              {userCar?.map((el, index) => (
                <CarRegister
                  key={index}
                  element={el}
                  index={index}
                  totalLen={userCar?.length}
                />
              ))}
            </Box>
          </VStack>
        )}
      </ContentScrollView>
    </>
  );
}

export default CarService;
