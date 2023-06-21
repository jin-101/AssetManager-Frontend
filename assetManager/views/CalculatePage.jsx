import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text, View } from "native-base";
import React from "react";
import { useState } from "react";

function CalculatePage(props) {
  const [data, setData] = useState({}); //연말정산 관련 받아온 데이터가 있을 때 담기
  const navigation = useNavigation();

  const accountBookNavi = () => {
    navigation.navigate("Home");
    navigation.navigate("AccountBook");
  };
  return (
    <View>
      <Box mt={5} mb={5}>
        <Box mt={5} mb={5} bg={"amber.100"}>
          <Text>연말정산 예상 환급액</Text>
        </Box>
        <Box alignItems={"center"} mt={5} mb={5} bg={"blue.100"}>
          <Box w={"80%"}>
            <Button onPress={accountBookNavi} mb={2.5}>
              가계부로 이동
            </Button>
            <Text>[참고] 가계부 입력시 더 정확하게 계산할 수 있습니다.</Text>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </View>
  );
}

export default CalculatePage;
