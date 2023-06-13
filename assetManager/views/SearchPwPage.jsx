import React, { useState } from "react";
import { View, Button, Divider, Stack, Text, ScrollView } from "native-base";
import UserId from "../pages/loginContainer/UserId";
import SecurityNumber from "../pages/loginContainer/SecurityNumber";
import InputTextComponent from "../components/InputTextComponent";

function SearchPwPage(props) {
  const data = ["aaa", "bbb", "ccc"];
  const [inputId, SetInputId] = useState("");
  const [inputSsn, SetInputSsn] = useState({
    securityNoFirst: "",
    securityNoSecond: "",
  });

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
            <Button w="80%">비밀번호 찾기</Button>
          </View>
        </View>
        <>
          <Divider />
          <View alignItems="center">
            <InputTextComponent
              formControlStyle={{
                w: "90%",
                mt: "4",
                mb: "2",
                bg: "pink.100",
                alignItems: "center",
              }}
              textLabel={{ frontText: "기존 비밀번호" }}
              textInputPropsForFront={{ width: "40%", textAlign: "center" }}
              textInputProps={{ editable: false, width: "60%" }}
              value={"aaaaa"}
            />
            <InputTextComponent
              formControlStyle={{
                w: "90%",
                mt: "2",
                mb: "2",
                bg: "pink.100",
                alignItems: "center",
              }}
              textLabel={{ frontText: "새 비밀번호" }}
              textInputPropsForFront={{ width: "40%", textAlign: "center" }}
              textInputProps={{ editable: false, width: "60%" }}
              value={"aaaaa"}
            />
            <InputTextComponent
              formControlStyle={{
                w: "90%",
                mt: "2",
                mb: "4",
                bg: "pink.100",
                alignItems: "center",
              }}
              textLabel={{ frontText: "새 비밀번호확인" }}
              textInputPropsForFront={{ width: "40%", textAlign: "center" }}
              textInputProps={{ editable: false, width: "60%" }}
              value={"aaaaa"}
            />
          </View>
          <View w="100%" justifyContent="center" alignItems="center">
            <Button w="70%">등록</Button>
          </View>
        </>
      </View>
    </ScrollView>
  );
}

export default SearchPwPage;
