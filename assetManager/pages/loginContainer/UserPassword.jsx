import { Feather, MaterialIcons } from "@expo/vector-icons";
import { FormControl, Icon, Input, Pressable, Stack, Text } from "native-base";
import React, { useState } from "react";
import { signinStates } from "../../action/signin";
import { useDispatch, useSelector } from "react-redux";

function UserPassword() {
  const dispatch = useDispatch();
  const { userPw, userPwCheck } = useSelector((state) => state.signin);
  const [pwShow, setPwShow] = useState(false);
  const [pwCheckShow, setPwCheckShow] = useState(false);

  const setterFunction = (key, text) => {
    dispatch(signinStates(key, text));
  };

  return (
    <>
      <Stack
        w="100%"
        mb={5}
        alignItems="center"
        justifyContent="center"
        space={4}
      >
        <FormControl w="90%">
          <Text fontSize="lg" fontWeight="bold" mb={1}>
            {"비밀번호"}
          </Text>
          <Input
            value={userPw}
            onChangeText={(text) => {
              setterFunction("userPw", text);
            }}
            bg="white"
            size="xl"
            w={{
              base: "100%",
            }}
            mr="1"
            type={pwShow ? "text" : "password"}
            InputLeftElement={
              <Icon
                as={<Feather name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Pressable onPress={() => setPwShow(!pwShow)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={pwShow ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
          />
          {/* 부연설명 text */}
          <FormControl.HelperText>
            {"사용할 비밀번호를 입력해주세요."}
          </FormControl.HelperText>
        </FormControl>
      </Stack>
      <Stack
        w="100%"
        mb={5}
        alignItems="center"
        justifyContent="center"
        space={4}
      >
        <FormControl w="90%">
          <Text fontSize="lg" fontWeight="bold" mb={1}>
            {"비밀번호 확인"}
          </Text>
          <Input
            value={userPwCheck}
            onChangeText={(text) => {
              setterFunction("userPwCheck", text);
            }}
            bg="white"
            size="xl"
            w={{
              base: "100%",
            }}
            mr="1"
            type={pwCheckShow ? "text" : "password"}
            InputLeftElement={
              <Icon
                as={<Feather name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Pressable onPress={() => setPwCheckShow(!pwCheckShow)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={pwCheckShow ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
          />
          {/* 부연설명 text */}
          <FormControl.HelperText>
            {"사용할 비밀번호를 입력해주세요."}
          </FormControl.HelperText>
        </FormControl>
      </Stack>
    </>
  );
}

export default UserPassword;