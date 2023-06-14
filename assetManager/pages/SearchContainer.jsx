//연습중..
import { Box, Button, VStack } from "native-base";
import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import SelectComponent from "@components/SelectComponent";
import { Picker } from "@react-native-picker/picker";

function SearchContainer({}) {
  console.log("SeachContainer >>>");

  const selectItem = [
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
    { label: "UX Research", value: "ux" },
  ];
  return (
    <ScrollView>
      <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
        <Box w="100%" bg="amber.100">
          <SelectComponent
            formControlProps={{}}
            formControlLabelProps={{
              text: "제목",
              fontWeight: 700,
              color: "black",
            }}
            FormControlHelperProps={{}}
            selectProps={{}}
            selectItem={selectItem}
            selectItemStyle={{}}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  modal: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    opacity: 0.5,
  },
});

export default SearchContainer;
