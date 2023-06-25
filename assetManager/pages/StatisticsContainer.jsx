import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { Box, Button, Divider, HStack, Text, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";
import Loading from "../components/Loading";
import SelectComponent from "../components/SelectComponent";
import InputTextComponent from "../components/InputTextComponent";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function StatisticsContainer() {
  const dispatch = useDispatch();

  //////////////////////////////////
  const { token } = useSelector((state) => state.login);
  const [fiInd, setFiInd] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const changeTab = (index) => setTab(index);

  // 재무지표 data
  const data = {
    labels: [
      "총부채부담",
      "거주주택마련부채부담",
      "금융투자성향",
      "금융투자비중",
    ],
    datasets: [
      {
        data: [
          fiInd.totalDebtBurdenInd, // "총부채부담",
          fiInd.mortgageLoanBurdenInd, // "거주주택마련부채부담"
          fiInd.fiInvestInd, // "금융투자성향",
          fiInd.fiAssetInd, // "금융투자비중",
        ],
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: `${apiPath}/getFiInd`,
      method: "GET",
      params: {
        userId: token,
      },
    })
      .then((res) => {
        //console.log("거주주택마련부채부담지표 " + res.data.mortgageLoanBurdenInd);
        const result = res.data;
        setFiInd(result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(fiInd);

  if (isLoading) return <Loading />;
  return (
    <ContentScrollView>
      {/* 상단 버튼 */}
      <HStack mt={"5"} space={5} justifyContent="center">
        <Button
          width={"40%"}
          bg={"white"}
          borderRadius={15}
          onPress={() => changeTab(0)}
          _pressed={{ bg: "light.50" }}
        >
          <Text color={"blue.400"} fontSize={18} fontWeight={"semibold"}>
            소비통계
          </Text>
        </Button>
        <Button
          width={"40%"}
          bg={"white"}
          borderRadius={15}
          onPress={() => changeTab(1)}
          _pressed={{ bg: "light.50" }}
        >
          <Text color={"pink.400"} fontSize={18} fontWeight={"semibold"}>
            재무지표
          </Text>
        </Button>
      </HStack>

      {/* 소비통계 */}
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
          </Box>
        </VStack>
      )}
      {/* 재무지표 */}
      {tab === 1 && (
        <VStack mt="5" mb="5" alignItems="center">
          <Box
            //bg="red.100"
            w="90%"
            p="5"
            borderRadius="2xl"
            mb="5"
            alignItems={"center"}
          >
            <Text mb={2.5} fontSize={25} fontWeight={"bold"}>
              나의 재무지표 한눈에 보기
            </Text>
            <Text>{"총자산 " + fiInd.totalAsset}</Text>
            <Text>{"가계수지지표 " + fiInd.householdInd}</Text>
            {/* <Text>{"총부채상환지표 " + fiInd.totalDebtRepaymentInd}</Text>
            <Text>
              {"소비생활부채상환지표 " + fiInd.consumeDebtRepaymentInd}
            </Text>
            <Text>
              {"거주주택마련부채상환지표 " + fiInd.mortgageLoanRepaymentInd}
            </Text> */}
            <Text>{"총부채부담지표 " + fiInd.totalDebtBurdenInd}</Text>
            <Text>
              {"거주주택마련부채부담지표 " + fiInd.mortgageLoanBurdenInd}
            </Text>
            <Text>{"금융투자성향지표 " + fiInd.fiInvestInd}</Text>
            <Text>{"금융자산비중지표 " + fiInd.fiAssetInd}</Text>
            <Divider mt={5} mb={5}></Divider>
            <BarChart
              //style={(borderRadius = 16)}
              data={data}
              // 차트 전체너비
              width={screenWidth * 0.9}
              // 차트 전체높이
              height={400}
              yAxisSuffix=" %" // y축 라벨 (yAxisLabel은 접두사)
              chartConfig={chartConfig}
              verticalLabelRotation={0} // x축 라벨 회전 관련
            />
          </Box>
        </VStack>
      )}
    </ContentScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "white",
  //배경 색
  backgroundGradientFrom: "#0000",
  backgroundGradientTo: "#0000",
  backgroundGradientFromOpacity: 0.4,
  backgroundGradientToOpacity: 0.4,
  //막대 색
  fillShadowGradientOpacity: 1, //투명도
  fillShadowGradientTo: "#f780f4",
  //소수점
  decimalPlaces: 1,
  // 레이블, 전체적인 색
  color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
  style: {
    borderRadius: 16,
  },
};

// chartConfig 백업
// const chartConfig = {
//   backgroundGradientFrom: "white",
//   backgroundGradientFromOpacity: 1,
//   backgroundGradientTo: "white",
//   backgroundGradientToOpacity: 1,
//   color: (opacity = 1) => `rgba(55,55,55, ${opacity})`,
//   strokeWidth: 3, // optional, default 3
//   barPercentage: 1,
//   useShadowColorFromDataset: false, // optional
//   style: {
//     borderRadius: 16,
//   },
// };

export default StatisticsContainer;
