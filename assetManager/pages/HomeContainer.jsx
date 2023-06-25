import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Text, VStack } from "native-base";
import DropdownModal from "@components/DropdownModal";
import { useNavigation } from "@react-navigation/native";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import { btnStyle, btnTextStyle } from "../styles";
import { StyleSheet } from "react-native";
import CustomPieChart from "../components/CustomPieChart";

const totalStyle = StyleSheet.create({
  outBox: {
    w: "80%",
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

//데이터 받아온 것 가정
const assetData = {
  totalDepositAndSavings: 42200000,
  totalApt: 1610000000,
  totalCar: 310862153,
  totalGoldAndExchange: 167929312,
  totalStock: 265469710,
  totalCoin: 4416844461,
  totalAccountBalance: 200207,
};

function HomeContainer() {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.login);
  const [totalAsset, setTotalAsset] = useState("0");

  const mokdonPlanner = () => {
    navigation.navigate("mokdonPlanner");
  };
  const calculate = () => {
    navigation.navigate("calculate");
  };

  useEffect(() => {
    axios({
      url: `${apiPath}/user/getTotalAsset`,
      method: "GET",
      params: {
        userId: token,
      },
    }).then((res) => {
      setTotalAsset(res.data);
    });
  }, []);

  const totalBox = ({ boxStyle, title = "", value = 0 }) => {
    return (
      <Box {...boxStyle}>
        {value === "0" ? (
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
            <Text fontSize="xl">{value}원</Text>
          </Box>
        )}
      </Box>
    );
  };
  console.log(Number(totalAsset.replaceAll(",", "")));
  return (
    <>
      <ContentScrollView>
        <VStack space={10} alignItems="center" mt="10" mb="10">
          <Stack {...totalStyle.outBox}>
            {totalBox({
              boxStyle: { ...totalStyle.inBox, bg: "amber.100", mb: 2.5 },
              title: "총 자산",
              value: totalAsset,
            })}
            {totalBox({
              boxStyle: { ...totalStyle.inBox, bg: "darkBlue.100", mt: 2.5 },
              title: "총 부채",
              value: "123,456",
            })}
          </Stack>
          <CustomPieChart
            totalValue={Number(totalAsset.replaceAll(",", ""))}
            assetData={assetData}
          />
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
                  { title: "금", key: "AddGold" },
                  { title: "외환", key: "AddExchange" },
                ],
              },
              {
                index: 1,
                title: "부채",
                list: [
                  { title: "부채항목1", key: "Addtest1" },
                  { title: "부채항목2", key: "Addtest2" },
                  { title: "부채항목3", key: "Addtest3" },
                ],
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
    </>
  );
}
export default HomeContainer;
