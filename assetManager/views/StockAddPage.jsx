import React,{useState} from 'react';
import {
    Box,
    FormControl,
    ScrollView,
    VStack,
    Button
  } from "native-base";
import InputDateComponent from "@components/InputDateComponent";
import InputTextComponent from "@components/InputTextComponent";
import { makeDateString } from "../utils";
import { Alert } from "react-native";
import { useSelector,useDispatch } from 'react-redux';
import {stockInputUpdate,stockInputReset} from '../action'
import axios from "axios";

function StockAddPage(){
    const currentDate = makeDateString(new Date());
    const year = Number(currentDate.substring(0, 4));
    const {stockName,buyPrice,buyQuantity,buyDate} = useSelector((state) =>state.stock)
    const {token} = useSelector(state=>state.token);
    const dispatch = useDispatch();



    const onRest = () =>(
        dispatch(stockInputReset())
    );

    const onSubmit = () => {
        Alert.alert("자산등록완료")
        const buyDay  = buyDate.replaceAll("-","");
        console.log(token);
        const stockInputDTO = {stockName,price:buyPrice,buyDay,shares:buyQuantity};

        /*
        axios.post('http://192.168.0.81:8888/app/stock/stockAssetInput',null,{params:stockInputDTO})
        .then(function (response) {
          setReesponseMessage(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        */
    };

    

    return (
        <ScrollView bg="primary.100">
            <VStack mt="10" mb="10" alignItems='center'>
                <Box bg="light.50" p="5" w="90%">
                    <FormControl>
                        <InputTextComponent
                            name='stockName'
                            inputType={'text'}
                            formControlProps={{mb:'5'}}
                            inputStyle={{ width: "100%" }}
                            title =  {"매수종목"}
                            placeholder="EX)삼성전자"
                            value={stockName}
                            dispatchF={stockInputUpdate}
                        />
                        <InputDateComponent 
                            name='buyDate' 
                            formControlStyle={{w:'100%',mt:'0'}}
                            title={'매수날짜'}
                            value={buyDate}
                            dispatchF={stockInputUpdate}
                            datePickerProps={{
                                type: "YYYY-MM-DD",
                                minDate: `${year - 30}-01-01`,
                                maxDate: `${year + 10}-12-31`,
                                daySuffix: "일",
                                width: 300,
                                rowHeight: 60,
                                selectedBorderLineWidth: "2",
                                toolBarCancelStyle: { color: "black" },
                              }}                            
                        />
                        <InputTextComponent
                            name='buyPrice'
                            inputType={'text'}
                            formControlProps={{mb:'5'}}
                            inputStyle={{ width: "100%" }}
                            title =  {"매수가격"}
                            value={buyPrice}
                            dispatchF={stockInputUpdate}
                        />
                        <InputTextComponent
                            name='buyQuantity'
                            inputType={'text'}
                            formControlProps={{mb:'5'}}
                            inputStyle={{ width: "100%" }}
                            title =  {"매수수량"}
                            placeholder="EX)100주"
                            value={buyQuantity}
                            dispatchF={stockInputUpdate}                       
                        />
                        <Button mb="5" onPress={onSubmit}>자산등록</Button>
                        <Button onPress={onRest}>초기화</Button>                                                         
                    </FormControl>
                </Box>
            </VStack>
        </ScrollView>
    );
}

export default StockAddPage;