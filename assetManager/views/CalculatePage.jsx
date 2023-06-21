import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Pressable,
  Stack,
  Text,
  View,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";

function CalculatePage(props) {
  const { token } = useSelector((state) => state.login);
  const [data, setData] = useState({}); //연말정산 관련 받아온 데이터가 있을 때 담기
  const [paging, setPaging] = useState(0);
  const maxPage = 2;
  const [btnIsVisible, setBtnIsVisible] = useState(false);
  const navigation = useNavigation();

  const accountBookNavi = () => {
    navigation.navigate("Home");
    navigation.navigate("AccountBook");
  };

  const buttonControl = () => {
    setBtnIsVisible(!btnIsVisible);
  };

  const movePaging = (type) => {
    let np;
    if (type === "redo") {
      np = paging > 0 ? paging - 1 : 0;
    } else if (type === "undo") {
      np = paging < maxPage ? paging + 1 : maxPage;
    }
    setPaging(np);
  };

  useEffect(() => {
    //    axios({
    //      url: `${apiPath}/`,
    //      method: "GET",
    //      params: {
    //        userId: token,
    //      },
    //    }).then((res) => {
    //      setData(res.data);
    //    });
  }, []);
  console.log(Object.keys(data).length, "key 길이");
  return (
    <ContentScrollView>
      <Center>
        {Object.keys(data)?.length > 0 && (
          <Box mt={5} mb={5} w={"90%"} bg={"amber.100"}>
            <Box mt={5} mb={5}>
              <Text>연말정산 예상 환급액 여기 만들기</Text>
            </Box>
          </Box>
        )}
        <Box mt={5} mb={5} w={"90%"}>
          <Box alignItems={"center"}>
            <Button w={"60%"} size="lg" onPress={accountBookNavi} mb={2.5}>
              가계부로 이동
            </Button>
            <Text>가계부 입력시 더 정확하게 계산할 수 있습니다.</Text>
          </Box>
        </Box>
        <Divider />
        <Box mt={5} mb={5} w={"90%"}>
          <Box alignItems={"center"}>
            {btnIsVisible ? (
              <Button w={"60%"} size="lg" onPress={buttonControl}>
                숨기기
              </Button>
            ) : (
              <Button w={"60%"} size="lg" onPress={buttonControl}>
                세부 정보 입력하기
              </Button>
            )}
          </Box>
          {btnIsVisible && (
            <Stack bg w={"100%"} mt={5} justifyContent={"flex-start"}>
              <HStack>
                <Pressable m={2.5} onPress={() => movePaging("redo")}>
                  <AntDesign name="leftcircle" size={30} color="black" />
                </Pressable>
                <Pressable m={2.5} onPress={() => movePaging("undo")}>
                  <AntDesign name="rightcircle" size={30} color="black" />
                </Pressable>
              </HStack>
              {paging === 0 && (
                <Box
                  bg={"yellow.100"}
                  w={"100%"}
                  h={500}
                  borderRadius={20}
                ></Box>
              )}
              {paging === 1 && (
                <Box bg={"blue.100"} w={"100%"} h={500} borderRadius={20}></Box>
              )}
              {paging === 2 && (
                <Box bg={"red.100"} w={"100%"} h={500} borderRadius={20}></Box>
              )}
            </Stack>
          )}
        </Box>
      </Center>
    </ContentScrollView>
  );
}

export default CalculatePage;
