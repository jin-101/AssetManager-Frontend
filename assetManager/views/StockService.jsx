import React, { useState,useEffect} from "react";
import {
    Box,
    VStack,
    Button,
    Text,
    HStack,
    Avatar,
    Spacer,
    Center,
    View,
    Actionsheet,
    ScrollView,
    useDisclose
  } from "native-base";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { apiPath } from "../services";
import { useNavigation } from "@react-navigation/native";
import { bestWorstPageUpdate } from "../action/stock";

function StockService(){
    const navigation = useNavigation();
    const {isOpen,onOpen,onClose} = useDisclose();
    const {token} = useSelector((state)=>state.login);
    const havingStock = useSelector((state)=>state.havingStockUpdate);
    const [gains,setGains] = useState([]);


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
    
    
    

    return(
        <ScrollView mt="5">
        {havingStock.map((el,index)=>(
            <Box key={index} borderColor="black" borderBottomWidth="1">
                <HStack py="1" px="1" justifyContent="space-between">
                    <VStack>
                        <Text>{el.stockName}</Text>
                        <Text>{el.stockCode}</Text>
                    </VStack>
                    <VStack>
                        <Button onPress={()=>{
                            fecthReturn(el.stockCode,el.market)
                            onOpen();
                        }}>수익률 순위 조회</Button>
                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                {gains?.map((el,index)=>(
                                    <Actionsheet.Item key={index}>{index+1+"등      "+el.id+ ":" +el.gain}</Actionsheet.Item>
                                ))}                                
                            </Actionsheet.Content>
                        </Actionsheet>
                    </VStack>
                </HStack>
            </Box>
        ))}
            <Box>
                <HStack justifyContent="center" space={10} mt="8">
                    <Button onPress={()=>{
                        navigation.navigate("BestWorst",{pageMode:"upper"});
                    }}>
                        전일 수익률 10%이상
                    </Button>
                    <Button onPress={()=>{
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