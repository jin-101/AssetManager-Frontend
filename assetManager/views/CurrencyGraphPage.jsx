import React,{useLayoutEffect,useState} from "react";
import {
    Box,
    VStack,
    Button,
    Text,
    HStack,
    Avatar,
    Spacer,
    Center,
    View
  } from "native-base";
import {Dimensions} from "react-native"
import {LineChart} from "react-native-chart-kit"
import axios from "axios";
import {apiPath} from "../services/index"


function CurrencyGraphPage(){

    const [cnh,setCnh] = useState([Math.pow(2, 32)]);


    useLayoutEffect(()=>{
        const fecthCurrency = async () => {
            const response = await axios.get(`${apiPath}/currency/currencyGraph`);
            console.log(response.data);
            setCnh(response.data);
            console.log(response.data.length);
        };

        fecthCurrency();
    },[]);



    return (
    <View>
    <Text>Bezier Line Chart</Text>
    <Text>{cnh}xx</Text>
    </View>
    )
}

export default CurrencyGraphPage;