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
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AptSidoSelect from "./AptSidoSelect";
import axios from "axios";

const AptGuSelect = () => {
  const [gu, setGu] = useState("");
  const handleGu = (value) => {
    setGu(value);
  };
  console.log("AptGuSelect에서 구: " + gu);

  const [dataList, setDataList] = useState([]);
  //const [data2, setData2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let data = { sido: "서울특별시" }; // ★ 시/도 선택시 그 값이 여기로 들어가게끔 해주고 싶은데..
    try {
      const response1 = await axios.post(
        "http://192.168.0.5:8888/app/apt/getGu",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDataList(response1.data);
      console.log(response1.data); // ★ 스프링에서 보낸 List<String>이 옴!

      //   const response2 = await axios.get("https://example.com/api/data2");
      //   setData2(response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("dataList: " + dataList);
  console.log("dataList.length: " + dataList.length);
  console.log("dataList.id: " + dataList.id);
  if (dataList.length === 0) {
    return null; // 데이터 로딩 중인 경우 렌더링하지 않음
  }
  return (
    <View>
      {dataList.map((data) => (
        <Picker
          key={data.id}
          selectedValue={data.selectedValue}
          onValueChange={(value) => handleValueChange(data.id, value)}
        >
          <Picker.Item label="구 선택" value=""></Picker.Item>
          {data.options.map((option) => (
            <Picker.Item
              key={option.id}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      ))}
    </View>
  );
};

export default AptGuSelect;
