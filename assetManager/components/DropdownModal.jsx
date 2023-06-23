import { Entypo } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  View,
  useDisclose,
  PresenceTransition,
} from "native-base";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function DropdownModal({ content }) {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const dropdownInit = {};
  console.log(content);
  content.map((el, i) => {
    dropdownInit["item" + i] = false;
  });
  const [dropdown, setDropdown] = useState(dropdownInit);
  return (
    <>
      <Button borderRadius={10} width="40%" h={"50"} onPress={onOpen}>
        <Text color={"white"} fontSize={16}>
          자산 / 부채 추가하기
        </Text>
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
            <View
              w="100%"
              key={el.index}
              alignItems="center"
              // backgroundColor="amber.100"
            >
              {/* <Divider /> */}
              <Actionsheet.Item
                w="90%"
                // backgroundColor="red.100"
                onTouchEnd={() => {
                  setDropdown({
                    ...dropdownInit,
                    ["item" + i]: !dropdown["item" + i],
                  });
                }}
              >
                <HStack alignItems="center">
                  <View w="95%">
                    <Text
                      mr="2"
                      fontSize="2xl"
                      // fontWeight="bold"
                      color={dropdown["item" + i] ? "green.700" : "black"}
                    >
                      {el.title}
                    </Text>
                  </View>
                  <View>
                    {dropdown["item" + i] ? (
                      <Entypo name="triangle-up" size={20} color="green" />
                    ) : (
                      <Entypo name="triangle-down" size={20} />
                    )}
                  </View>
                </HStack>
              </Actionsheet.Item>
              <>
                <Divider w="90%" />
                {dropdown["item" + i] && (
                  <PresenceTransition
                    visible={dropdown["item" + i]}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 250,
                      },
                    }}
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <Box w="90%" key={i}>
                      {el?.list?.map((li, j) => (
                        <Box
                          key={j}
                          w="100%"
                          h={60}
                          px={2}
                          justifyContent="center"
                          onTouchEnd={() => {
                            setDropdown(dropdownInit);
                            onClose();
                            navigation.navigate(li.key); //page 이동 (App.js에서 mapping)
                          }}
                        >
                          <Actionsheet.Item
                            key={j}
                            // backgroundColor="blue.100"
                            alignItems="center"
                          >
                            <Text fontSize="xl">{li.title}</Text>
                          </Actionsheet.Item>
                        </Box>
                      ))}
                      <Divider w="100%" />
                    </Box>
                  </PresenceTransition>
                )}
                {/* {dropdown["item" + i] ? (
                  <Box w="90%" key={i}>
                    {el?.list?.map((li, j) => (
                      <Box
                        key={j}
                        w="100%"
                        h={60}
                        px={2}
                        justifyContent="center"
                        // backgroundColor="yellow.100"
                        onTouchEnd={() => {
                          setDropdown(dropdownInit);
                          onClose();
                          navigation.navigate(li.key); //page 이동 (App.js에서 mapping)
                        }}
                      >
                        <Actionsheet.Item
                          key={j}
                          // backgroundColor="blue.100"
                          alignItems="center"
                        >
                          <Text fontSize="xl">{li.title}</Text>
                        </Actionsheet.Item>
                      </Box>
                    ))}
                    <Divider w="100%" />
                  </Box>
                ) : undefined} */}
              </>
            </View>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default DropdownModal;
