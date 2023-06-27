import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Button,
  Text,
  HStack,
  Avatar,
  Spacer,
  Center,
  View,
} from "native-base";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { apiPath } from "../../services";
import { inputPriceFormat } from "../../utils";

const showCurrencyName = (currency) => {
  switch (currency) {
    case "jpy":
      return "엔화";
    case "usd":
      return "달러";
    case "eur":
      return "유로";
    case "gbp":
      return "파운드";
    case "cnh":
      return "위안";
    default:
      break;
  }
};



const showCurrencyImg = (currency)=>{
  switch (currency) {
    case "jpy":
      return <Avatar size="50px" source={require("@assets/currency/yen.png") }ml="1"/> ;
    case "usd":
      return <Avatar size="50px" source={require("@assets/currency/dollor.png") }ml="1"/>;
    case "eur":
      return <Avatar size="50px" source={require("@assets/currency/euro.png") }ml="1"/>;
    case "gbp":
      return <Avatar size="50px" source={require("@assets/currency/pound.png") }ml="1"/>;
    case "cnh":
      return <Avatar size="50px" source={require("@assets/currency/yuan.png") }ml="1"/>;
    default:
      break;
  }

}

function CurrencyCrudPage({ parentLoading }) {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.login);
  const [currency, setCurrency] = useState(null);
  const [avergeGain, setAvergeGain] = useState(0);

  const goTOcurrencyService = () => navigation.navigate("currencyGraphPage");

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(`${apiPath}/currency/currencyCrud`, {
          params: { id: token },
        });
        setCurrency(response.data);
        parentLoading();
        let totalInvestedAmount = 0;
        let gainMutipleByInvestedAmount = 0;
        for (let i = 0; i < response.data.length; i++) {
          totalInvestedAmount += response.data[i]["investedAmount"];
          gainMutipleByInvestedAmount +=
            response.data[i]["investedAmount"] * response.data[i]["gain"];
        }
        setAvergeGain(gainMutipleByInvestedAmount / totalInvestedAmount);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrency();
    console.log(currency);
  }, []);

  return (
    <View bgColor={"white"} w={"90%"} borderRadius={20}>
      <Box mt="3">
        <Center mb="5">
          <Text fontSize="2xl" bold color={avergeGain>0?"danger.600":"info.600"}>평균수익률:{avergeGain.toFixed(4)*100}%</Text>              
        </Center>
        {currency?.map((item, index) => (
          <Box
            key={index}
            borderBottomWidth="1"
            _dark={{ borderColor: "muted.50" }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[3, 3]} justifyContent="space-between">
              {showCurrencyImg(item.currency)}
              <VStack>
                <Text
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  bold
                  fontSize="lg"
                >
                  {item.currency.toUpperCase()}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{ color: "warmGray.200" }}
                  fontSize="md"
                >
                  {showCurrencyName(item.currency)}
                </Text>
              </VStack>
              <Spacer />
              <VStack>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color={item.gain>0?"danger.600":"info.600"}
                  alignSelf="center"
                  bold
                >
                  수익률  :  {(item.gain*100).toFixed(2)}%
                  
                </Text>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="center"
                >
                  현재환율 : {item.marketPrice.toFixed(2)}원
                </Text>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="center"
                >
                  매입환율:{item.buyPrice.toFixed(2)}원
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
        <HStack alignSelf="center" mb="4">
          <Button mt="5" mx="1">
            잔고수정
          </Button>
          <Button mt="5" mx="1" onPress={goTOcurrencyService}>
            외화 서비스
          </Button>
        </HStack>
      </Box>
    </View>
  );
}

export default CurrencyCrudPage;
