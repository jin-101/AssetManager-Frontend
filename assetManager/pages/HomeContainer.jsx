import React from "react";
import { ScrollView } from "react-native";
import { Box, Center, HStack, Text, VStack } from "native-base";
import DropdownModal from "../components/DropdownModal";

function HomeContainer() {
  return (
    <>
      <ScrollView>
        <VStack space={10} alignItems="center" mt="10" mb="10">
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

          <Center w="80%" h="300" bg="coolGray.100" rounded="md" shadow={3}>
            <Text fontSize="2xl">소비탭</Text>
          </Center>
          <DropdownModal
            content={[
              {
                index: 0,
                title: "자산",
                list: [
                  "예적금",
                  "부동산",
                  "자동차",
                  "금",
                  "외환",
                  "주식",
                  "코인",
                ],
              },
              {
                index: 1,
                title: "부채",
                list: ["부채항목1", "부채항목2", "부채항목3"],
              },
            ]}
          />
        </VStack>
      </ScrollView>
    </>
  );
}
export default HomeContainer;
