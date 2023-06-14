import { FormControl, Icon, Input, Stack, Text } from "native-base";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { signinStates } from "../../action/signin";
import { useDispatch, useSelector } from "react-redux";

function UserName({
  parentState = undefined,
  parentSetState = undefined,
  title = "이름",
  HelperText = "사용자의 이름 입력해주세요.",
}) {
  const { userName } = useSelector((state) => state.signin);
  const dispatch = useDispatch();
  const onchange = (text) => {
    if (parentSetState) {
      parentSetState(text);
    } else {
      dispatch(signinStates("userName", text));
    }
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
          {title}
        </Text>
        <Input
          value={parentState || userName}
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
        <FormControl.HelperText>{HelperText}</FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default UserName;
