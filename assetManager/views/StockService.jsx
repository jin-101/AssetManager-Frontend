import React, { useState,useEffect} from "react";
import {
    Box,
    VStack,
    Text,
    HStack,
    Avatar,
    Spacer,
    Center,
    View,
    Actionsheet,
    ScrollView,
    useDisclose,
    Image
  } from "native-base";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../services";
import { useNavigation } from "@react-navigation/native";
import { bestWorstPageUpdate } from "../action/stock";
import { leftPaperButton,rightPaperButtonNoWidth } from "../styles";
import { Button } from "react-native-paper";

function StockService(){
    const navigation = useNavigation();
    const {isOpen,onOpen,onClose} = useDisclose();
    const {token} = useSelector((state)=>state.login);
    const havingStock = useSelector((state)=>state.havingStock);
    const [gains,setGains] = useState([]);
    let picture = require("../assets/olympic.png");

    const fecthReturn = async (stockCode,stockMarket) => {
        try {
            const response = await axios.get(`${apiPath}/stock/compareReturn`,{
                params:{id:token,code:stockCode,market:stockMarket}
            });
            
            let usersWithGain = response.data;
            
            for(let i=0;i<usersWithGain.length-1;i++){
                let gain = usersWithGain[i]["gain"];
                
                for(let j=i+1;j<usersWithGain.length;j++){
                    let compareGain = usersWithGain[j]["gain"];
                    if(gain<compareGain){
                        let temp = usersWithGain[i];
                        usersWithGain[i] = usersWithGain[j];
                        usersWithGain[j] = temp;
                    }
                }
                
            }
            
            setGains(usersWithGain);

        } catch (e) {
            console.log(e);
        }  
    };
    
    const showMedal = (rate) =>{
        let gold = require("../assets/medal/gold.png");
        let silver = require("../assets/medal/silver.png");
        let cupper = require("../assets/medal/cupper.png");
        let loser = require("../assets/medal/loser.png");

        switch (rate) {
            case 1:
                return <Image size={35} borderRadius={100} source={gold} mr={2} alt="Alternate Text" backgroundColor={"light.200"}/>
            case 2:
                return <Image size={35} borderRadius={100} source={silver} mr={2} alt="Alternate Text" backgroundColor={"light.200"}/>
            case 3:
                return <Image size={35} borderRadius={100} source={cupper} mr={2} alt="Alternate Text" backgroundColor={"light.200"}/>
            default:
                return <Image size={35} borderRadius={100} source={loser} mr={2} alt="Alternate Text" backgroundColor={"light.200"}/>
        }
    };
    

    return(
        <ScrollView mt="5">
        {havingStock.map((el,index)=>(
            <Box key={index} borderColor="black" borderBottomWidth="1">
                <HStack py="1" px="1" justifyContent="space-between">
                    <HStack>
                        <Image size={50} borderRadius={100} source={picture} mr={2} alt="Alternate Text" backgroundColor={"light.200"}/>
                        <VStack>
                            <Text bold fontSize={20}>{el.stockName}</Text>
                            <Text fontSize={15}>{el.stockCode}</Text>
                        </VStack>                   
                    </HStack>
                    <VStack>
                        <Button {...rightPaperButtonNoWidth} style={{marginTop:5}} onPress={()=>{
                            fecthReturn(el.stockCode,el.market)
                            onOpen();
                        }}>수익률 순위 조회</Button>
                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                {gains?.map((el,index)=>(
                                    <Actionsheet.Item key={index}>
                                        <HStack>
                                            {showMedal(index+1)}
                                            <Text bold fontSize={20}>{el.id.substr(0, 2).toUpperCase()+"**"} : </Text>
                                            <Text fontSize={20}>{(el.gain*100).toFixed(2)}%</Text>
                                        </HStack>
                                        
                                    </Actionsheet.Item>
                                ))}                                
                            </Actionsheet.Content>
                        </Actionsheet>
                    </VStack>
                </HStack>
            </Box>
        ))}
            <Box>
                <HStack justifyContent="center" space={10} mt="8">
                    <Button buttonColor="red" textColor="white" onPress={()=>{
                        navigation.navigate("BestWorst",{pageMode:"upper"});
                    }}>
                        전일 수익률 10%이상
                    </Button>
                    <Button buttonColor="blue" textColor="white"   onPress={()=>{
                        navigation.navigate("BestWorst");
                        navigation.navigate("BestWorst",{pageMode:"lower"});
                    }}>
                        전일 손실률 -10%이상
                    </Button>
                </HStack>
            </Box>
        </ScrollView>
    );
}

export default StockService;