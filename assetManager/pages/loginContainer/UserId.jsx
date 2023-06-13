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

function UserId({
  parentState = undefined,
  parentSetState = undefined,
  isCheckBtn = true,
  title = "계정",
  HelperText = "사용할 아이디를 입력해주세요.",
}) {
  const dispatch = useDispatch();
  const [localUserId, setLocalUserId] = useState("");
  const onchange = (text) => {
    if (parentSetState) {
      parentSetState(text);
    } else {
      setLocalUserId(text);
    }
  };

  const onPress = () => {
    //axios 다녀와서 dispatch하기
    if (localUserId === "") {
      Alert.alert("", "아이디를 입력해주세요");
      return;
    }
    axios({
      url: `${apiPath}/user/checkDuplicatedId/${localUserId}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        Alert.alert(res.data);
        if (res.data === "사용가능한 ID입니다")
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
          {title}
        </Text>
        <HStack>
          <Input
            value={parentState || localUserId}
            onChangeText={onchange}
            bg="white"
            size="xl"
            w={{
              base: isCheckBtn ? "75%" : "100%",
            }}
            mr={{
              base: isCheckBtn ? "1%" : "0",
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
          {isCheckBtn && (
            <Button onPress={onPress} h="50" w="25%">
              {"중복체크"}
            </Button>
          )}
        </HStack>
        {/* 부연설명 text */}
        <FormControl.HelperText>{HelperText}</FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default UserId;
