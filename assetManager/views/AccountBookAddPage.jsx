import { HStack, VStack, Box, FormControl, Select, Button } from "native-base";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import InputRadioComponent from "@components/InputRadioComponent";
import InputTextComponent from "@components/InputTextComponent";
import InputDateComponent from "@components/InputDateComponent";
import SelectComponent from "@components/SelectComponent";
import { makeDateString } from "../utils";

function AccountBookAddPage({ route }) {
  const currentDate = makeDateString(new Date());
  const year = Number(currentDate.substring(0, 4));
  const [price, setPrice] = useState("");
  const [radio, setRadio] = useState("withdraw");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");
  const { itemList } = route.params;
  const uniqueAccountNumbers = [
    ...new Set(itemList.map((item) => item.accountNumber)),
  ];

  return (
    <ScrollView>
      {/* 카드내역 추가 */}
      <VStack mt="5" mb="5" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
          <Box w="100%">
            <HStack
              justifyContent="space-around"
              alignItems="center"
              mb="5"
              borderRadius="lg"
              backgroundColor="amber.100"
            >
              <Text style={{ fontSize: 25, margin: 10 }}>가계부 추가</Text>
            </HStack>
            {/* {itemList.map((item, index) => {
              return <Text key={index}>{item.accountNumber}</Text>;
            })} */}
            {uniqueAccountNumbers.map((accountNumber, index) => {
              return <Text key={index}>{accountNumber}</Text>;
            })}

            <InputTextComponent
              name="price"
              inputType={"number"}
              priceFormat={true}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "금액(원)" }}
              // formControlHelperProps={{
              //   text: "예치금액 / 적립금액을 입력하세요.",
              // }}
              alertContent={"정확한 금액을 입력해주세요."}
              //id={item.index}
              //value={item["price"] || ""}
              placeholder="0"
              //dispatchF={depositUpdate}
              value={price}
              parentSetState={setPrice}
            />
            <InputRadioComponent
              name="Type"
              formControlProps={{ mb: "8", isDisabled: true }}
              formControlLabelProps={{
                text: "분류",
              }}
              radioButtonList={[
                {
                  text: "지출",
                  value: "withdraw", //저장할 때도 이 값이 간다.
                  liStyle: { alignItems: "center", ml: "5", mr: "10" },
                },
                {
                  text: "수입",
                  value: "deposit",
                  liStyle: { alignItems: "center" },
                },
              ]}
              //formControlHelperProps={{ text: "상품을 선택하세요." }}
              //id={item.index}
              //value={item["depositType"]}
              //dispatchF={depositUpdate}
              value={radio}
              parentSetState={setRadio}
            />
            <InputTextComponent
              name="price"
              inputType={"text"}
              priceFormat={true}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "카테고리" }}
              // formControlHelperProps={{
              //   text: "예치금액 / 적립금액을 입력하세요.",
              // }}
              alertContent={"정확한 금액을 입력해주세요."}
              //id={item.index}
              //value={item["price"] || ""}
              placeholder="미분류"
              //dispatchF={depositUpdate}
            />
            <InputTextComponent
              name="content"
              inputType={"text"} //Text가 디폴트임 (생략가능)
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "거래처" }}
              // formControlHelperProps={{
              //   text: "예치금액 / 적립금액을 입력하세요.",
              // }}
              alertContent={"정확한 금액을 입력해주세요."}
              //id={item.index}
              placeholder="거래처를 입력하세요"
              value={content}
              parentSetState={setContent}
              //dispatchF={depositUpdate}
            />
            <SelectComponent
              isVertical={true}
              formControlProps={{ marginBottom: 10 }}
              formControlLabelProps={{
                text: "거래수단",
              }}
              // formControlHelperProps={{
              //   text: "소유차량의 제조사를 선택하세요.",
              // }}
              // selectProps={{}}
              selectItem={uniqueAccountNumbers}
              // selectItemStyle={{}}
              value={uniqueAccountNumbers}
              //parentSetState={setAccNum}
              //dispatchF={carCompanyUpdate}
            />
            <InputDateComponent
              name="startDate"
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "날짜" }}
              //formControlHelperProps={{ text: "상품 가입일을 선택하세요." }}
              //textInputProps={{ color: startDate ? "black" : "gray" }}
              //id={item.index}
              value={currentDate}
              //dispatchF={depositUpdate}
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
              name="price"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "메모" }}
              // formControlHelperProps={{
              //   text: "예치금액 / 적립금액을 입력하세요.",
              // }}
              alertContent={"정확한 금액을 입력해주세요."}
              //id={item.index}
              //value={item["price"] || ""}
              placeholder="메모 입력"
              //dispatchF={depositUpdate}
              value={memo}
              parentSetState={setMemo}
            />
            <Button size="lg">저장하기</Button>
          </Box>
        </Box>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  picker: {
    // height: 50,
    // width: 200,
    fontSize: 15, // 글씨 크기 조정
    backgroundColor: "white",
  },
  pickerItem: {
    fontSize: 10, // 글씨 크기 조정
  },
});

export default AccountBookAddPage;
