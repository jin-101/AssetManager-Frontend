import React, { useState } from "react";
import { View, Button, Divider, ScrollView, Text } from "native-base";
import UserId from "@pages/userInfoContainer/UserId";
import SecurityNumber from "@pages/userInfoContainer/SecurityNumber";
import UserPassword from "@pages/userInfoContainer/UserPassword";
import { apiPath } from "../services";
import { inputFormCheckFunction } from "../utils";
import axios from "axios";

function SearchPwPage(props) {
  const [inputId, SetInputId] = useState("");
  const [inputSsn, SetInputSsn] = useState({
    securityNoFirst: "",
    securityNoSecond: "",
  });

  const [searchPw, setSearchPw] = useState("");
  const [inputPw, SetInputPw] = useState({
    userPw: "",
    userPwCheck: "",
  });
  // const [newPw, setNewPw] = useState("");
  // const [newPwCheck, setNewPwCheck] = useState("");

  const searchClick = () => {
    if (inputFormCheckFunction("userId", inputId)) return;
    const { securityNoFirst, securityNoSecond } = inputSsn;
    if (
      inputFormCheckFunction(
        "securityNumber",
        securityNoFirst,
        securityNoSecond
      )
    )
      return;

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
        console.log(res.data);
        setSearchPw(res.data);
      })
      .catch((err) => {
        console.log(err, "//");
      });
  };

  const register = () => {
    const { userPw, userPwCheck } = inputPw;
    if (inputFormCheckFunction("userPw", userPw, userPwCheck)) return;
    console.log("통과");
    // axios({
    //   headers: { "Content-Type": `application/json` },
    //   url: `${apiPath}/user/findUserPw`,
    //   method: "POST",
    //   data: JSON.stringify({
    //     userId: inputId,
    //     userPw: newPw,
    //   }),
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //      navigation.navigate("Login");
    //   })
    //   .catch((err) => {
    //     console.log(err, "//");
    //   });
  };

  console.log(inputId, inputSsn);
  return (
    <ScrollView>
      <View justifyContent="center" alignItems="center" mt="5">
        <View w="90%" mb="10">
          <UserId
            parentState={inputId}
            parentSetState={SetInputId}
            isCheckBtn={false}
            HelperText={"사용자의 아이디를 입력해주세요."}
          />
          <SecurityNumber parentState={inputSsn} parentSetState={SetInputSsn} />
          <View w="100%" justifyContent="center" alignItems="center">
            <Button w="80%" onPress={searchClick}>
              비밀번호 찾기
            </Button>
          </View>
        </View>
        {searchPw.length > 0 && (
          <>
            <Divider />
            <View alignItems="center" w="100%">
              <Text w="90%" mt="4" mb="8" fontSize={15}>
                {searchPw}
              </Text>
              <View w="90%">
                <UserPassword
                  parentState={inputPw}
                  parentSetState={SetInputPw}
                  title="새 비밀번호"
                  title2="새 비밀번호 확인"
                />
              </View>
            </View>
            <View w="100%" justifyContent="center" alignItems="center">
              <Button w="70%" onPress={register}>
                등록
              </Button>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default SearchPwPage;
