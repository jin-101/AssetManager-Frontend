import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Icon, Input, Pressable, Stack, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: 50,
    backgroundColor: "#4f69c6",
    justifyContent: "center",
  },
});

function Login() {
  const [show, setShow] = useState(false);
  return (
    <View style={style.container}>
      <View style={style.header}></View>
      <View style={style.content}>
        <Box w="100%">
          <Box space={4} mb="10" mt="5" alignItems="center">
            <Text fontSize={40}>Welcome</Text>
          </Box>
          <Box
            borderWidth="1"
            borderColor="coolGray.300"
            bg="coolGray.100"
            borderRadius="30"
            height={400}
            w="90%"
            justifyContent="center"
            maxW="400px"
            mx="auto"
            mb="10"
          >
            <Stack alignItems="center" space={4}>
              <Input
                bg="white"
                size="xl"
                mt="5"
                w={{
                  base: "90%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Id"
              />
              <Input
                bg="white"
                w={{
                  base: "90%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
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
              <Stack
                mb="2.5"
                mt="5"
                direction={{
                  base: "row",
                  md: "row",
                }}
                space={5}
              >
                <Button size="md" colorScheme="primary">
                  회원가입
                </Button>
                <Button size="md" colorScheme="primary">
                  로그인
                </Button>
              </Stack>
              <Box mt="2">
                <Button size="lg" variant="ghost">
                  비회원 시세조회
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </View>
      <View style={style.footer}>
        <Stack alignItems="center">
          <Text color="white">Asset Manager</Text>
        </Stack>
      </View>
    </View>
  );
}

export default Login;
