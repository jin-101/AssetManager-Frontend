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
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { Picker } from "@react-native-picker/picker";
import ShowHideBox from "../components/ShowHideBox";
import { useState, useEffect } from "react";
import axios from "axios";
//import { AptSidoSelect, AptGuSelect } from "../components/AptSidoSelect";

function AptAddPage(props) {
  // 1. 시/도 선택시 => 구를 얻는
  // Picker 컴포넌트를 선택했을 때 Axios 요청을 실행
  const [sido, setSido] = useState("");
  const [guMap, setGuMap] = useState(new Map());

  const handlePickerChange = (sido) => {
    console.log("내가 선택한 시/도 Picker 컴포넌트 : " + sido);
    setSido(sido);

    // Axios 요청 실행 (if문 : 시/도 선택 클릭시엔 axios 실행 안하게끔)
    if (sido !== "") {
      axios // ★★ `${itemValue}` : 백틱을 써서 이렇게 간단한 파라미터 바로 넘길 수도 있구나. 굳이 JSON으로 넘기는 게 아니라
        .get(`http://192.168.0.82:8888/app/apt/getGu/${sido}`)
        .then((response) => {
          // 응답 처리 (Map 데이터를 useState에)
          console.log("axios 실행하여 온 데이터 : " + response.data);
          const responseData = response.data;
          const guMap = new Map(Object.entries(responseData));
          setGuMap(guMap);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
        });
    }
  };

  // 2. 구 선택시 => 동/읍/면을 얻는
  const [gu, setGu] = useState("");
  const [dongMap, setDongMap] = useState(new Map());

  const handlePickerChange2 = (gu) => {
    console.log("내가 선택한 구 Picker 컴포넌트 : " + gu);
    setGu(gu);

    // Axios 요청 실행 (if문 : 시/도 선택 클릭시엔 axios 실행 안하게끔)
    if (gu !== "") {
      axios // ★★ `${itemValue}` : 백틱을 써서 이렇게 간단한 파라미터 바로 넘길 수도 있구나. 굳이 JSON으로 넘기는 게 아니라
        .get(`http://192.168.0.82:8888/app/apt/getDong/${gu}`)
        .then((response) => {
          // 응답 처리 (Map 데이터를 useState에)
          console.log("getDong 성공");
          const responseData = response.data;
          const dongMap = new Map(Object.entries(responseData));
          setDongMap(dongMap);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
        });
    }
  };

  // ★★★★★ 검색 기능을 위한 코드 시작
  // 3. 동/읍/면 선택시 => 아파트 검색 가능하게끔
  const [dong, setDong] = useState("");
  const [aptMap, setAptMap] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(new Map());

  const handlePickerChange3 = (dong) => {
    console.log("내가 선택한 동 Picker 컴포넌트 : " + dong);
    console.log(sido);
    console.log(gu);
    setDong(dong);

    // Axios 요청 실행 (if문 : 시/도 선택 클릭시엔 axios 실행 안하게끔)
    if (dong !== "") {
      axios // ★★ `${itemValue}` : 백틱을 써서 이렇게 간단한 파라미터 바로 넘길 수도 있구나. 굳이 JSON으로 넘기는 게 아니라
        .get(
          `http://192.168.0.82:8888/app/apt/getAptName/${sido}/${gu}/${dong}`
        )
        .then((response) => {
          // 응답 처리 (Map 데이터를 useState에)
          console.log("getAptName 성공");
          // 아파트 Map 데이터 setting
          const responseData = response.data;
          const aptMap = new Map(Object.entries(responseData));
          setAptMap(aptMap);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
        });
    }
  };
  const handleSearch = (searchKeyword) => {
    // 검색 로직 및 결과 설정
    setSearchKeyword(searchKeyword);
    const filteredMap = new Map(
      Array.from(aptMap.entries()).filter(
        ([key, value]) =>
          value.toLowerCase().includes(searchKeyword.toLowerCase())
        // key.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
    setFilteredData(filteredMap);
    if (searchKeyword === "") {
    }
  };
  // ★★★★★ 검색 기능을 위한 코드 끝

  // 검색된 아파트 클릭시 => 아파트 이름 입력란에 쏙 들어가게
  const [aptName, setAptName] = useState("");
  const insertAptName = (value) => {
    // key가 아니라 value값을 바로 받으므로 필요 없어졌음. const realCoinName = value.key; // value.key => BTC
    console.log(value);
    setAptName(value);
  };

  const [aaaa, setAaaa] = useState({ price: "11", rate: "11", date: "11" });

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
                <Select
                  selectedValue={sido}
                  onValueChange={handlePickerChange}
                  // selectedValue={sido}
                  // onValueChange={handleSido}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Select.Item label="시/도 선택" value="" />
                  <Select.Item label="서울특별시" value="서울특별시" />
                  <Select.Item label="부산광역시" value="부산광역시" />
                  <Select.Item label="대구광역시" value="대구광역시" />
                  <Select.Item label="인천광역시" value="인천광역시" />
                  <Select.Item label="광주광역시" value="광주광역시" />
                  <Select.Item label="대전광역시" value="대전광역시" />
                  <Select.Item label="울산광역시" value="울산광역시" />
                  <Select.Item label="세종특별자치시" value="세종특별자치시" />
                  <Select.Item label="경기도" value="경기도" />
                  <Select.Item label="강원도" value="강원도" />
                  <Select.Item label="충청북도" value="충청북도" />
                  <Select.Item label="충청남도" value="충청남도" />
                  <Select.Item label="전라북도" value="전라북도" />
                  <Select.Item label="전라남도" value="전라남도" />
                  <Select.Item label="경상북도" value="경상북도" />
                  <Select.Item label="경상남도" value="경상남도" />
                  <Select.Item label="제주도" value="제주도" />
                </Select>
                {/* ★★★★★
                굳이 버튼을 누르지 않아도 '구' 정보를 얻을 수 있는 이유는
                Picker 속성에 onValueChange={handlePickerChange}를 이용하여 
                값이 바뀌면 axios를 실행하도록 handlePickerChange 함수에 axios를 넣어줬기 때문

                <Button
                  title="Submit"
                  onPress={() => {
                    handlePickerChange(selectedValue);
                  }}
                /> 
                */}
              </View>

              {/* AptGuSelect 컴포넌트로 분리하고 싶은 부분 */}
              <FormControl.Label>구</FormControl.Label>
              {/* <AptGuSelect></AptGuSelect> */}
              <Select
                selectedValue={gu}
                onValueChange={handlePickerChange2}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Select.Item label="구 선택" value=""></Select.Item>
                {/* ★★★★★(ChatGPT 참조) 
                1. dataMap.entries()를 사용하여 Map의 키-값 쌍을 배열로 변환
                2. Array.map() 메서드(여기선 [...dataMap.entries()].map을 의미)를 사용하여 각 쌍을 Picker.Item 컴포넌트로 변환
                */}
                {[...guMap.entries()].map(([key, value]) => (
                  <Select.Item key={key} label={value} value={key} /> // 화면에 보이는게 label , 여기서 처리할 값은 value
                ))}
              </Select>

              <FormControl.Label>동/읍/면</FormControl.Label>
              <Select
                selectedValue={dong}
                onValueChange={handlePickerChange3}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Select.Item label="동 선택" value=""></Select.Item>
                {[...dongMap.entries()].map(([key, value]) => (
                  <Select.Item key={key} label={key} value={key} />
                ))}
              </Select>

              {/*  ★★★★★ 검색기능 시작 */}
              <Box mb="5">
                <FormControl.Label>아파트 이름 검색하기</FormControl.Label>
                <Input value={searchKeyword} onChangeText={handleSearch} />
                {searchKeyword !== "" &&
                  Array.from(filteredData.keys()).map((key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        insertAptName(`${filteredData.get(key)}`); // ★ key값 대신 value값을 보내주면 되는 거 아닌가??
                      }}
                    >
                      <Text fontSize="xs" key={key}>{`${key}`}</Text>
                    </TouchableOpacity>
                    // <Text key={key}>{`${key}: ${filteredData.get(key)}`}</Text>
                  ))}
                {/*  ★★★★★ 검색기능 끝 */}
              </Box>
              <Input
                label={aptName}
                value={aptName}
                placeholder="검색된 아파트명 클릭시 자동 입력됨"
              />

              <FormControl.Label>전용면적</FormControl.Label>
              <Input placeholder="select로" />

              <FormControl.Label>매입가격 (원)</FormControl.Label>
              {/* 일단 원으로 하고 나중에 상황봐서 억원, 천만원으로 바꾸자 */}
              <Input keyboardType="numeric" />

              <FormControl.Label>매입시점</FormControl.Label>
              <Input placeholder="달력으로??" />
            </Box>

            <ShowHideBox state={aaaa} setState={setAaaa}></ShowHideBox>
          </FormControl>
        </Box>
      </VStack>
    </ScrollView>
  );
}

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
