import React from "react";
import {
  Box,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
  Select,
  Stack,
  Button, // as NativeBaseButton (별명으로 지정해줄 수도 있다! by 역시한신)
} from "native-base";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { Picker } from "@react-native-picker/picker";
import ShowHideBox from "../components/ShowHideBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "../services";
import InputDateComponent from "../components/InputDateComponent";
import InputTextComponent from "../components/InputTextComponent";
import { makeDateString } from "../utils";
import { setRef } from "@mui/material";
import { useSelector } from "react-redux";
//import { AptSidoSelect, AptGuSelect } from "../components/AptSidoSelect";

function AptAddPage(props) {
  const { token } = useSelector((state) => state.login);
  // 0. 입력값 초기화 함수
  const resetAll = () => {
    setAptName("");
    setNetLeasableArea("");
    setPurchasePrice(0);
    //setPurchaseDate("");
    setLoanAmount(0);
    setRate(0);
    setMaturityDate(0);
  };

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
        .get(`${apiPath}/apt/getGu/${sido}`)
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
        .get(`${apiPath}/apt/getDong/${gu}`)
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

  // 3. 동/읍/면 선택시 => 아파트 검색 가능하게끔
  // ★★★★★ 검색 기능을 위한 코드 시작
  const [dong, setDong] = useState("");
  const [aptMap, setAptMap] = useState(new Map());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(new Map());
  const [netLeasableArea, setNetLeasableArea] = useState(""); //

  const handlePickerChange3 = (dong) => {
    console.log("내가 선택한 동 Picker 컴포넌트 : " + dong);
    console.log(sido);
    console.log(gu);
    setDong(dong);

    // Axios 요청 실행 (if문 : 시/도 선택 클릭시엔 axios 실행 안하게끔)
    if (dong !== "") {
      axios // ★★ `${itemValue}` : 백틱을 써서 이렇게 간단한 파라미터 바로 넘길 수도 있구나. 굳이 JSON으로 넘기는 게 아니라
        .get(`${apiPath}/apt/getAptName/${sido}/${gu}/${dong}`)
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
  };
  // ★★★★★ 검색 기능을 위한 코드 끝

  // 4. 검색된 아파트 클릭시 => 아파트 이름 입력란에 쏙 들어가게
  const [aptName, setAptName] = useState("");
  const insertAptName = (a, b) => {
    // ★ (2) 순서대로 파라미터를 받는 거임! (따라서 파라미터 이름은 중요치 X, 순서가 중요. 객체로 쓸 거면 객체의 키값을 따로 줘야 하는 거고)
    console.log(a); // a == map의 key값
    console.log(b); // b == map의 value값
    setAptName(b);
    const startNum = a.indexOf("_");
    const 전용면적 = a.substring(startNum + 1, a.length);
    setNetLeasableArea(전용면적);
  };

  // 5. 매입가격, 매입날짜 관련 코드
  const [purchasePrice, setPurchasePrice] = useState(0); // 매입가격
  const today = makeDateString(new Date());
  const [purchaseDate, setPurchaseDate] = useState(today); // 매입날짜 (디폴트로 오늘 날짜인 걸 보여주기 위해 util의 makeDateString을 이용?!)
  const aa = (purchaseDate) => {
    setPurchaseDate(purchaseDate);
  };

  // 6. 대출 Show/Hide 코드
  const [isVisible, setIsVisible] = useState(false);
  const showButtonClick = () => {
    setIsVisible(true);
  };
  const hideButtonClick = () => {
    setIsVisible(false);
  };
  const [loanAmount, setLoanAmount] = useState(0); // 대출금액
  const [rate, setRate] = useState(0); // 대출금리
  const [maturityDate, setMaturityDate] = useState(0); // 대출만기

  // 7. 추가 버튼
  const handleSubmit = () => {
    let data = {
      aptName: aptName,
      netLeasableArea: netLeasableArea,
      purchasePrice: purchasePrice,
      purchaseDate: purchaseDate,
      loanAmount: loanAmount,
      rate: rate,
      maturityDate: maturityDate,
    };
    console.log(data);
    // 입력값 유효한지 check
    // (i)대출정보를 아예 입력하지 않은 경우
    if (loanAmount === 0 && rate === 0 && maturityDate === 0) {
      if (aptName === "") {
        Alert.alert("", "아파트 이름을 입력해주세요");
        return;
      } else if (purchasePrice === 0) {
        Alert.alert("", "매입가격을 입력해주세요");
        return;
      }
    } else {
      if (loanAmount === 0) {
        Alert.alert("", "모든 대출정보를 입력해주세요");
        return;
      } else if (rate === 0) {
        Alert.alert("", "모든 대출정보를 입력해주세요");
        return;
      } else if (maturityDate === 0) {
        Alert.alert("", "모든 대출정보를 입력해주세요");
        return;
      }
    }
    // 입력값이 유효한 경우 처리 로직
    axios({
      url: `${apiPath}/apt/add/${token}`,
      method: "POST",
      headers: { "Content-Type": `application/json` },
      data: JSON.stringify(data),
    })
      .then((res) => {
        console.log("데이터 전송 성공!!");
        // 스프링에서 제대로 Insert 됐는지 check
        console.log(res.data); // ★ res.data : 스프링에서 보낸 데이터를 읽는 것!
        if (res.data === "성공") {
          Alert.alert("Success", "자산 입력에 성공하였습니다");
        } else {
          Alert.alert("Error", "??을 제대로 입력해주세요");
        }
      })
      .catch((err) => {
        console.log(`Error Msg : ${err}`);
      });
    // 입력값 초기화
    resetAll();
  };

  //
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

            <Box mb="5">
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
            </Box>

            <Box mb="5">
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
            </Box>

            <Box mb="5">
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
            </Box>

            {/*  ★★★★★ 검색기능 시작 */}
            <Box mb="5">
              <FormControl.Label>아파트 이름 검색하기</FormControl.Label>
              <Input value={searchKeyword} onChangeText={handleSearch} />
              {searchKeyword !== "" &&
                Array.from(filteredData.keys()).map((key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      insertAptName(key, filteredData.get(key)); // ★ (1) insertAptName(a, b) 그냥 이런 식으로 파라미터를 넣고
                    }}
                  >
                    <Text fontSize="xs" key={key}>{`${key}`}</Text>
                  </TouchableOpacity>
                  // <Text key={key}>{`${key}: ${filteredData.get(key)}`}</Text>
                ))}
              {/*  ★★★★★ 검색기능 끝 */}
            </Box>

            <Box mb="5">
              <FormControl.Label>아파트 이름</FormControl.Label>
              <Input
                label={aptName}
                value={aptName}
                placeholder="(1)검색 통해서 입력, (2)직접입력 구현해야 할 듯"
              />
            </Box>

            <Box mb="5">
              <FormControl.Label>전용면적 (제곱미터)</FormControl.Label>
              <Input
                value={netLeasableArea}
                label={netLeasableArea}
                placeholder="전용면적"
                isReadOnly={true}
              ></Input>
            </Box>

            <Box mb="5">
              <FormControl.Label>매입가격 (원)</FormControl.Label>
              {/* 일단 원으로 하고 나중에 상황봐서 억원, 천만원으로 바꾸자 */}
              <Input
                value={String(purchasePrice)} //value={purchasePrice}
                onChangeText={(purchasePrice) =>
                  setPurchasePrice(purchasePrice)
                }
                keyboardType="numeric"
              />
            </Box>

            <Box mb="5">
              <InputDateComponent
                title="매입날짜 - 미입력시 오늘날짜 디폴트로"
                dateTimePicker={{ display: "spinner" }}
                value={purchaseDate}
                parentSetState={setPurchaseDate}
                // ★ 상태를 변경하려면 (1)value와 (2)parentSetState 2개 모두 필요
                //onValueChange={aa}
                //onChangeText={aa}
                inputStyle={{ color: "gray" }}
                formControlStyle={{ w: "100%", mb: "5" }}
                helperText={"아파트 매입 날짜를 선택하세요."}
              ></InputDateComponent>
            </Box>

            {/* 6. 대출 Show/Hide 코드 */}
            <Box mb="5">
              <HStack alignItems="center">
                <FormControl.Label w="100%">
                  대출이 있을 경우에만 입력해주세요.
                </FormControl.Label>
              </HStack>
              <View style={styles.container}>
                {isVisible ? (
                  <Button size="lg" onPress={hideButtonClick}>
                    숨기기
                  </Button>
                ) : (
                  <Button size="lg" onPress={showButtonClick}>
                    대출 정보 입력하기
                  </Button>
                )}

                {isVisible && (
                  <View style={styles.box}>
                    <InputTextComponent
                      title="대출금액 (원)"
                      inputType="number"
                      // textLabel={{ endText: "%" }}
                      inputStyle={{ width: "100%" }}
                      value={loanAmount}
                      parentSetState={setLoanAmount}
                    ></InputTextComponent>
                    <InputTextComponent
                      title="대출금리 (%)"
                      inputType="double"
                      inputStyle={{ width: "100%" }}
                      value={rate}
                      parentSetState={setRate}
                    ></InputTextComponent>

                    <InputTextComponent
                      title="대출만기 (남은 기간)"
                      placeholder="1년 ~ 50년"
                      inputType="number"
                      value={maturityDate}
                      parentSetState={setMaturityDate}
                    />
                  </View>
                )}
              </View>
            </Box>

            {/* <ShowHideBox state={aaaa} setState={setAaaa}></ShowHideBox> */}
            <Stack
              mb="2.5"
              mt="1.5"
              direction="row" // direction="row" => "column"으로 바꾸면 수직으로 쌓이게 됨
              space={2}
              // mx 이거 적용하면 버튼 너비가 줄어듦.
              mx={{
                base: "auto",
                md: "0",
              }}
            >
              {/* 초기화 버튼 필요 없을 듯 
              <Button
                size="lg"
                variant="subtle"
                colorScheme="secondary"
                onPress={handleReset}
              >
                초기화
              </Button> */}
              <Button
                width={"100%"} // 버튼 너비
                size="lg"
                variant="subtle"
                onPress={handleSubmit}
              >
                추가
              </Button>
            </Stack>
          </FormControl>
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
    height: 50,
    width: 200,
    fontSize: 10, // 글씨 크기 조정
  },
  pickerItem: {
    fontSize: 10, // 글씨 크기 조정
  },
  box: {
    width: "100%",
  },
});

export default AptAddPage;
