import { View, Button, Divider, Stack, Text, ScrollView } from "native-base";
import React, { useState } from "react";
import UserName from "../pages/loginContainer/UserName";
import PhoneNumber from "../pages/loginContainer/PhoneNumber";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiPath } from "../services";

function SearchIdPage(props) {
  const data = ["aaa", "bbb", "ccc"];

  const { token } = useSelector((state) => state.login);
  const [inputName, SetInputName] = useState("");
  const [inputPhone, SetInputPhone] = useState({
    phoneNoFirst: "010",
    phoneNoSecond: "",
    phoneNoThird: "",
  });
  const [searchIds, setSearchIds] = useState([]);

  const searchClick = () => {
    const { phoneNoFirst, phoneNoSecond, phoneNoThird } = inputPhone;
    axios({
      headers: { "Content-Type": `application/json` },
      url: `${apiPath}/user/findUserId`,
      method: "POST",
      data: JSON.stringify({
        userId: token,
        userName: inputName,
        phoneNumber: `${phoneNoFirst}-${phoneNoSecond}-${phoneNoThird}`,
      }),
    })
      .then((res) => {
        console.log();
        setSearchIds(res.data);
      })
      .catch((err) => {
        console.log(err, "//");
      });
  };

  console.log(inputName, inputPhone);
  return (
    <ScrollView>
      <View justifyContent="center" alignItems="center" mt="5">
        <View w="90%" mb="10">
          <UserName parentState={inputName} parentSetState={SetInputName} />
          <PhoneNumber
            parentState={inputPhone}
            parentSetState={SetInputPhone}
          />
          <View w="100%" justifyContent="center" alignItems="center">
            <Button w="80%" onPress={searchClick}>
              아이디 찾기
            </Button>
          </View>
        </View>
        <>
          <Divider />
          <Stack>
            {searchIds.map((item, index) => (
              <View w="90%" h="30" mt="10" mb="5" key={index}>
                <Text key={index}>{item}</Text>
              </View>
            ))}
          </Stack>
        </>
      </View>
    </ScrollView>
  );
}

export default SearchIdPage;
