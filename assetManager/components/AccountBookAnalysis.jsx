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
import { useDispatch, useSelector } from "react-redux";
import { Easing } from "react-native";
import CustomPieChart from "./CustomPieChart";
import YearAndMonthSelect from "./YearAndMonthSelect";
import { accountInputData } from "../action";
import { Center } from "native-base";

const screenWidth = Dimensions.get("window").width;

function AccountBookAnalysis() {
  // const { itemList } = route.params;
  // const { currentMonth } = route.params;
  const { token } = useSelector((state) => state.login); //아이디 가져오는 법
  const { accountTotalList } = useSelector((state) => state.account);
  const [yearAndMonth, setYearAndMonth] = useState({
    year: "",
    month: "",
  });

  const chartAnimationConfig = {
    duration: 500, // Animation duration in milliseconds
    easing: Easing.linear, // Animation easing function
  };

  // const chartConfig = {
  //   propsForBackgroundLines: {
  //     rx: 8, // x축 모서리의 둥근 정도 설정
  //     ry: 8, // y축 모서리의 둥근 정도 설정
  //   },
  //   backgroundGradientFrom: "#FFFFFF",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "#FFFFFF",
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };

  // withdraw의 총합 계산

  // 카테고리별 지출 계산
  const categoryExpenses = {};

  const assetTitle = {};
  const assetData = {};

  // console.log(categoryExpenses);
  // console.log(totalWithdraw);

  ///////////////////////////////////////////////////////////
  ///////////////////////가계수지지표////////////////////////
  const [alldata, setAlldata] = useState({});
  const [extractedData, setExtractedData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const { year, month } = yearAndMonth;
    const myKey = year + month;
    //yearAndMonth
    //accountTotalList
    console.log(accountTotalList[myKey], "///");
    if (!accountTotalList[myKey]) {
      console.log("????");
      axios({
        method: "post",
        url: apiPath + "/rest/webboard/list.do",
        data: JSON.stringify({
          year: year,
          month: month,
          memberId: token,
        }),
        headers: { "Content-Type": `application/json` },
      })
        .then((response) => {
          console.log(response.data);
          // if (
          //   !Object.keys(accountTotalList).includes(myKey) ||
          //   isAdd.length > 0
          // ) {
          dispatch(accountInputData(myKey, response.data, ""));
          // } else {
          //   dispatch(currentKey(myKey));
          // }
          // setCurrentYearMonthKey(currentKey);
        })
        .catch((error) => {});
    }
  }, [yearAndMonth]);

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

  // const chartData = {
  //   labels: extractedData.map((item) => item.month),
  //   datasets: [
  //     {
  //       data: extractedData.map((item) => item.ratio),
  //     },
  //   ],
  // };
  // console.log(data);
  let totalWithdraw;
  const makeYM = (year, month) => {
    setYearAndMonth({
      ...yearAndMonth,
      year: year.toString(),
      month: month.toString(),
    });
  };
  if (
    accountTotalList[yearAndMonth?.year + yearAndMonth?.month] &&
    Object.keys(accountTotalList).length > 0
  ) {
    console.log("그리기");
    totalWithdraw = accountTotalList[
      yearAndMonth?.year + yearAndMonth?.month
    ].reduce((total, item) => total + item.withdraw, 0);
    accountTotalList[yearAndMonth?.year + yearAndMonth?.month].map((item) => {
      if (categoryExpenses[item.category]) {
        categoryExpenses[item.category] += item.withdraw;
      } else {
        categoryExpenses[item.category] = item.withdraw;
      }
    });
    Object.keys(categoryExpenses)
      .filter((el) => categoryExpenses[el] !== 0)
      .sort((a, b) => categoryExpenses[b] - categoryExpenses[a])
      .map((el, index) => {
        assetData[index] = categoryExpenses[el];
        assetTitle[index] = el;
      });
  }

  return (
    <>
      <YearAndMonthSelect parentCallback={makeYM} />
      <ScrollView style={{ width: "100%" }}>
        <Center>
          <CustomPieChart
            totalValue={totalWithdraw}
            centerTitle="소비 패턴"
            assetTitle={assetTitle}
            assetData={assetData}
          />
        </Center>

        {/* <Text>가계수지지표</Text>
      {extractedData.length > 0 && (
        <LineChart
          data={chartData}
          width={screenWidth}
          height={275}
          chartConfig={chartConfig}
        />
      )} */}
      </ScrollView>
    </>
  );
}

export default AccountBookAnalysis;
