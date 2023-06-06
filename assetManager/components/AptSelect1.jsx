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
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const AptSelect1 = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View>
      <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
        <Picker.Item label="서울특별시" value="서울특별시" />
        <Picker.Item label="부산광역시" value="부산광역시" />
        <Picker.Item label="대구광역시" value="대구광역시" />
        <Picker.Item label="인천광역시" value="인천광역시" />
        <Picker.Item label="광주광역시" value="광주광역시" />
        <Picker.Item label="대전광역시" value="대전광역시" />
        <Picker.Item label="울산광역시" value="울산광역시" />
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

export default AptSelect1;
