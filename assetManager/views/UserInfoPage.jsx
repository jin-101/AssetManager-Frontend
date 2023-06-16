import React, { useState, useEffect } from "react";
import { Button, Center } from "native-base";
import { View, ScrollView, Alert } from "react-native";
import UserPassword from "@pages/userInfoContainer/UserPassword";
import PhoneNumber from "@pages/userInfoContainer/PhoneNumber";
import Email from "@pages/userInfoContainer/Email";
import Address from "@pages/userInfoContainer/Address";
import { inputFormCheckFunction } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiPath } from "../services";

function UserInfoPage(props) {
  const { token } = useSelector((state) => state.login);
  const [userUpdate, setUserUpdate] = useState(false);

  const [userSearchState, setUserSearchState] = useState({
    userPw: "",
    userPwCheck: "",
    email: "",
    phoneNoFirst: "",
    phoneNoSecond: "",
    phoneNoThird: "",
    zonePost: "",
    addressFirst: "",
    addressSecond: "",
  });

  // 조회상태인지 수정상태인지
  const update = () => {
    setUserUpdate(!userUpdate);
  };

  //초기실행 - 사용자 데이터 받아오기
  useEffect(() => {
    axios({
      url: `${apiPath}/user/search/${token}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data, ">>>s");
        const {
          userPw,
          phoneNumber,
          userEmail,
          zipCode,
          userAddress,
          userDetailAddress,
        } = res.data;
        const phoneNumberArr = phoneNumber.split("-");
        setUserSearchState({
          userPw: userPw || "",
          userPwCheck: userPw || "",
          email: userEmail || "",
          phoneNoFirst: phoneNumberArr[0] || "010",
          phoneNoSecond: phoneNumberArr[1] || "",
          phoneNoThird: phoneNumberArr[2] || "",
          zonePost: zipCode || "",
          addressFirst: userAddress || "",
          addressSecond: userDetailAddress || "",
        });
      })
      .catch((err) => {
        console.log(err, "//");
      });
  }, []);

  //등록함수
  const register = () => {
    console.log("사용자 정보 업데이트 페이지");
    const {
      userPw,
      userPwCheck,
      email,
      phoneNoFirst,
      phoneNoSecond,
      phoneNoThird,
      zonePost,
      addressFirst,
      addressSecond,
    } = userSearchState;
    if (inputFormCheckFunction("userPw", userPw, userPwCheck)) return;
    if (
      inputFormCheckFunction(
        "phoneNumber",
        phoneNoFirst,
        phoneNoSecond,
        phoneNoThird
      )
    )
      return;
    if (inputFormCheckFunction("email", email)) return;
    if (inputFormCheckFunction("zonePost", zonePost)) return;
    //axios 호출해서 저장
    axios({
      url: `${apiPath}/user/update`,
      method: "POST",
      data: {
        userId: token,
        userPw: userPw,
        userEmail: email,
        phoneNumber: `${phoneNoFirst}-${phoneNoSecond}-${phoneNoThird}`,
        zipCode: zonePost,
        userAddress: addressFirst,
        userDetailAddress: addressSecond,
      },
    })
      .then((res) => {
        // console.log(res.data);
        Alert.alert(res.data);
        update();
      })
      .catch((err) => {
        // console.log(err, "//");
      });
  };

  return (
    <View style={{ marginTop: 30 }}>
      <ScrollView>
        <Center>
          {/* 비밀번호 부분 */}
          {/* 비밀번호 확인 부분 */}
          <UserPassword
            parentState={userSearchState}
            parentSetState={setUserSearchState}
            isReadOnly={!userUpdate}
            isReadOnly2={!userUpdate}
          />
          {/* 전화번호 부분 */}
          <PhoneNumber
            parentState={userSearchState}
            parentSetState={setUserSearchState}
            editable2={userUpdate}
            editable3={userUpdate}
          />
          {/* 이메일 부분 */}
          <Email
            parentState={userSearchState}
            parentSetState={setUserSearchState}
            isReadOnly={!userUpdate}
          />
          {/* 주소부분 */}
          <Address
            parentState={userSearchState}
            parentSetState={setUserSearchState}
            isDisabled={!userUpdate}
          />
          <Button
            onPress={userUpdate ? register : update}
            colorScheme={userUpdate ? "success" : "warning"}
            _pressed={{
              bg: userUpdate ? "success" : "warning",
            }}
            w="90%"
            mt="5"
            mb="10"
          >
            {userUpdate ? "등록" : "수정"}
          </Button>
        </Center>
      </ScrollView>
    </View>
  );
}

export default UserInfoPage;
