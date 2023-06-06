import React from "react";
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
} from "native-base";
import { Alert } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import axios from "axios";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertExample from "../components/AlertExample";

function CoinAddPage(props) {
  //const baseUrl = "http://10.0.2.15:8888/app/coin/add";
  //const baseUrl2 = "http://10.0.2.2:8888/app/coin/add";
  const [market, setMarket] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [formData, setFormData] = useState({});
  const handleSubmit = () => {
    let formData = {
      market: market,
      name: name,
      quantity: quantity,
      price: price,
    };

    // 코인 이름 입력했는지 check
    if (name === "") {
      Alert.alert("Error", "코인 이름을 입력해주세요");
      return;
    }

    // 입력값이 유효한 경우 처리 로직
    axios({
      url: "http://192.168.0.5:8888/app/coin/add",
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
    setMarket("");
    setName("");
    setQuantity(0);
    setPrice(0);
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
  return (
    <ScrollView bg="red.100">
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <FormControl>
            <Box mb="10">
              <HStack alignItems="center">
                <FormControl.Label w="40%">
                  코인 자산 입력하기
                </FormControl.Label>
              </HStack>
              <FormControl.HelperText>
                보유중인 코인을 추가하세요.
              </FormControl.HelperText>
            </Box>
            <Box mb="10">
              <FormControl.Label>거래소</FormControl.Label>
              <Picker
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
              >
                <Picker.Item label="업비트" value="업비트" market="업비트" />
                <Picker.Item label="빗썸" value="빗썸" market="빗썸" />
              </Picker>
              <FormControl.Label>코인 이름</FormControl.Label>
              <Input
                isRequired="true"
                placeholder="코인을 검색하세요"
                value={name}
                onChangeText={(name) => setName(name)}
              />
              <FormControl.Label>매수 수량</FormControl.Label>
              <Input
                isRequired="true"
                keyboardType="numeric"
                value={quantity}
                onChangeText={(quantity) => setQuantity(quantity)}
              />
              <FormControl.Label>매수 가격</FormControl.Label>
              <Input
                isRequired="true"
                keyboardType="numeric"
                value={price}
                onChangeText={(price) => setPrice(price)}
              />
            </Box>
            <Box>
              <Stack
                mb="2.5"
                mt="1.5"
                direction={{
                  base: "column",
                  md: "row",
                }}
                space={2}
                /* 이거 적용하면 버튼 너비가 줄어듦.
                mx={{
                  base: "auto",
                  md: "0",
                }}*/
              >
                <Button size="lg" variant="subtle" onPress={handleSubmit}>
                  추가
                </Button>
              </Stack>
              <Box>
                <AlertExample></AlertExample>
              </Box>
            </Box>
          </FormControl>
        </Box>
      </VStack>
    </ScrollView>
  );
}

export default CoinAddPage;
