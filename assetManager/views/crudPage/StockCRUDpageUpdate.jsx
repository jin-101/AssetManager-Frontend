import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  Spacer,
  Center,
  View,
  Icon,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../../services";
import { havingStockUpdate } from "../../action";
import { useNavigation } from "@react-navigation/native";
import { inputPriceFormat } from "../../utils";
import { Button } from "react-native-paper";
import { leftPaperButton, rightPaperButtonNoWidth } from "../../styles";
import { Feather } from "@expo/vector-icons";

function StockCRUDpageUpdate({ parentLoading }) {
  // const trendingUp = () => <Feather name="trending-up"></Feather>;
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.login);
  const havingStock = useSelector((state) => state.havingStockUpdate);
  const dispatch = useDispatch();
  const [avergeGain, setAvergeGain] = useState(0);

  const onGoToUpdate = () => navigation.navigate("TempPage");
  const onGoToService = () => navigation.navigate("StockService");

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
        <Center mt="5" mb="5">
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={20} bold>
              평균수익률 :
            </Text>
            <Text
              fontSize={20}
              bold
              color={avergeGain > 0 ? "danger.600" : "info.600"}
            >
              {" " + Math.round(avergeGain.toFixed(4) * 1000) / 10}%
            </Text>
          </HStack>
        </Center>
        {havingStock?.map((el, index) => (
          <Box
            key={index}
            borderBottomWidth="0.5"
            _dark={{ borderColor: "muted.50" }}
            borderColor="gray.200"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack>
              <HStack space={[2, 3]} w={"50%"} pl={3} alignItems={"center"}>
                {el.gain > 0 ? (
                  <Avatar background={"white"}>
                    <Feather name="trending-up" size={20} color="red"></Feather>
                  </Avatar>
                ) : (
                  <Avatar background={"white"}>
                    <Feather
                      name="trending-down"
                      size={20}
                      color="blue"
                    ></Feather>
                    {/* size="40px"  */}
                    {/* source={require("@assets/bear.jpg")} */}
                  </Avatar>
                )}
                <VStack>
                  <Text
                    _dark={{ color: "warmGray.50" }}
                    color="coolGray.800"
                    bold
                    fontSize="sm"
                  >
                    {el.stockName}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{ color: "warmGray.200" }}
                    fontSize="sm"
                  >
                    {el.stockCode}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
              <VStack w={"50%"} pl={5}>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color={el.gain > 0 ? "danger.600" : "info.600"}
                  // alignSelf="center"
                  //bold
                >
                  수익률 : {(el.gain * 100).toFixed(2)}%
                </Text>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  // alignSelf="center"
                >
                  현재가 : {inputPriceFormat(el.stockPrice)}원
                </Text>
                <Text
                  fontSize="xs"
                  pr="5"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  // alignSelf="center"
                >
                  매수가 : {inputPriceFormat(el.price)}원
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
        <HStack alignSelf="center" mt="5" mb="5">
          <Button
            {...leftPaperButton}
            style={{ marginRight: 5 }}
            // mt="5" mx="1"
            onPress={onGoToUpdate}
          >
            잔고수정
          </Button>
          <Button
            {...rightPaperButtonNoWidth}
            // mt="5"
            // mx="1"
            onPress={onGoToService}
          >
            수익률 순위조회
          </Button>
        </HStack>
      </Box>
    </View>
  );
}

export default StockCRUDpageUpdate;
