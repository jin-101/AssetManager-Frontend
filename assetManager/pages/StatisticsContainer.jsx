import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { Box, Button, HStack, VStack, Text, Center } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";
import Loading from "../components/Loading";
import {
  List,
  MD3Colors,
  Divider,
  Badge,
  TouchableRipple,
} from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { View } from "react-native";
import YearAndMonthSelect from "../components/YearAndMonthSelect";
import AccountBookAnalysis from "../components/AccountBookAnalysis";
import { btnStyle, btnTextStyle, footerHeight } from "../styles";

function StatisticsContainer() {
  const dispatch = useDispatch();

  //////// List 쓰기 위해 필요한 state
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  ///////////////////////////////////
  const { token } = useSelector((state) => state.login);
  const [fiInd, setFiInd] = useState({});
  const [salary, setSalary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const changeTab = (index) => setTab(index);
  // 재무지표 graph data
  const data = {
    labels: ["A", "B", "C", "D"],
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

  // ★ 통계 탭 입장시 => 지표 데이터 전부 불러오기
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
        const result = res.data;
        setFiInd(result);
        setSalary(result.salary); // 총소득
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(fiInd);

  if (isLoading) return <Loading />;
  return (
    <>
      <ContentScrollView>
        {/* 상단 버튼 */}
        <HStack mt={"5"} space={5} justifyContent="center">
          <Button
            {...btnStyle}
            //borderColor="info.400"
            _text={{ ...btnTextStyle, color: "blue.400" }} // color: "info.400"
            _pressed={{
              bg: "blue.200",
              borderColor: "white",
            }}
            onPress={() => changeTab(0)}
          >
            소비통계
            {/* <Text color={"blue.400"} fontSize={18} fontWeight={"semibold"}>
            소비통계
          </Text> */}
          </Button>
          <Button
            {...btnStyle}
            //borderColor="secondary.400"
            _text={{ ...btnTextStyle, color: "red.400" }}
            _pressed={{
              bg: "red.200",
              borderColor: "white",
            }}
            onPress={() => changeTab(1)}
          >
            재무지표
          </Button>
        </HStack>
        {/* 소비통계 */}
        {tab === 0 && (
          <Center>
            <VStack w={"85%"} mt={5} mb={10} ml={5} mr={5}>
              <Box p="2.5" alignItems={"center"} bg={"white"}>
                <Text
                  color={"blue.400"}
                  fontSize={18}
                  //fontWeight={"semibold"}
                >{`${token} (${fiInd.age}세) 님의 소비통계`}</Text>
              </Box>
            </VStack>
            <AccountBookAnalysis />
          </Center>
        )}
        {/* 재무지표 */}
        {tab === 1 && (
          <VStack mt={5} mb={5} ml={5} mr={5}>
            <Box p="2.5" alignItems={"center"} bg={"white"}>
              <Text
                color={"red.400"}
                fontSize={18}
                //fontWeight={"semibold"}
              >{`${token} (${fiInd.age}세) 님의 재무상태`}</Text>
            </Box>
            <List.Section>
              <List.Accordion
                title={`A. 총부채부담지표 : ${fiInd.totalDebtBurdenInd} %`}
              >
                <List.Item
                  title="권장 가이드라인 : 40% 이하"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
                <List.Item
                  title="계산방식 = 총부채 / 총자산"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
              </List.Accordion>
            </List.Section>
            <List.Section>
              <List.Accordion
                title={`B. 거주주택마련부채부담지표  : ${fiInd.mortgageLoanBurdenInd} %`}
              >
                <List.Item
                  title="권장 가이드라인 : 30% 이하"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
                <List.Item
                  title="계산방식  = 주택마련부채잔액 / 총자산"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
              </List.Accordion>
            </List.Section>
            <List.Section>
              <List.Accordion
                title={`C. 금융투자성향지표  : ${fiInd.fiInvestInd} %`}
              >
                <List.Item
                  title="권장 가이드라인 : 30% 이상"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
                <List.Item
                  title="20대 50% 이상, 30대 40% 이상, 40대 30% 이상, 50대 20% 이상"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
                <List.Item
                  title="계산방식 = 금융투자 / 저축 및 투자"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
              </List.Accordion>
            </List.Section>
            <List.Section>
              <List.Accordion
                title={`D. 금융자산비중지표 : ${fiInd.fiAssetInd} %`}
              >
                <List.Item
                  title="권장 가이드라인 : 40% 이상"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
                <List.Item
                  title="계산방식 = 금융자산 / 총자산"
                  left={(props) => <List.Icon {...props} icon="equal" />}
                />
              </List.Accordion>
            </List.Section>
            <BarChart
              style={(borderRadius = 16)}
              data={data}
              // 차트 전체너비
              width={screenWidth * 0.9}
              // 차트 전체높이
              height={300}
              yAxisSuffix=" %" // y축 라벨 (yAxisLabel은 접두사)
              chartConfig={chartConfig}
              verticalLabelRotation={0} // x축 라벨 회전 관련
            />
          </VStack>
        )}
      </ContentScrollView>
      <View style={{ height: footerHeight }}></View>
    </>
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

export default StatisticsContainer;
