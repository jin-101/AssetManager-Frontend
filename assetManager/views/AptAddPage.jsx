import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Text,
  VStack,
  Select,
  Stack, // as NativeBaseButton (별명으로 지정해줄 수도 있다! by 역시한신)
} from "native-base";
import { Button as ReactNativePaperButton } from "react-native-paper";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import axios from "axios";
import { apiPath } from "../services";
import InputDateComponent from "@components/InputDateComponent";
import InputTextComponent from "@components/InputTextComponent";
import { makeDateString } from "../utils";
import { useSelector } from "react-redux";
import Loading from "@components/Loading";
import ContentScrollView from "@components/ContentScrollView";
import LoanInput from "../components/LoanInput";
import { boxStyle, rightPaperButton } from "../styles";
import { Divider } from "react-native-paper";

function AptAddPage(props) {
  const { token } = useSelector((state) => state.login);

  // 0. 로딩 페이지를 이용하기 위한 useState
  const [isLoading, setIsLoading] = useState(false);

  // 1. 시/도 선택시 => 구를 얻는
  // Picker 컴포넌트를 선택했을 때 Axios 요청을 실행
  const [sido, setSido] = useState("");
  const [guMap, setGuMap] = useState(new Map());

  const handlePickerChange = (sido) => {
    console.log("내가 선택한 시/도 Picker 컴포넌트 : " + sido);
    setSido(sido);
    setIsLoading(true);

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
          setIsLoading(false);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  // 2. 구 선택시 => 동/읍/면을 얻는
  const [gu, setGu] = useState("");
  const [dongMap, setDongMap] = useState(new Map());

  const handlePickerChange2 = (gu) => {
    console.log("내가 선택한 구 Picker 컴포넌트 : " + gu);
    setGu(gu);
    setIsLoading(true);

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
          setIsLoading(false);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
          setIsLoading(false);
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
    setIsLoading(true);

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
          setIsLoading(false);
        })
        .catch((error) => {
          // 에러 처리
          console.error(error);
          setIsLoading(false);
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
  const [purchasePrice, setPurchasePrice] = useState(""); // 매입가격
  const today = makeDateString(new Date());
  const year = Number(today.substring(0, 4));
  const [purchaseDate, setPurchaseDate] = useState(today.substring(0, 7)); // 매입날짜 (디폴트로 오늘 날짜인 걸 보여주기 위해 util의 makeDateString을 이용?!)
  const aa = (purchaseDate) => {
    setPurchaseDate(purchaseDate);
  };

  // 6. 대출 Show/Hide 코드
  const { loanAmount, rate, maturityDate } = useSelector((state) => state.loan);

  // 7. 추가 버튼
  const handleSubmit = () => {
    let data = {
      sido: sido,
      gu: gu,
      dong: dong,
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
    if (loanAmount === "" && rate === "" && maturityDate === "") {
      if (aptName === "") {
        Alert.alert("", "아파트 이름을 입력해주세요");
        return;
      } else if (purchasePrice === "") {
        Alert.alert("", "매입가격을 입력해주세요");
        return;
      }
    } else {
      if (loanAmount === "") {
        Alert.alert("", "모든 대출정보를 입력해주세요");
        return;
      } else if (rate === "") {
        Alert.alert("", "모든 대출정보를 입력해주세요");
        return;
      } else if (maturityDate === "") {
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
        // console.log(res.data); // ★ res.data : 스프링에서 보낸 데이터를 읽는 것!
        Alert.alert("Success", "자산 입력에 성공하였습니다");
      })
      .catch((err) => {
        console.log(`Error Msg : ${err}`);
      });
  };

  if (isLoading) return <Loading />;
  return (
    <ContentScrollView>
      <VStack mt="5" alignItems="center">
        <Box
          {...boxStyle}
          bg="#ECEEFF" // 색 참조 : https://mycolor.space/?hex=%234F69C6&sub=1
          // 다른 색 : #F8F8FF
          // bg="blue.100"
        >
          <FormControl>
            <Box mb="2.5">
              <Box>
                <Text fontSize={18}>지역 선택</Text>
              </Box>
              <FormControl.Label mt={2.5}>시/도</FormControl.Label>
              {/* AptSidoSelect 컴포넌트로 분리하고 싶은 부분 */}
              <View style={styles.container}>
                <Select
                  selectedValue={sido}
                  onValueChange={handlePickerChange}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Select.Item label="선택해주세요" value="" />
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

            <Box mb="2.5">
              {/* AptGuSelect 컴포넌트로 분리하고 싶은 부분 */}
              <FormControl.Label>구</FormControl.Label>
              {/* <AptGuSelect></AptGuSelect> */}
              <Select
                selectedValue={gu}
                onValueChange={handlePickerChange2}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Select.Item label="선택해주세요" value=""></Select.Item>
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
                <Select.Item label="선택해주세요" value=""></Select.Item>
                {[...dongMap.entries()].map(([key, value]) => (
                  <Select.Item key={key} label={key} value={key} />
                ))}
              </Select>
            </Box>
          </FormControl>
          <FormControl>
            {/*  ★★★★★ 검색기능 시작 */}
            <Divider></Divider>
            <Box mt={5}>
              <InputTextComponent
                formControlLabelProps={{ text: "아파트 검색하기" }}
                formControlHelperProps={{
                  text: "아파트 이름 검색 후 터치해주세요",
                }}
                formControlProps={{ marginBottom: 2.5 }}
                value={searchKeyword}
                parentSetState={handleSearch}
                // 스타일 적용
                labelStyle={{
                  fontSize: 15,
                  fontWeight: "normal",
                  color: "black",
                }}
              ></InputTextComponent>
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

              <Box>
                <FormControl.Label>아파트 이름</FormControl.Label>
                <Input
                  label={aptName}
                  value={aptName}
                  placeholder="아파트 이름 검색 후 터치해주세요"
                  isReadOnly={"true"}
                />
              </Box>

              <Box mb="5">
                <FormControl.Label>전용면적 (제곱미터)</FormControl.Label>
                <Input
                  value={netLeasableArea}
                  label={netLeasableArea}
                  placeholder="아파트 이름 검색 후 터치해주세요"
                  isReadOnly={true}
                ></Input>
              </Box>
            </Box>

            {/* 일단 원으로 하고 나중에 상황봐서 억원, 천만원으로 바꾸자 */}
            <InputTextComponent
              formControlLabelProps={{ text: "매입가격 (원)" }}
              inputType="number"
              priceFormat="true"
              value={String(purchasePrice)}
              parentSetState={setPurchasePrice}
            ></InputTextComponent>

            <InputDateComponent
              formControlLabelProps={{ text: "매입날짜" }}
              dateTimePicker={{ display: "spinner" }}
              value={purchaseDate}
              parentSetState={setPurchaseDate}
              // ★ 상태를 변경하려면 (1)value와 (2)parentSetState 2개 모두 필요
              textInputStyle={{ color: "gray" }}
              helperText={"아파트 매입 날짜를 선택하세요."}
              // 달력 모양 설정
              datePickerProps={{
                type: "YYYY-MM",
                minDate: `1990-01`,
                maxDate: `${year}-12`,
                daySuffix: "일",
                width: 300,
                rowHeight: 60,
                selectedBorderLineWidth: "2",
                toolBarCancelStyle: { color: "black" },
              }}
              // 스타일 적용
              labelStyle={{
                fontSize: 15,
                fontWeight: "normal",
                color: "black",
              }}
            ></InputDateComponent>
          </FormControl>
        </Box>
        {/* 6. 대출 Show/Hide 코드 */}
        <Box {...boxStyle} mt="5" mb="5">
          <LoanInput />
        </Box>
        <Stack
          mb="10"
          mt="1.5"
          direction="row" // direction="row" => "column"으로 바꾸면 수직으로 쌓이게 됨
          space={2}
          // mx 이거 적용하면 버튼 너비가 줄어듦.
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <ReactNativePaperButton
            //width={"80%"} // 버튼 너비
            //style={(size = "lg")}
            //variant="subtle"
            {...rightPaperButton}
            onPress={handleSubmit}
          >
            추가
          </ReactNativePaperButton>
        </Stack>
      </VStack>
    </ContentScrollView>
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
  searchBox: {
    mt: 10,
    mb: 10,
  },
  box: {
    width: "100%",
  },
  input: {
    fontSize: 15,
    fontWeight: "normal",
    color: "black",
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "normal",
    color: "black",
  },
});

export default AptAddPage;
