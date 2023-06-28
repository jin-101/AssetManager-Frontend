import React,{useEffect,useState} from "react";
import {
    Box,
    VStack,
    Button,
    FlatList,
    HStack,
    Text,
    Spacer,
    Avatar 
  } from "native-base";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiPath } from "../services";
import Loading from "../components/Loading"


function BestWorstStockPage({route,navigation}) {
    const {pageMode} = route.params;
    const [stocks,setStocks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{

        const fetchStocks = async () =>{
            try {
                const response = await axios.get(`${apiPath}/stock/flucRate`,{params:{"pageMode":pageMode}});
                for(let i=0;i<response.data.length-1;i++){
                    let rate =  Number(response.data[i]["flucRate"]);  
    
                    for(let j=i+1;j<response.data.length;j++){
                        let compareRate =Number(response.data[j]["flucRate"]);            

                        if(rate<compareRate){
                            let temp = response.data[i]
                            response.data[i] = response.data[j]
                            response.data[j] =temp
                        }
                    }

                }

                setStocks(response.data);
            } catch (e) {
                console.log(e);
            }    
        };
        fetchStocks();
        setLoading(false);
    },[])

    const showimage = (mode) =>{
        switch (mode) {
            case "upper":
                return require("../assets/bull.png")
            default:
                return require("../assets/loss.png")
        }
    }


    if(isLoading){
        return <Loading></Loading>
    }
    
    return(
        <Box>
        <FlatList data={stocks} renderItem={({item,index})=>
            <Box key={index} borderBottomWidth="1" borderColor="muted.800" py="2" _dark={{borderColor: "muted.50"}}>
                <HStack>
                    <Avatar size="50px" source={showimage(pageMode)} ml="1" mr="2"/>
                    <VStack>
                        <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold fontSize={20}>
                            {item["corpName"]}
                        </Text>
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
                            {item["corpCode"]}
                        </Text>
                    </VStack>
                    <Spacer></Spacer>
                    <Text mr="2" alignSelf="center" bold fontSize={20}>
                        {item["flucRate"]}%
                    </Text>
                </HStack>
            </Box>
        }/>
        </Box>
    );
}



export default BestWorstStockPage;