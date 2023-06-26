import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { apiPath } from "../services";
import axios from "axios";
import { useSelector } from "react-redux";
import { Easing } from "react-native";

const screenWidth = Dimensions.get("window").width;

function AccountBookAnalysis({ route }) {
  const { itemList } = route.params;
  const { currentMonth } = route.params;
  const { token } = useSelector((state) => state.login); //아이디 가져오는 법

  const chartAnimationConfig = {
    duration: 500, // Animation duration in milliseconds
    easing: Easing.linear, // Animation easing function
  };

  const chartConfig = {
    propsForBackgroundLines: {},
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 127, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  // console.log("아이템 리스트 : " + JSON.stringify(itemList));

  // withdraw의 총합 계산
  const totalWithdraw = itemList.reduce(
    (total, item) => total + item.withdraw,
    0
  );

  // 카테고리별 지출 계산
  const categoryExpenses = {};
  itemList.map((item) => {
    if (categoryExpenses[item.category]) {
      categoryExpenses[item.category] += item.withdraw;
    } else {
      categoryExpenses[item.category] = item.withdraw;
    }
  });

  // 카테고리별 비율 계산
  const categoryExpensesPercentage = {};
  Object.keys(categoryExpenses).map((category) => {
    categoryExpensesPercentage[category] =
      (categoryExpenses[category] / totalWithdraw) * 100;
  });

  const data = Object.keys(categoryExpensesPercentage)
    .filter((category) => categoryExpensesPercentage[category] !== 0) // 비율이 0인 항목 필터링
    .map((category) => {
      return {
        name: category,
        population: categoryExpensesPercentage[category],
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
    })
    .sort((a, b) => b.population - a.population); // 비율에 따라 내림차순으로 정렬

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  ///////////////////////////////////////////////////////////
  ///////////////////////가계수지지표////////////////////////
  const [alldata, setAlldata] = useState({});
  const [extractedData, setExtractedData] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: apiPath + "/rest/webboard/alllist.do",
      data: JSON.stringify({
        memberId: token,
      }),
      headers: { "Content-Type": `application/json` },
    })
      .then((response) => {
        console.log("axios 성공 : " + JSON.stringify(response.data));
        setAlldata(response.data);
      })
      .catch((error) => {
        console.log("axios 실패 : " + error);
      });
  }, []);

  useEffect(() => {
    // withdraw 값과 deposit 값만 추출
    const dataForChart = Object.entries(alldata).map(([month, item]) => ({
      month: month,
      ratio: (item.withdraw / item.deposit) * 100,
    }));

    setExtractedData(dataForChart);
  }, [alldata]);

  const chartData = {
    labels: extractedData.map((item) => item.month),
    datasets: [
      {
        data: extractedData.map((item) => item.ratio),
      },
    ],
  };

  return (
    <ScrollView>
      <Text>분석 페이지!</Text>
      <Text>{currentMonth}월 소비패턴</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={275}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]}
      />
      <Text>가계수지지표</Text>
      {extractedData.length > 0 && (
        <LineChart
          data={chartData}
          width={screenWidth}
          height={275}
          chartConfig={chartConfig}
        />
      )}
    </ScrollView>
  );
}

export default AccountBookAnalysis;
