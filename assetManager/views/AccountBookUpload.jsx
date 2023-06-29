import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { apiPath } from "../services";
import { useSelector } from "react-redux";
import { Button } from "native-base";
import {
  boxStyle,
  boxStyle2,
  btnStyle,
  btnTextStyle,
  btnTextStyle2,
  leftBtnPressStyle,
  rightBtnPressStyle,
  rightPaperButton,
  rightPaperButtonNoWidth,
} from "../styles";

function AccountBookUpload(props) {
  const { token } = useSelector((state) => state.login); //아이디 가져오는 법
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFisrt, setIsFirst] = useState(true);

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (!result.cancelled) {
        setSelectedFile(result.uri);
      }
      if (isFisrt) setIsFirst(false);
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  const handleFileUpload = async () => {
    try {
      if (selectedFile !== csv) {
        setShowAlert(true);
        return;
      }

      const fileExtension = selectedFile.split(".").pop(); // 파일 확장자 추출
      const timestamp = Date.now();
      const fileName = `${token}_file_${timestamp}.${fileExtension}`; // 파일 이름 생성

      // 파일을 FormData 객체에 추가
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile,
        name: fileName,
        type: "text/csv",
      });

      // Axios를 사용하여 파일을 서버로 전송
      const response = await axios.post(
        apiPath + "/rest/webboard/filesave.do",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: {
            memberid: token,
          },
        }
      );

      console.log("File uploaded:", response.data);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  const fileExtension = selectedFile?.split(".").pop(); // 파일 확장자 추출
  const [showAlert, setShowAlert] = useState(false);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Button
        {...btnStyle}
        //borderColor="secondary.400"
        _text={btnTextStyle2}
        _pressed={leftBtnPressStyle}
        onPress={handleFileSelect}
      >
        파일 선택하기
      </Button>

      {fileExtension !== "csv" &&
        !isFisrt &&
        Alert.alert("잘못된 확장자입니다.", "파일 유형을 다시 확인해주세요.")}

      {selectedFile && fileExtension === "csv" && (
        <>
          <Button
            {...btnStyle}
            style={{ marginTop: 20 }}
            _text={btnTextStyle2}
            _pressed={leftBtnPressStyle}
            onPress={handleFileUpload}
          >
            파일 저장하기
          </Button>
        </>
      )}
    </View>
  );
}

export default AccountBookUpload;
