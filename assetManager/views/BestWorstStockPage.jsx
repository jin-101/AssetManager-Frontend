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
                setStocks(response.data);
            } catch (e) {
                console.log(e);
            }    
        };
        fetchStocks();
        setLoading(false);
    },[])


    if(isLoading){
        return <Loading></Loading>
    }
    
    return(
        <Box>
        <FlatList data={stocks} renderItem={({item,index})=>
            <Box key={index} borderBottomWidth="1" borderColor="muted.800" py="2" _dark={{borderColor: "muted.50"}}>
                <HStack>
                    <Avatar size="50px" source={require("@assets/bear.jpg")} ml="1" mr="2"/>
                    <VStack>
                        <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                            {item["corpName"]}
                        </Text>
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
                            {item["corpCode"]}
                        </Text>
                    </VStack>
                    <Spacer></Spacer>
                    <Text mr="2" alignSelf="center">
                        {item["flucRate"]}%
                    </Text>
                </HStack>
            </Box>
        }/>
        </Box>
    );
}



export default BestWorstStockPage;