import React, { useState } from "react";
import Postcode from "@actbase/react-daum-postcode";
import { Modal } from "react-native";
import { Box, Button, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const SearchAddress = ({
  btnStyle,
  dispatchF,
  post,
  address1,
  parentState,
}) => {
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const onPress = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      {isModal && (
        <Modal>
          <Box
            h="50"
            bg="#4f69c6"
            alignItems="flex-start"
            justifyContent="center"
            onTouchEnd={onPress}
          >
            <HStack
              justifyContent="center"
              alignItems="center"
              h={"100%"}
              ml={2}
            >
              <Ionicons name="arrow-back" size={30} color="white" />
              <Text ml={8} fontWeight="bold" fontSize="xl" color="white">
                {"뒤로가기"}
              </Text>
            </HStack>
          </Box>
          <Postcode
            style={{
              position: "absolute",
              top: 50,
              width: "100%",
              height: "100%",
              backgroundColor: "red",
            }}
            jsOptions={{ animation: true, hideMapBtn: true }}
            onSelected={(data) => {
              const { address, zonecode } = data;
              console.log(data);
              dispatch(dispatchF(post, zonecode));
              dispatch(dispatchF(address1, address));
              // if (parentState) parentState(address);
              onPress();
            }}
          />
        </Modal>
      )}
      <Button {...btnStyle} onPress={onPress}>
        {"주소검색"}
      </Button>
    </>
  );
};
export default SearchAddress;
