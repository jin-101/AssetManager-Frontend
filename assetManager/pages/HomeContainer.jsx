import React from "react";
import { ScrollView } from "react-native";
import Titlebar from "@components/Titlebar";
import { Box, Center, HStack, Text, VStack } from "native-base";
import DropdownModal from "../components/DropdownModal";

function HomeContainer(props) {
  return (
    <>
      <Titlebar title={"1.홈"} />
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
              { title: "부채", list: ["부채항목1", "부채항목2", "부채항목3"] },
            ]}
          />
          {/* <Actionsheet
            isOpen={isOpen}
            onClose={() => {
              setDropdown(dropdownInit);
              onClose();
            }}
          >
            <Actionsheet.Content>
              <Actionsheet.Item
                onTouchEnd={() => {
                  setDropdown({ ...dropdownInit, item1: !dropdown.item1 });
                }}
              >
                <HStack alignItems="center">
                  <Text
                    mr="2"
                    fontSize="2xl"
                    color={dropdown.item1 ? "green.700" : "black"}
                  >
                    자산
                  </Text>
                  {dropdown.item1 ? (
                    <Entypo name="triangle-up" size={20} color="green" />
                  ) : (
                    <Entypo name="triangle-down" size={20} />
                  )}
                </HStack>
              </Actionsheet.Item>
              {dropdown.item1 ? (
                <Box w="100%" style={styles.toggle}>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>예적금</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>자동차</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>부동산</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>금</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>외환</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>주식</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>코인</Actionsheet.Item>
                  </Box>
                </Box>
              ) : undefined}

              <Actionsheet.Item
                onTouchEnd={() => {
                  setDropdown({ ...dropdownInit, item2: !dropdown.item2 });
                }}
              >
                <HStack alignItems="center">
                  <Text
                    mr="2"
                    fontSize="2xl"
                    color={dropdown.item2 ? "green.700" : "black"}
                  >
                    부채
                  </Text>
                  {dropdown.item2 ? (
                    <Entypo name="triangle-up" size={20} color="green" />
                  ) : (
                    <Entypo name="triangle-down" size={20} />
                  )}
                </HStack>
              </Actionsheet.Item>
              {dropdown.item2 ? (
                <Box w="100%" st>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>부채항목1</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>부채항목2</Actionsheet.Item>
                  </Box>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Actionsheet.Item>부채항목3</Actionsheet.Item>
                  </Box>
                </Box>
              ) : undefined}
            </Actionsheet.Content>
          </Actionsheet> */}
        </VStack>
      </ScrollView>
    </>
  );
}
export default HomeContainer;
