import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  ScrollView,
  VStack,
  Button,
  Text,
  Heading,
  FlatList,
  HStack,
  Avatar,
  Spacer,
  Center
} from "native-base";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../../services";


function GoldCrudPage(){
    const {token} = useSelector((state)=>state.login)
    const [gold,setGold] = useState({});

    useEffect(()=>{

        const fetchGold = async () => {
            try {
                const response = await axios.get(`${apiPath}/gold/goldCrud`,{
                    params:{id:token}
                });
                setGold(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchGold();

    },[]);


    return(
        <Box>
            <VStack>
                <Text>그램당 매수가:{gold["buyPriceByGram"]}</Text>
                <Text>99K 현재가:{gold["gold99k"]}</Text>
                <Text>미니골드 현재가:{gold["miniGold"]}</Text>
                <Text>99K기준 수익률{gold["returnBygold99k"]}</Text>
                <Text>미니골드기준 수익률{gold["returnByminiGold"]}</Text>
            </VStack>
        </Box>
    );
}

export default GoldCrudPage