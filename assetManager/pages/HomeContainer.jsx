import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Text, VStack } from "native-base";
import DropdownModal from "@components/DropdownModal";
import { useNavigation } from "@react-navigation/native";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";
import { apiPath } from "../services";
import { useSelector, useDispatch } from "react-redux";
import { btnStyle, btnTextStyle, footerHeight } from "../styles";
import { StyleSheet, View } from "react-native";
import CustomPieChart from "../components/CustomPieChart";
import { inputPriceFormat } from "../utils";
import { havingStockUpdate } from "../action";

const totalStyle = StyleSheet.create({
  outBox: {
    w: "85%",
    h: "250",
    bg: "white",
    justifyContent: "center",
    alignItems: "center",
    shadow: 3,
    borderRadius: 10,
  },
  inBox: {
    shadow: 3,
    w: "90%",
    h: "40%",
    mt: 5,
    mb: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const initialAsssetData = {
  totalDepositAndSavings: 0,
  totalApt: 0,
  totalCar: 0,
  totalGoldAndExchange: 0,
  totalStock: 0,
  totalCoin: 0,
  totalAccountBalance: 0,
};

function HomeContainer({ flatListRef }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [totalAsset, setTotalAsset] = useState(1);
  const [totalLiability, setTotalLiability] = useState(1);
  const [assetData, setAssetData] = useState(initialAsssetData);

  const mokdonPlanner = () => {
    navigation.navigate("mokdonPlanner");
  };
  const calculate = () => {
    navigation.navigate("calculate");
  };

  const fetchStock = async () => {
    try {
      const response = await axios.get(`${apiPath}/stock/stockCrud`, {
        params: { id: token },
      });
      dispatch(havingStockUpdate(response.data));
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    axios({
      url: `${apiPath}/user/getTotalAsset`,
      method: "GET",
      params: {
        userId: token,
      },
    }).then((res) => {
      const {
        totalDepositAndSavings: deposit,
        totalApt: apt,
        totalCar: car,
        totalGoldAndExchange: goldExchange,
        totalStock: stock,
        totalCoin: coin,
        totalAccountBalance: balance,
        totalLiability: liability,
      } = res.data;

      const rowData = {
        totalAccountBalance: Math.round(balance),
        totalDepositAndSavings: Math.round(deposit),
        totalApt: Math.round(apt),
        totalCar: Math.round(car),
        totalStock: Math.round(stock),
        totalCoin: Math.round(coin),
        totalGoldAndExchange: Math.round(goldExchange),
      };

      const total =
        rowData.totalDepositAndSavings +
        rowData.totalApt +
        rowData.totalCar +
        rowData.totalGoldAndExchange +
        rowData.totalStock +
        rowData.totalCoin +
        rowData.totalAccountBalance;

      setAssetData(rowData);
      setTotalAsset(total);
      setTotalLiability(liability);
    });
    fetchStock();
  }, []);

  const totalBox = ({ boxStyle, title = "", value = 0 }) => {
    return (
      <Box {...boxStyle}>
        {value === 1 ? (
          <Box>
            <Text fontSize="xl" fontWeight={"bold"} color={"gray.400"}>
              {title} 계산중입니다.
            </Text>
          </Box>
        ) : (
          <Box w="60%">
            <Text fontSize="xl" fontWeight={"bold"}>
              {title}
            </Text>
            <Text fontSize="xl">{inputPriceFormat(value)}원</Text>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      <ContentScrollView flatListRef={flatListRef}>
        <VStack space={10} alignItems="center" mt="10" mb="10">
          <Stack {...totalStyle.outBox}>
            {totalBox({
              boxStyle: { ...totalStyle.inBox, bg: "#ECEEFF", mb: 2.5 }, // 기존 : "#fff0f5" => 변경 : "#ECEEFF" (메인 컬러)
              title: "총 자산",
              value: totalAsset,
            })}
            {totalBox({
              boxStyle: { ...totalStyle.inBox, bg: "#FFEBF0", mt: 2.5 }, // 기존 : "#e6e6fa" => 변경 : "#FFEBF0" (서브 컬러)
              title: "총 부채",
              value: totalLiability,
            })}
          </Stack>
          <CustomPieChart totalValue={totalAsset} assetData={assetData} />
          <DropdownModal
            content={[
              {
                index: 0,
                title: "자산",
                list: [
                  { title: "예적금", key: "AddDeposit" },
                  { title: "부동산", key: "AddApt" },
                  { title: "자동차", key: "AddCar" },
                  { title: "주식", key: "AddStock" },
                  { title: "코인", key: "AddCoin" },
                  { title: "외환", key: "AddExchange" },
                  { title: "금", key: "AddGold" },
                ],
              },
              {
                index: 1,
                title: "부채",
                list: [{ title: "부채등록", key: "TempPage" }],
              },
            ]}
          />
          <Button
            {...btnStyle}
            w={"70%"}
            onPress={mokdonPlanner}
            _text={{ ...btnTextStyle }}
            _pressed={{
              bg: "gray.200",
              borderColor: "white",
            }}
          >
            목돈 마련 플래너
          </Button>
          <Button
            {...btnStyle}
            w={"70%"}
            onPress={calculate}
            _text={{ ...btnTextStyle }}
            _pressed={{
              bg: "gray.200",
              borderColor: "white",
            }}
          >
            연말정산 예상 계산기
          </Button>
        </VStack>
      </ContentScrollView>
      <View style={{ height: footerHeight }}></View>
    </>
  );
}
export default HomeContainer;
