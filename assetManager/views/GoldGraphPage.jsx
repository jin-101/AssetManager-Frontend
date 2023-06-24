import React,{useLayoutEffect,useState,useEffect} from "react";
import {
    Button,
    Text,
    ScrollView
  } from "native-base";
import {Dimensions} from "react-native"
import {LineChart} from "react-native-chart-kit"
import axios from "axios";
import {apiPath} from "../services/index"
import Loading from "../components/Loading"



function GoldGraphPage(){
    const [isLoading,setIsLoading] = useState(true);

    const miniGoldIn = new Array();
    const [miniGold,setMiniGold] = useState([]);

    const goldIn = new Array();
    const [gold,setGold] = useState([]);

    useEffect(()=>{
        const fecthGold = async () => {
            const response = await axios.get(`${apiPath}/gold/goldGraph`)

            for(let i=0;i<response.data.length;i++){
                miniGoldIn.push(response.data[i]["mini"]);
                goldIn.push(response.data[i]["gold99k"]);
            }

            setGold(goldIn);
            setMiniGold(miniGoldIn);
            setIsLoading(false);
        };
        fecthGold();
    },[])

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
            stroke: "#DC1306"
          },
        propsForLabels:{
            fontSize:"10"
        },
        barPercentage: 0.5,
        useShadowColorFromDataset: true // optional
      };

    if(isLoading){
        return <Loading></Loading>
    }


    return (
        <ScrollView>
            <Text ml="3" fontWeight="bold">Mini Gold</Text> 
            <LineChart
                    data={{
                    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
                    datasets: [
                        {
                        data: miniGold
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={300}
                    yAxisLabel="￦"
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        marginHorizontal:2,
                        borderRadius: 16
                    }}
                    withInnerLines={false}
                    xLabelsOffset={1}
                />
            <Text ml="3" fontWeight="bold">Gold 99K</Text> 
            <LineChart
                    data={{
                    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
                    datasets: [
                        {
                        data: gold
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={300}
                    yAxisLabel="￦"
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        marginHorizontal:2,
                        borderRadius: 16
                    }}
                    withInnerLines={false}
                    xLabelsOffset={1}
                />               
        </ScrollView>
    );
}

export default GoldGraphPage;