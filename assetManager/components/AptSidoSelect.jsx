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

const AptSidoSelect = (props) => {
  const [sido, setSido] = useState("");
  const handleValueChange = (value) => {
    setSido(value);
  };
  console.log(props.sido);
  console.log(sido); // setSido(value) 아래 있어야 제대로 콘솔에 찍히네
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={sido}
        onValueChange={handleValueChange}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="서울특별시" value="서울특별시" />
        <Picker.Item label="부산광역시" value="부산광역시" />
        <Picker.Item label="대구광역시" value="대구광역시" />
        <Picker.Item label="인천광역시" value="인천광역시" />
        <Picker.Item label="광주광역시" value="광주광역시" />
        <Picker.Item label="대전광역시" value="대전광역시" />
        <Picker.Item label="울산광역시" value="울산광역시" />
        <Picker.Item label="세종특별자치시" value="세종특별자치시" />
        <Picker.Item label="경기도" value="경기도" />
        <Picker.Item label="강원도" value="강원도" />
        <Picker.Item label="충청북도" value="충청북도" />
        <Picker.Item label="충청남도" value="충청남도" />
        <Picker.Item label="전라북도" value="전라북도" />
        <Picker.Item label="전라남도" value="전라남도" />
        <Picker.Item label="경상북도" value="경상북도" />
        <Picker.Item label="경상남도" value="경상남도" />
        <Picker.Item label="제주도" value="제주도" />
      </Picker>
    </View>
  );
};

// 얘가 부모 컴포넌트인가??
const AptGuSelect = (props) => {
  // 모든 리액트 컴포넌트는 props라는 객체를 받아옵니다.
  // 이 props 객체를 통해 컴포넌트에 전달된 prop 값을 가져올 수 있습니다.
  //const { sido } = { selectedValue };
  const [gu, setGu] = useState("");
  const handleValueChange = (value) => {
    setGu(value);
  };
  console.log("구 컴포넌트에서 시/도: ");
  console.log("구 컴포넌트에서 구: " + gu);
  //
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={gu}
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

export { AptSidoSelect, AptGuSelect };
