import React from "react";
import {
  Box,
  Center,
  FormControl,
  HStack,
  Input,
  Radio,
  ScrollView,
  Stack,
  Text,
  VStack,
  Select,
  CheckIcon,
  WarningOutlineIcon,
} from "native-base";

function AptAddPage(props) {
  const [value, setValue] = React.useState("one");
  return (
    <ScrollView bg="red.100">
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <FormControl>
            <Box mb="10">
              <HStack alignItems="center">
                <FormControl.Label w="40%">
                  아파트 자산 입력하기
                </FormControl.Label>
              </HStack>
              <FormControl.HelperText>
                보유중인 아파트를 검색 후 추가하세요.
              </FormControl.HelperText>
            </Box>
            <Box mb="10">
              <FormControl.Label>시/도</FormControl.Label>
              <Input placeholder="select를 써야 하는데.." />
              <FormControl.Label>구</FormControl.Label>
              <Input placeholder="select를 써야 하는데.." />
              <FormControl.Label>동/읍/면</FormControl.Label>
              <Input placeholder="select를 써야 하는데.." />
            </Box>
          </FormControl>
        </Box>

        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <FormControl>
            <Box mb="10">
              <FormControl.Label>예적금 선택</FormControl.Label>
              <Input />
              <FormControl.HelperText>
                Give your project a title.
              </FormControl.HelperText>
            </Box>
            <Box mb="10">
              <FormControl.Label>Project Title</FormControl.Label>
              <Input />
              <FormControl.HelperText>
                Give your project a title.
              </FormControl.HelperText>
            </Box>
            <Box mb="10">
              <FormControl.Label>Project Title</FormControl.Label>
              <Input />
              <FormControl.HelperText>
                Give your project a title.
              </FormControl.HelperText>
            </Box>
            <Box>
              <FormControl.Label>Project Title</FormControl.Label>
              <Input />
              <FormControl.HelperText>
                Give your project a title.
              </FormControl.HelperText>
            </Box>
          </FormControl>
        </Box>
      </VStack>
    </ScrollView>
  );
}

export default AptAddPage;
