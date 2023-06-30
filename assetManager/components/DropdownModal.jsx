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
import { btnPressStyle, btnStyle, btnTextStyle } from "../styles";

function DropdownModal({ content }) {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const dropdownInit = {};
  content.map((el, i) => {
    dropdownInit["item" + i] = false;
  });
  const [dropdown, setDropdown] = useState(dropdownInit);
  return (
    <>
      <Button
        {...btnStyle}
        w={"70%"}
        onPress={onOpen}
        _text={{ ...btnTextStyle }}
        _pressed={{
          bg: "gray.200",
          borderColor: "white",
        }}
      >
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
            <View w="100%" key={el.index} alignItems="center">
              <Actionsheet.Item
                w="90%"
                _pressed={{ ...btnPressStyle }}
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
                          _pressed={{ ...btnPressStyle }}
                          onTouchEnd={() => {
                            setDropdown(dropdownInit);
                            onClose();
                            navigation.navigate(li.key); //page 이동 (App.js에서 mapping)
                          }}
                        >
                          <Actionsheet.Item key={j} alignItems="center">
                            <Text fontSize="xl">{li.title}</Text>
                          </Actionsheet.Item>
                        </Box>
                      ))}
                      <Divider w="100%" />
                    </Box>
                  </PresenceTransition>
                )}
              </>
            </View>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default DropdownModal;
