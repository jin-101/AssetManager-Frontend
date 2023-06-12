import { Feather } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
} from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinStates } from "../../action/signin";
import { apiPath } from "../../services";
import { Alert } from "react-native";
import axios from "axios";

function UserId() {
  const dispatch = useDispatch();
  const [localUserId, setLocalUserId] = useState("");
  const onchange = (text) => {
    setLocalUserId(text);
  };

  const onPress = () => {
    //axios 다녀와서 dispatch하기
    axios({
      headers: { "Content-Type": `application/json` },
      url: `${apiPath}/user/checkDuplicatedId`,
      method: "GET",
      data: JSON.stringify({ userId: localUserId }),
    })
      .then((res) => {
        console.log(res);
        Alert.alert(res.data);
        if (res.data === "사용가능한 ID입니다.")
          dispatch(signinStates("userId", localUserId));
        else {
          onchange("");
        }
      })
      .catch((err) => {
        console.log(err, "//");
        onchange("");
      });
  };

  return (
    <Stack
      w="100%"
      mt={5}
      mb={5}
      alignItems="center"
      justifyContent="center"
      space={4}
    >
      <FormControl w="90%">
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          {"계정"}
        </Text>
        <HStack>
          <Input
            value={localUserId}
            onChangeText={onchange}
            bg="white"
            size="xl"
            w={{
              base: "75%",
            }}
            mr={{
              base: "1%",
            }}
            InputLeftElement={
              <Icon
                as={<Feather name="user" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Id"
          />
          <Button onPress={onPress} h="50" w="25%">
            {"중복체크"}
          </Button>
        </HStack>
        {/* 부연설명 text */}
        <FormControl.HelperText>
          {"사용할 아이디를 입력해주세요."}
        </FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default UserId;
