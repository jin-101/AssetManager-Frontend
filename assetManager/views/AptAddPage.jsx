import React from "react";
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
  Divider,
  Button,
} from "native-base";
import { Alert, StyleSheet, View } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { Picker } from "@react-native-picker/picker";
import MyComponent from "../components/MyComponent";
import { useState, useEffect } from "react";
import axios from "axios";
//import { AptSidoSelect, AptGuSelect } from "../components/AptSidoSelect";

function AptAddPage(props) {
  // AptSidoSelect 컴포넌트로 분리하고 싶은 부분
  const [sido, setSido] = useState("");
  const handleSido = (value) => {
    setSido(value);
    //getGu(value);
  };
  console.log(sido); // setSido(value) 아래 있어야 제대로 콘솔에 찍히네

  // AptGuSelect 컴포넌트로 분리하고 싶은 부분
  const [gu, setGu] = useState("");
  const handleGu = (value) => {
    setGu(value);
  };
  console.log(gu);
  const { dataList } = props;
  return (
    <ScrollView bg="red.100">
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <FormControl>
            <Box mb="10">
              <HStack alignItems="center">
                <FormControl.Label w="100%">
                  보유중인 아파트를 검색 후 추가하세요.
                </FormControl.Label>
              </HStack>
            </Box>
            <Box mb="10">
              <FormControl.Label>시/도</FormControl.Label>
              {/* AptSidoSelect 컴포넌트로 분리하고 싶은 부분 */}
              <View style={styles.container}>
                <Picker
                  selectedValue={sido}
                  onValueChange={handleSido}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="시/도 선택" value="" />
                  <Picker.Item label="서울특별시" value="서울특별시" />
                  <Picker.Item label="부산광역시" value="부산광역시" />
                  <Picker.Item label="대구광역시" value="대구광역시" />
                  <Picker.Item label="인천광역시" value="인천광역시" />
                  <Picker.Item label="광주광역시" value="광주광역시" />
                  <Picker.Item label="대전광역시" value="대전광역시" />
                  <Picker.Item label="울산광역시" value="울산광역시" />
                  <Picker.Item label="세종특별자치시" value="세종특별자치시" />
                  <Picker.Item label="경기도" value="경기도" />
                  <Picker.Item label="강원도" value="강원도" />
                  <Picker.Item label="충청북도" value="충청북도" />
                  <Picker.Item label="충청남도" value="충청남도" />
                  <Picker.Item label="전라북도" value="전라북도" />
                  <Picker.Item label="전라남도" value="전라남도" />
                  <Picker.Item label="경상북도" value="경상북도" />
                  <Picker.Item label="경상남도" value="경상남도" />
                  <Picker.Item label="제주도" value="제주도" />
                </Picker>
                {/* 버튼을 Picker 바로 오른쪽에 두고 싶은데.. */}
                <Button title="Submit" onPress={getGu} />
              </View>
              {/* AptGuSelect 컴포넌트로 분리하고 싶은 부분 */}
              <FormControl.Label>구</FormControl.Label>
              {/* <AptGuSelect></AptGuSelect> */}
              <FormControl.Label>동/읍/면</FormControl.Label>
              <Input placeholder="select로" />
              <FormControl.Label>아파트 이름</FormControl.Label>
              <Input placeholder="검색 기능으로" />
              <FormControl.Label>전용면적</FormControl.Label>
              <Input placeholder="select로" />
              <FormControl.Label>매입가격 (원)</FormControl.Label>
              {/* 일단 원으로 하고 나중에 상황봐서 억원, 천만원으로 바꾸자 */}
              <Input keyboardType="numeric" />
              <FormControl.Label>매입시점</FormControl.Label>
              <Input placeholder="달력으로??" />
            </Box>
            <HStack alignItems="center">
              <FormControl.Label w="100%">
                대출이 있을 경우에만 입력해주세요.
              </FormControl.Label>
            </HStack>
            <MyComponent></MyComponent>
            <Box mb="10">
              <FormControl.Label>대출금액 (원)</FormControl.Label>
              <Input keyboardType="numeric" />
              <FormControl.Label>대출금리 (%)</FormControl.Label>
              <Input keyboardType="numeric" />
              <FormControl.Label>대출만기</FormControl.Label>
              <Input placeholder="달력으로??" />
            </Box>
          </FormControl>
        </Box>
      </VStack>
    </ScrollView>
  );
}

const getGu = ({ sido }) => {
  let data = { sido: "서울특별시" };
  console.log("getGu에서 시/도: " + data.sido);
  // ★★★ axios 문법
  // axios.post(url, data, {Content-Type 설정})
  axios
    .post("http://192.168.0.5:8888/app/apt/getGu", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data); // ★ 스프링에서 보낸 List<String>이 옴!
      console.log("구를 얻었음");
    })
    .catch((err) => {
      console.log(`Error Message: ${err}`);
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    height: 50,
    width: 200,
    fontSize: 10, // 글씨 크기 조정
  },
  pickerItem: {
    fontSize: 10, // 글씨 크기 조정
  },
});

export default AptAddPage;
