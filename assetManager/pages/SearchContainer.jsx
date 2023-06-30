//연습중..
import {
  Box,
  Center,
  Divider,
  HStack,
  Input,
  Stack,
  Text,
  View,
} from "native-base";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { footerHeight, windowHeight } from "../styles";
import { searchNavigate } from "../utils";
import { useNavigation } from "@react-navigation/native";

const style = StyleSheet.create({
  fontStyle: { fontSize: 20 },
});

const makeSearchTextArray = () => {
  const textArr = [];
  searchNavigate?.forEach((first, i) => {
    first?.list?.forEach((second, j) => {
      if (second?.list !== undefined) {
        second?.list.forEach((third, k) => {
          textArr.push({
            title: first.key + second.key + third.key,
            go: third.go,
            option: third.naviState,
          });
        });
      } else {
        textArr.push({
          title: first.key + second.key,
          go: second.go,
          option: second.naviState,
        });
      }
    });
  });
  return textArr;
};
const textArr = makeSearchTextArray();

function SearchContainer() {
  console.log("SeachContainer >>>");
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const onChangeText = (t) => {
    setText(t);
  };
  const onNavigationGo = (obj) => {
    console.log(obj);
    navigation.navigate(obj.go, { naviState: obj?.option });
  };
  const textRender = (arr, keyword) => {
    const titleArr = Array.from(
      arr.filter((el) => el.title.indexOf(keyword) !== -1)
    );
    if (keyword.length === 0)
      return (
        <Stack alignItems={"center"}>
          <Text style={style.fontStyle}>입력정보가 없습니다.</Text>
        </Stack>
      );
    return (
      <Stack mb={10}>
        {titleArr?.map((oneText, i) => (
          <TouchableOpacity key={i} onPress={() => onNavigationGo(oneText)}>
            <HStack m={3} alignItems={"center"}>
              {oneText.title.split(keyword).map((oneWord, j) => (
                <HStack key={j}>
                  <Text style={style.fontStyle}>{oneWord}</Text>
                  {oneText.title.split(keyword).length - 1 !== j && (
                    <Text style={style.fontStyle} color={"red.500"}>
                      {keyword}
                    </Text>
                  )}
                </HStack>
              ))}
            </HStack>
          </TouchableOpacity>
        ))}
      </Stack>
    );
  };

  // console.log(text);
  // console.log(
  //   Array.from(textArr.filter((el) => el.title.indexOf(text) !== -1))
  // );
  return (
    <>
      <View>
        <Center>
          <Stack
            bg="blue.100"
            w="90%"
            h={windowHeight * 0.12} //windowHeight * 0.12
            pl="5"
            pr="5"
            borderRadius="2xl"
            mt={10}
            mb="10"
            justifyContent={"center"}
          >
            <Input
              bg={"white"}
              value={text}
              onChangeText={onChangeText}
              placeholder="검색어를 입력해주세요."
              fontSize={20}
            ></Input>
            <Box position={"absolute"} right={30}>
              <AntDesign name="search1" size={30} color="black" />
            </Box>
          </Stack>
          <Divider />
          <ScrollView
            style={{
              backgroundColor: "lightgray", //"#eaf1f2"
              width: "90%",
              height: windowHeight * 0.5,
              marginTop: 40,
              marginBottom: 40,
              padding: 30,
              borderRadius: 20,
            }}
          >
            {textRender(textArr, text)}
          </ScrollView>
        </Center>
      </View>
      <View style={{ height: footerHeight }}></View>
    </>
  );
}

export default SearchContainer;
