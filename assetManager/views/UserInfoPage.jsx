import React, { useState } from "react";
import { Button, Center } from "native-base";
import { View, ScrollView } from "react-native";
import UserPassword from "@pages/userInfoContainer/UserPassword";
import PhoneNumber from "@pages/userInfoContainer/PhoneNumber";
import Email from "@pages/userInfoContainer/Email";
import Address from "@pages/userInfoContainer/Address";
import { inputFormCheckFunction } from "../utils";

function UserInfoPage(props) {
  const [userUpdate, setUserUpdate] = useState(false);
  const update = () => {
    setUserUpdate(!userUpdate);
  };

  //켜지자 마자
  //axios
  const [userPw, setUserPw] = useState({ userPw: "aaa", userPwCheck: "aaa" });
  const [userPhone, setUserPhone] = useState({
    phoneNoFirst: "010",
    phoneNoSecond: "1111",
    phoneNoThird: "2222",
  });
  const [userEmail, setUserEmail] = useState({ email: "aaa@aaa.com" });

  const [userAddress, setUserAddress] = useState({
    zonePost: "aaa",
    addressFirst: "bbb",
    addressSecond: "ddd",
  });

  const register = () => {
    console.log("사용자 정보 업데이트 페이지");

    if (inputFormCheckFunction("userPw", userPw.userPw, userPw.userPwCheck))
      return;
    if (
      inputFormCheckFunction(
        "phoneNumber",
        userPhone.phoneNoFirst,
        userPhone.phoneNoSecond,
        userPhone.phoneNoThird
      )
    )
      return;
    if (inputFormCheckFunction("email", userEmail.email)) return;
    if (inputFormCheckFunction("zonePost", userAddress.zonePost)) return;
    console.log(userPw, userPhone, userEmail, userAddress);
    //axios 호출해서 저장
  };

  return (
    <View style={{ marginTop: 30 }}>
      <ScrollView>
        <Center>
          {/* 비밀번호 부분 */}
          {/* 비밀번호 확인 부분 */}
          <UserPassword
            parentState={userPw}
            parentSetState={setUserPw}
            isReadOnly={!userUpdate}
            isReadOnly2={!userUpdate}
          />
          {/* 전화번호 부분 */}
          <PhoneNumber
            parentState={userPhone}
            parentSetState={setUserPhone}
            editable2={userUpdate}
            editable3={userUpdate}
          />
          {/* 이메일 부분 */}
          <Email
            parentState={userEmail}
            parentSetState={setUserEmail}
            isReadOnly={!userUpdate}
          />
          {/* 주소부분 */}
          <Address
            parentState={userAddress}
            parentSetState={setUserAddress}
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
