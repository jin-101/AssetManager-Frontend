import React, { useState } from "react";
import { View, Button, Divider, ScrollView, Text, Box } from "native-base";
import UserId from "@pages/userInfoContainer/UserId";
import SecurityNumber from "@pages/userInfoContainer/SecurityNumber";
import UserPassword from "@pages/userInfoContainer/UserPassword";
import { apiPath } from "../services";
import { inputFormCheckFunction } from "../utils";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import Loading from "../components/Loading";
import InputTextComponent from "@components/InputTextComponent";

function SearchPwPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [inputId, SetInputId] = useState("");
  const [inputSsn, SetInputSsn] = useState({
    securityNoFirst: "",
    securityNoSecond: "",
  });
  const [searchPw, setSearchPw] = useState("");
  const [isNoneText, setIsNoneText] = useState("");
  const [inputPw, SetInputPw] = useState({
    userPw: "",
    userPwCheck: "",
  });

  // 1. 비밀번호 찾기 버튼
  const searchClick = () => {
    if (inputFormCheckFunction("userId", inputId)) {
      return;
    }
    const { securityNoFirst, securityNoSecond } = inputSsn;
    if (
      inputFormCheckFunction(
        "securityNumber",
        securityNoFirst,
        securityNoSecond
      )
    ) {
      return;
    }

    setIsLoading(true);
    axios({
      headers: { "Content-Type": `application/json` },
      url: `${apiPath}/user/findUserPw`,
      method: "POST",
      data: JSON.stringify({
        userId: inputId,
        ssn: `${securityNoFirst}-${securityNoSecond}`,
      }),
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== "error") {
          setSearchPw(res.data);
          setIsNoneText("");
        } else {
          setIsNoneText("일치하는 정보가 없습니다");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "//");
      });
  };

  // 2. 새 비밀번호 등록 버튼
  const register = () => {
    const { userPw, userPwCheck } = inputPw;
    // console.log("userId : " + inputId);
    // console.log("userPw : " + inputPw.userPw);
    if (inputFormCheckFunction("userPw", userPw, userPwCheck)) return;
    console.log("패스워드 확인 조건 통과");

    setIsLoading(true); // (1) ★ 모든 조건 만족 후 axios 보내기 직전에 true로 설정
    axios({
      headers: { "Content-Type": `application/json` },
      url: `${apiPath}/user/registerUserPw`,
      method: "POST",
      data: JSON.stringify({
        userId: inputId,
        userPw: inputPw.userPw, // inputPw 객체의 userPw 값을 사용
      }),
    })
      .then((res) => {
        console.log("스프링에서 넘어온 result : " + res.data);
        const result = res.data;
        Alert.alert("비밀번호 변경 완료", result);
        navigation.navigate("Login");
        setIsLoading(false); // (2) ★ axios 다 갔다오면 로딩 false로
      })
      .catch((err) => {
        console.log(err, "//");
      });
  };

  // console.log(inputId, inputSsn);

  // ★ isLoading이 true이면 Loading 컴포넌트를 리턴하게끔 설정
  if (isLoading) return <Loading />;

  return (
    <ScrollView>
      <View justifyContent="center" alignItems="center" mt="5">
        {searchPw.length === 0 ? (
          <>
            <View w="90%" mb="10">
              <UserId
                parentState={inputId}
                parentSetState={SetInputId}
                isCheckBtn={false}
                HelperText={"사용자의 아이디를 입력해주세요."}
              />
              <SecurityNumber
                parentState={inputSsn}
                parentSetState={SetInputSsn}
              />
              <View w="100%" justifyContent="center" alignItems="center">
                <Button w="80%" onPress={searchClick}>
                  비밀번호 찾기
                </Button>
              </View>
            </View>

            {isNoneText.length > 0 && (
              <>
                <Divider />
                <View alignItems="center" w="100%">
                  <Text w="90%" mt="4" mb="8" fontSize={15}>
                    {isNoneText}
                  </Text>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View alignItems="center" w="90%">
              <Box w="90%">
                <InputTextComponent
                  title="기존 비밀번호"
                  value={searchPw}
                  textInputProps={{
                    readOnly: "true",
                    color: "gray",
                    fontSize: 18,
                  }}
                ></InputTextComponent>
              </Box>
              <UserPassword
                parentState={inputPw}
                parentSetState={SetInputPw}
                title="새 비밀번호"
                title2="새 비밀번호 확인"
              />
              {/* </View> */}
              {/* <View w="100%" justifyContent="center" alignItems="center"> */}
              <Button w="70%" onPress={register}>
                등록
              </Button>
              {/* </View> */}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default SearchPwPage;
