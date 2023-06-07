import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  FormControl,
  HStack,
  Input,
  Radio,
  ScrollView,
  Stack,
  Text,
  VStack,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Button,
  Divider,
  Heading,
  Link,
  string,
  View,
  IconButton,
  CloseIcon,
  Container,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "native-base";
import axios from "axios";
import { TextInput, FlatList, Alert, TouchableOpacity } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { Picker } from "@react-native-picker/picker";
import AlertExample from "../components/AlertExample";

function CoinAddPage(props) {
  //const baseUrl = "http://10.0.2.15:8888/app/coin/add";
  //const baseUrl2 = "http://10.0.2.2:8888/app/coin/add";
  const [market, setMarket] = useState("");
  const [coinName, setCoinName] = useState("");
  const [quantity, setQuantity] = useState(0); // input에서 0을 입력하면 String이더라고. 그래서 초기값도 그냥 "0"으로 줘버림
  const [price, setPrice] = useState(0);
  const [formData, setFormData] = useState({});
  const handleReset = () => {
    setSelectedValue(""); // 이게 있어야 초기화시 '거래소를 선택해주세요'가 뜸
    setMarket("");
    setCoinName("");
    setQuantity(0);
    setPrice(0);
    setSearchKeyword(""); // 코인 검색란도 초기화되게끔 설정
  };
  const handleSubmit = () => {
    let formData = {
      market: market,
      coinName: coinName,
      quantity: quantity,
      price: price,
    };

    // 입력값 유효한지 check
    if (market === "") {
      Alert.alert("Error", "거래소를 선택해주세요");
      return;
    } else if (coinName === "") {
      Alert.alert("Error", "코인 이름을 입력해주세요");
      return;
    } else if (quantity === 0 || price === 0) {
      // input에서 0을 입력하면 String이더라고. 그래서 초기값도 그냥 "0"으로 줘버림
      Alert.alert("Error", "수량과 가격을 입력해주세요");
      return;
    } else if (quantity === "0" || price === "0") {
      Alert.alert("Error", "0이 아닌 값을 입력해주세요");
      return;
    }

    // 입력값이 유효한 경우 처리 로직
    axios({
      url: "http://192.168.0.82:8888/app/coin/add",
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify(formData),
    })
      .then(function (res) {
        console.log(formData);
        console.log("데이터 전송 성공!!");

        // 스프링에서 제대로 Insert 됐는지 check
        console.log(res.data); // ★ res.data : 스프링에서 보낸 데이터를 읽는 것!
        if (res.data === "성공") {
          Alert.alert("Success", "자산 입력에 성공하였습니다");
        } else {
          Alert.alert("Error", "코인명을 제대로 입력해주세요");
        }
      })
      .catch(function (err) {
        console.log(`Error Msg : ${err}`);
      });
    // 입력값 초기화 (★ 한꺼번에 하는 방법은 없나??)
    // setMarket(""); // 여러번 입력하는 경우를 생각하면 얘는 굳이 초기화해줄 필요가 없네
    setCoinName("");
    setQuantity(0);
    setPrice(0);
    setSearchKeyword(""); // 코인 검색란도 초기화되게끔 설정
    //setFormData({});
  };
  // 이 useState는 없어도 될 듯?
  const [selectedValue, setSelectedValue] = useState("");
  // 일단 임시방편으로 Component가 아니라, 여기에 다 때려박아서 useState 이용하는 방식으로..
  const handleValueChange = (market) => {
    setSelectedValue(market);
    setMarket(market);
    console.log("Selected Market:", market);
  };
  const insertCoinName = (value) => {
    console.log("Text pressed!", value); // value => BTC
    // key가 아니라 value값을 바로 받으므로 필요 없어졌음. const realCoinName = value.key; // value.key => BTC
    console.log(value);
    setCoinName(value);
  };

  // ★★★★★ 검색 기능을 위한 코드 시작
  const [dataMap, setDataMap] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(new Map());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = { market: market };
    console.log(market);
    try {
      const response = await axios.post(
        "http://192.168.0.82:8888/app/coin/getCoinList",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      const mapData = new Map(Object.entries(responseData));
      setDataMap(mapData);
      //console.log(response.data); // response.data : 스프링에서 넘긴 데이터(여기선 Map)를 얻는 법
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (searchKeyword) => {
    // 검색 로직 및 결과 설정
    setSearchKeyword(searchKeyword);
    const filteredMap = new Map(
      Array.from(dataMap.entries()).filter(
        ([key, value]) =>
          value.toLowerCase().includes(searchKeyword.toLowerCase())
        // key.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
    setFilteredData(filteredMap);
    if (searchKeyword === "") {
    }
  };
  // ★★★★★ 검색 기능을 위한 코드 끝

  return (
    <ScrollView bg="red.100">
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <FormControl>
            <Box mb="10">
              <HStack alignItems="center">
                <FormControl.Label w="100%">
                  보유중인 코인을 추가하세요.
                </FormControl.Label>
              </HStack>
              <FormControl.Label w="100%">
                컴포넌트들 위치 및 디자인은 나중에 합시다
              </FormControl.Label>
              {/* <FormControl.HelperText>
                보유중인 코인을 추가하세요.
              </FormControl.HelperText> */}
            </Box>
            <Box mb="5">
              <FormControl.Label>거래소</FormControl.Label>
              <Select
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
              >
                <Select.Item label="거래소를 선택해주세요" value="" />
                <Select.Item label="업비트" value="업비트" market="업비트" />
                <Select.Item label="빗썸" value="빗썸" market="빗썸" />
              </Select>
            </Box>
            <Box mb="5">
              <FormControl.Label>코인 검색하기</FormControl.Label>
              {/*  ★★★★★ 검색기능 시작 */}
              <Input
                value={searchKeyword} // value는 내가 주고 싶은 거 줘도 되는 듯??
                onChangeText={handleSearch}

                // 검색란이 공백인 경우 검색 결과를 초기화하는 예시
                //onChangeText={setSearchKeyword}
                //onSubmitEditing={handleSearch}
              />
              {searchKeyword !== "" &&
                Array.from(filteredData.keys()).map((key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      insertCoinName(`${filteredData.get(key)}`); // ★ key값 대신 value값을 보내주면 되는 거 아닌가??
                    }}
                  >
                    <Text fontSize="xs" key={key}>{`${key}`}</Text>
                  </TouchableOpacity>
                  // <Text key={key}>{`${key}: ${filteredData.get(key)}`}</Text>
                ))}
              {/*  ★★★★★ 검색기능 끝 */}
            </Box>
            <Box mb="5">
              <FormControl.Label>코인 이름</FormControl.Label>
              <Input
                isRequired="true" // Required 이거 왜 안 먹히지??
                placeholder="검색한 코인을 입력하세요"
                value={coinName}
                onChangeText={(coinName) => setCoinName(coinName)}
              />
            </Box>
            <Box mb="5">
              <FormControl.Label>매수 수량</FormControl.Label>
              <Input
                isRequired="true" // Required 이거 왜 안 먹히지??
                keyboardType="numeric"
                value={quantity}
                onChangeText={(quantity) => setQuantity(quantity)}
              />
            </Box>
            <Box mb="5">
              <FormControl.Label>매수 가격 (원)</FormControl.Label>
              <Input
                isRequired="true"
                keyboardType="numeric"
                value={price}
                onChangeText={(price) => setPrice(inputPriceFormat(price))}
              />
            </Box>
            <Stack
              mb="2.5"
              mt="1.5"
              direction="row" // direction="row" => "column"으로 바꾸면 수직으로 쌓이게 됨
              space={2}
              // mx 이거 적용하면 버튼 너비가 줄어듦.
              mx={{
                base: "auto",
                md: "0",
              }}
            >
              <Button
                size="lg"
                variant="subtle"
                colorScheme="secondary"
                onPress={handleReset}
              >
                초기화
              </Button>
              <Button size="lg" variant="subtle" onPress={handleSubmit}>
                추가
              </Button>
            </Stack>
            {/* <Box>
              <AlertExample></AlertExample>
            </Box> */}
          </FormControl>
        </Box>
      </VStack>
    </ScrollView>
  );
}

// 가격표시 코드 (3자리마다 콤마 넣기) => onChangeText={(price) => setPrice(inputPriceFormat(price))}
const inputPriceFormat = (str) => {
  //console.log("s", str);
  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };
  const uncomma = (str) => {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  };
  return comma(uncomma(str));
};

export default CoinAddPage;
