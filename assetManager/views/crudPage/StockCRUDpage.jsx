import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  ScrollView,
  VStack,
  Button,
  Text,
  Heading,
  FlatList,
  HStack,
  Avatar,
  Spacer,
  Center
} from "native-base";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../../services";

function StockCRUDpage() {
  const { token } = useSelector((state) => state.login);
  const [stocks, setStocks] = useState(null);
  const [avergeGain,setAvergeGain] = useState(0);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`${apiPath}/stock/stockCrud`, {
          params: { id: token },
        });
        setStocks(response.data);
        
        let totalInvestedAmount = 0;
        let gainMutipleByInvestedAmount = 0;
        for(let i=0;i<response.data.length;i++){
          totalInvestedAmount += response.data[i]["investedAmount"];
          gainMutipleByInvestedAmount += (response.data[i]["investedAmount"] * response.data[i]["gain"]);
        }
        setAvergeGain(gainMutipleByInvestedAmount/totalInvestedAmount);

      } catch (e) {
        console.log(e);
      }
    };
    fetchStock();
    console.log(stocks)
  }, []);

  return (
    <Box mt="3">
        <Center _text={{fontSize:"lg",fontWeight:"bold"}}>
          평균수익률:{avergeGain}
        </Center>
      {stocks?.map((el, index) => (
        <Box
          key={index}
          borderBottomWidth="1"
          _dark={{ borderColor: "muted.50" }}
          borderColor="muted.800"
          pl={["0", "4"]}
          pr={["0", "5"]}
          py="2"
        >
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar size="50px" source={require("@assets/bear.jpg")} ml="1" />
            <VStack>
              <Text
                _dark={{ color: "warmGray.50" }}
                color="coolGray.800"
                bold
                fontSize="lg"
              >
                {el.stockName}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{ color: "warmGray.200" }}
                fontSize="md"
              >
                {el.stockCode}
              </Text>
            </VStack>
            <Spacer />


            <VStack>
              <Text
                fontSize="xs"
                pr="5"
                _dark={{ color: "warmGray.50" }}
                color="coolGray.800"
                alignSelf="center"
              >
                현재가:{el.stockPrice}
              </Text>
              <Text
                fontSize="xs"
                pr="5"
                _dark={{ color: "warmGray.50" }}
                color="coolGray.800"
                alignSelf="center"
              >
                평균단가:{el.price}
              </Text>
              <Text
                fontSize="xs"
                pr="5"
                _dark={{ color: "warmGray.50" }}
                color="coolGray.800"
                alignSelf="center"
              >
                수익률:{el.gain}
              </Text>
            </VStack>

          </HStack>
        </Box>
      ))}
      <HStack alignSelf="center">
        <Button mt="5" mx="1">
          잔고수정
        </Button>
        <Button mt="5" mx="1">
          주식 서비스
        </Button>
      </HStack>

    </Box>
  );
}

export default StockCRUDpage;
