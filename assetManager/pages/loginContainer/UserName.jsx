import { FormControl, Icon, Input, Stack, Text } from "native-base";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { signinStates } from "../../action/signin";
import { useDispatch, useSelector } from "react-redux";

function UserName() {
  const { userName } = useSelector((state) => state.signin);
  const dispatch = useDispatch();
  const onchange = (text) => {
    dispatch(signinStates("userName", text));
  };

  return (
    <Stack
      w="100%"
      mb={5}
      alignItems="center"
      justifyContent="center"
      space={4}
    >
      <FormControl w="90%">
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          {"이름"}
        </Text>
        <Input
          value={userName}
          onChangeText={onchange}
          bg="white"
          size="xl"
          w={{
            base: "100%",
          }}
          mr="1"
          InputLeftElement={
            <Icon
              as={<Feather name="user" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Name"
        />
        {/* 부연설명 text */}
        <FormControl.HelperText>
          {"사용자의 이름 입력해주세요."}
        </FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default UserName;
