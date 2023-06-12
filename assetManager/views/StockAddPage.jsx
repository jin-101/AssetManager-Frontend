import React,{useState} from 'react';
import {
    Box,
    Center,
    FormControl,
    HStack,
    Input,
    Radio,
    ScrollView,
    Stack,
    Text,
    VStack,
    Select,
    CheckIcon,
    WarningOutlineIcon,
    Button,
    Divider,
    Heading,
    Link,
    string,
    View,
    IconButton,
    CloseIcon,
    Container,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
  } from "native-base";
import InputDateComponent from "@components/InputDateComponent";
import InputTextComponent from "@components/InputTextComponent";
import { makeDateString } from "../utils";
import { useSelector,useDispatch } from 'react-redux';
import {stockInputUpdate} from '../action'
import axios from "axios";

function StockAddPage(){
    const currentDate = makeDateString(new Date());
    const year = Number(currentDate.substring(0, 4));
    const {stockName,buyPrice,buyQuantity,buyDate} = useSelector((state) =>state.stock)
    const dispatch = useDispatch();


    

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
                                minDate: `${year - 5}-01-01`,
                                maxDate: `${year + 5}-12-31`,
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
                        <Button mb="5">자산등록</Button>
                        <Button>초기화</Button>                                                         
                    </FormControl>
                </Box>
            </VStack>
        </ScrollView>
    );
}

export default StockAddPage;