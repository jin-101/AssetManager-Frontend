import React, { useEffect, useState } from "react";
import { Box, Button, Center, HStack, Text, VStack } from "native-base";
import DropdownModal from "@components/DropdownModal";
import { useNavigation } from "@react-navigation/native";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import { btnStyle, btnTextStyle } from "../styles";
function HomeContainer() {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.login);
  const [totalAsset, setTotalAsset] = useState("0");

  const mokdonPlanner = () => {
    navigation.navigate("mokdonPlanner");
  };
  const calculate = () => {
    navigation.navigate("calculate");
  };

  useEffect(() => {
    axios({
      url: `${apiPath}/user/getTotalAsset`,
      method: "GET",
      params: {
        userId: token,
      },
    }).then((res) => {
      setTotalAsset(res.data);
    });
  }, []);
  return (
    <>
      <ContentScrollView>
        <VStack space={10} alignItems="center" mt="10" mb="10">
          <Text>{totalAsset}</Text>
          <HStack>
            <DropdownModal
              content={[
                {
                  index: 0,
                  title: "자산",
                  list: [
                    { title: "예적금", key: "AddDeposit" },
                    { title: "부동산", key: "AddApt" },
                    { title: "자동차", key: "AddCar" },
                    { title: "금", key: "AddGold" },
                    { title: "외환", key: "AddExchange" },
                    { title: "주식", key: "AddStock" },
                    { title: "코인", key: "AddCoin" },
                  ],
                },
                {
                  index: 1,
                  title: "부채",
                  list: [
                    { title: "부채항목1", key: "Addtest1" },
                    { title: "부채항목2", key: "Addtest2" },
                    { title: "부채항목3", key: "Addtest3" },
                  ],
                },
              ]}
            />
            <Button
              {...btnStyle}
              ml={2}
              onPress={mokdonPlanner}
              _text={{ ...btnTextStyle }}
              _pressed={{
                bg: "gray.200",
                borderColor: "white",
              }}
            >
              목돈 마련 플래너
            </Button>
          </HStack>
          <HStack w="80%" h="300">
            <Box
              rounded="md"
              shadow={3}
              height="100%"
              bg="amber.100"
              width="50%"
            >
              <Text fontSize="2xl">자산</Text>
            </Box>
            <Box
              rounded="md"
              shadow={3}
              height="100%"
              bg="amber.200"
              width="50%"
            >
              <Text fontSize="2xl">부채</Text>
            </Box>
          </HStack>

          <Center w="80%" h="300" bg="coolGray.100" rounded="md" shadow={3}>
            <Text fontSize="2xl">통계일부</Text>
          </Center>

          {/* <Center w="80%" h="300" bg="coolGray.100" rounded="md" shadow={3}>
            <Text fontSize="2xl">소비탭</Text>
          </Center> */}

          <Button
            {...btnStyle}
            onPress={calculate}
            _text={{ ...btnTextStyle }}
            _pressed={{
              bg: "gray.200",
              borderColor: "white",
            }}
          >
            연말 정산 예상 계산기
          </Button>
        </VStack>
      </ContentScrollView>
    </>
  );
}
export default HomeContainer;
