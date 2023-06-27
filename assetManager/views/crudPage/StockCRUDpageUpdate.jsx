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
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../../services";
import {havingStockUpdate} from "../../action"
import { useNavigation } from "@react-navigation/native";
import { inputPriceFormat } from "../../utils";

function StockCRUDpageUpdate({ parentLoading }) {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.login);
  const havingStock =useSelector((state)=>state.havingStockUpdate);
  const dispatch = useDispatch();
  const [avergeGain, setAvergeGain] = useState(0);

  const onGoToService = ()=> (navigation.navigate("StockService"));

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`${apiPath}/stock/stockCrud`, {
          params: { id: token },
        });

        //평균수익률 로직
        let totalInvestedAmount = 0;
        let gainMutipleByInvestedAmount = 0;
        for (let i = 0; i < response.data.length; i++) {
          totalInvestedAmount += response.data[i]["investedAmount"];
          gainMutipleByInvestedAmount +=
            response.data[i]["investedAmount"] * response.data[i]["gain"];
        }
        setAvergeGain(gainMutipleByInvestedAmount / totalInvestedAmount);                
        dispatch(havingStockUpdate(response.data));
        parentLoading();
        
      } catch (e) {
        console.log(e);
      }
    };
    fetchStock();
  }, []);

  return (
    <View bgColor={"white"} w={"90%"} borderRadius={20}>
      <Box mt="3">
        <Center mb="5">
          <Text fontSize="2xl" bold color={avergeGain>0?"danger.600":"info.600"}>평균손익률:{avergeGain.toFixed(4)*100}%</Text>
        </Center>
        {havingStock?.map((el, index) => (
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
                  color={el.gain>0?"danger.600":"info.600"}
                  alignSelf="center"
                  bold
                >
                  수익률 : {(el.gain*100).toFixed(2)}%
                </Text>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="center"
                >
                  현재가:{inputPriceFormat(el.stockPrice)}원
                </Text>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="center"
                >
                  매수가:{inputPriceFormat(el.price)}원
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
        <HStack alignSelf="center" mb="2">
          <Button mt="5" mx="1">
            잔고수정
          </Button>
          <Button mt="5" mx="1" onPress={onGoToService}>
            주식 서비스
          </Button>
        </HStack>
      </Box>
    </View>
  );
}

export default StockCRUDpageUpdate;
