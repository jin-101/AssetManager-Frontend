import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

function AccountBookAnalysis({ route }) {
  const { itemList } = route.params;
  const { currentMonth } = route.params;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  // console.log("아이템 리스트 : " + JSON.stringify(itemList));

  // withdraw 속성의 총합 계산
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
    });

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <ScrollView>
      <Text>분석 페이지!</Text>
      <Text>{currentMonth}월</Text>

      <PieChart
        data={data}
        width={screenWidth}
        height={275}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]}
        legendPosition={"bottom"}
      />
    </ScrollView>
  );
}

export default AccountBookAnalysis;
