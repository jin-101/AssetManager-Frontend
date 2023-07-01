import { FormControl, HStack, Icon, Stack, Text } from "native-base";
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import SearchAddress from "../../external/SearchAddress";
import { signinStates } from "../../action/signin";
import { useDispatch, useSelector } from "react-redux";

const custom = StyleSheet.create({
  inputStyle: {
    height: 45,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1.5,
    borderRadius: 3,
    textAlign: "center",
    fontSize: 18,
  },
});

function Address({
  parentState = undefined,
  parentSetState = undefined,
  title = "주소",
  HelperText = "사용자의 주소를 검색해주세요.",
  isDisabled = false,
}) {
  const { zonePost, addressFirst, addressSecond } =
    parentState || useSelector((state) => state.signin);
  const dispatch = useDispatch();

  return (
    <Stack
      w="100%"
      mb={5}
      alignItems="center"
      justifyContent="center"
      space={4}
    >
      <FormControl w="90%">
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          {title}
        </Text>
        <HStack mb="1">
          <View style={{ width: "74%", marginRight: 4 }}>
            <TextInput
              style={{
                ...custom.inputStyle,
                width: "100%",
                color: isDisabled
                  ? "lightgray"
                  : addressFirst.length > 0
                  ? "black"
                  : "gray",
              }}
              value={zonePost}
              editable={false}
              placeholder="Zip code"
              placeholderTextColor="lightgray"
            />
            <Icon
              style={{ position: "absolute", top: 12.5 }}
              as={<Entypo name="address" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          </View>
          <SearchAddress
            dispatchF={signinStates}
            parentSetState={parentSetState}
            post="zonePost"
            address1="addressFirst"
            btnStyle={{ width: "25%" }}
            isDisabled={isDisabled}
          />
        </HStack>
        <TextInput
          style={{
            ...custom.inputStyle,
            width: "100%",
            marginBottom: 3,
            color: isDisabled
              ? "lightgray"
              : addressFirst.length > 0
              ? "black"
              : "gray",
          }}
          value={addressFirst}
          editable={false}
          placeholder="address1"
          placeholderTextColor="lightgray"
        />
        <TextInput
          style={{
            ...custom.inputStyle,
            width: "100%",
            color: isDisabled ? "lightgray" : "black",
          }}
          value={addressSecond}
          editable={isDisabled ? false : addressFirst.length > 0}
          placeholder="address2"
          placeholderTextColor={addressFirst.length > 0 ? "gray" : "lightgray"}
          onChangeText={(text) => {
            if (parentSetState)
              parentSetState({ ...parentState, addressSecond: text });
            else dispatch(signinStates("addressSecond", text));
          }}
        />
        {/* 부연설명 text */}
        <FormControl.HelperText>{HelperText}</FormControl.HelperText>
      </FormControl>
    </Stack>
  );
}

export default Address;
