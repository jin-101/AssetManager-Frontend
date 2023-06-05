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
} from "native-base";
import React from "react";
function DepartAddPage() {
  const [value, setValue] = React.useState("one");
  return (
    <ScrollView bg="red.100">
      <VStack mt="10" mb="10" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mb="5">
          <FormControl>
            <Box mb="10">
              <HStack alignItems="center">
                <FormControl.Label w="40%">예적금 선택</FormControl.Label>
                {/* <Radio.Group
                  name="exampleGroup"
                  defaultValue="1"
                  accessibilityLabel="pick a size"
                >
                  <Stack
                    direction={{
                      base: "column",
                      md: "row",
                    }}
                    alignItems={{
                      base: "flex-start",
                      md: "center",
                    }}
                    space={4}
                    w="75%"
                    maxW="300px"
                  >
                    <Radio value="1" colorScheme="red" size="sm" my={1}>
                      Small
                    </Radio>
                    <Radio value="2" colorScheme="green" size="md" my={1}>
                      Medium
                    </Radio>
                    <Radio value="3" colorScheme="yellow" size="lg" my={1}>
                      Large
                    </Radio>
                  </Stack>
                </Radio.Group> */}
              </HStack>
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
export default DepartAddPage;
