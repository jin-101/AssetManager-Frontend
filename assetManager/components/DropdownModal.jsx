import { Entypo } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Text,
  useDisclose,
} from "native-base";
import { useState } from "react";

function DropdownModal({ content }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const dropdownInit = {};
  content.map((el, i) => {
    dropdownInit["item" + i] = false;
  });
  const [dropdown, setDropdown] = useState(dropdownInit);
  return (
    <>
      <Button size="md" colorScheme="primary" onPress={onOpen}>
        자산 / 부채 추가하기
      </Button>
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          setDropdown(dropdownInit);
          onClose();
        }}
      >
        <Actionsheet.Content>
          {content?.map((el, i) => (
            <>
              <Actionsheet.Item
                key={i}
                onTouchEnd={() => {
                  setDropdown({
                    ...dropdownInit,
                    ["item" + i]: !dropdown["item" + i],
                  });
                }}
              >
                <HStack alignItems="center">
                  <Text
                    mr="2"
                    fontSize="2xl"
                    color={dropdown["item" + i] ? "green.700" : "black"}
                  >
                    {el.title}
                  </Text>
                  {dropdown["item" + i] ? (
                    <Entypo name="triangle-up" size={20} color="green" />
                  ) : (
                    <Entypo name="triangle-down" size={20} />
                  )}
                </HStack>
              </Actionsheet.Item>
              <>
                {dropdown["item" + i] ? (
                  <Box w="100%">
                    {el.list?.map((li, j) => (
                      <Box
                        key={j}
                        w="100%"
                        h={60}
                        px={4}
                        justifyContent="center"
                        onTouchEnd={() => {
                          console.log(li);
                        }}
                      >
                        <Actionsheet.Item>{li}</Actionsheet.Item>
                      </Box>
                    ))}
                  </Box>
                ) : undefined}
              </>
            </>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default DropdownModal;
