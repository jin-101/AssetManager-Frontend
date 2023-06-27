import React, { useEffect, useState } from "react";
import { Box, VStack, Button, Text, HStack, View } from "native-base";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../../services";
import { useNavigation } from "@react-navigation/native";
import { inputPriceFormat } from "../../utils";

function GoldCrudPage({ parentLoading }) {
  const { token } = useSelector((state) => state.login);
  const [gold, setGold] = useState({});
  const navigation = useNavigation();

  const onGoToService = () => {
    navigation.navigate("GoldGraphPage");
  };

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const response = await axios.get(`${apiPath}/gold/goldCrud`, {
          params: { id: token },
        });
        setGold(response.data);
        parentLoading();
      } catch (e) {
        console.log(e);
      }
    };

    fetchGold();
  }, []);

  return (
    <View bgColor={"white"} w={"90%"} borderRadius={20}>
      <Box bgColor={"amber.50"} padding={5} borderRadius={20} m={2} >
        <VStack alignSelf="center">
          <Text fontSize={15} fontWeight={"semibold"}>그램당 매수가:{inputPriceFormat(gold["buyPriceByGram"])}원</Text>
          <Text fontSize={15}>99K 현재가:{inputPriceFormat(gold["gold99k"])}원</Text>
          <Text fontSize={15}>미니골드 현재가:{inputPriceFormat(gold["miniGold"])}원</Text>
          <Text fontSize={15} bold>99K기준 수익률{gold["returnBygold99k"]*100}%</Text>
          <Text fontSize={15} bold>미니골드기준 수익률{gold["returnByminiGold"]*100}%</Text>
          <Text fontSize={15} >총보유 {gold["totalGram"]} g</Text>
        </VStack>
        <HStack alignSelf="center" mb="5">
          <Button mt="5" mx="1">
            잔고수정
          </Button>
          <Button mt="5" mx="1" onPress={onGoToService}>
            금 서비스
          </Button>
        </HStack>
      </Box>
    </View>
  );
}

export default GoldCrudPage;
