import React, { useLayoutEffect, useState } from "react";
import { Text, ScrollView } from "native-base";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { apiPath } from "../services/index";
import Loading from "../components/Loading";

function CurrencyGraphPage() {
  const [isLoading, setLoading] = useState(true);

  const cnhIn = new Array();
  const [cnh, setCnh] = useState([]);

  const usdIn = new Array();
  const [usd, setUsd] = useState([]);

  const eurIn = new Array();
  const [eur, setEur] = useState([]);

  const jpyIn = new Array();
  const [jpy, setJpy] = useState([]);

  const gbpIn = new Array();
  const [gbp, setGbp] = useState([]);

  useLayoutEffect(() => {
    const fecthCurrency = async () => {
      const response = await axios.get(`${apiPath}/currency/currencyGraph`);

      for (let i = 0; i < response.data.length; i++) {
        cnhIn.push(response.data[i]["cnh"]);
        eurIn.push(response.data[i]["eur"]);
        jpyIn.push(response.data[i]["jpy"]);
        gbpIn.push(response.data[i]["gbp"]);
        usdIn.push(response.data[i]["usd"]);
      }
      setCnh(cnhIn);
      setEur(eurIn);
      setJpy(jpyIn);
      setGbp(gbpIn);
      setUsd(usdIn);
      setLoading(false);
    };
    fecthCurrency();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#F7F9F9",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#808B96",
    backgroundGradientToOpacity: 1,
    color: (opacity = 100) => `rgba(250, 21, 7, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "1",
      strokeWidth: "2",
      stroke: "#DC1306",
    },
    propsForLabels: {
      fontSize: "10",
    },
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView>
      <Text ml="3" fontWeight="bold">
        CNH
      </Text>
      <LineChart
        data={{
          labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              data: cnh,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel="￦"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 2,
          borderRadius: 16,
        }}
        withInnerLines={false}
        xLabelsOffset={1}
      />
      <Text ml="3" fontWeight="bold">
        USD
      </Text>
      <LineChart
        data={{
          labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              data: usd,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel="￦"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 2,
          borderRadius: 16,
        }}
        withInnerLines={false}
        xLabelsOffset={1}
      />
      <Text ml="3" fontWeight="bold">
        JPY
      </Text>
      <LineChart
        data={{
          labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              data: jpy,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel="￦"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 2,
          borderRadius: 16,
        }}
        withInnerLines={false}
        xLabelsOffset={1}
      />
      <Text ml="3" fontWeight="bold">
        GBP
      </Text>
      <LineChart
        data={{
          labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              data: gbp,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel="￦"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 2,
          borderRadius: 16,
        }}
        withInnerLines={false}
        xLabelsOffset={1}
      />
      <Text ml="3" fontWeight="bold">
        EUR
      </Text>
      <LineChart
        data={{
          labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              data: eur,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel="￦"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 2,
          borderRadius: 16,
        }}
        withInnerLines={false}
        xLabelsOffset={1}
      />
    </ScrollView>
  );
}

export default CurrencyGraphPage;
