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
  Button,
  Divider,
  Heading,
  Link,
  string,
} from "native-base";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const AptGuSelect = (props) => {
  // 모든 리액트 컴포넌트는 props라는 객체를 받아옵니다.
  // 이 props 객체를 통해 컴포넌트에 전달된 prop 값을 가져올 수 있습니다.
  const { sido } = props;
  const [selectedValue, setSelectedValue] = useState("");
  const handleValueChange = (value) => {
    setSelectedValue(value);
  };
  console.log("구 컴포넌트에서: " + sido);
  //
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="동대문구" value="동대문구" />
        <Picker.Item label="서대문구" value="서대문구" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    //height: 50,
    //width: 200,
    fontSize: 10, // 글씨 크기 조정
  },
  pickerItem: {
    fontSize: 10, // 글씨 크기 조정
  },
});

export default AptGuSelect;
