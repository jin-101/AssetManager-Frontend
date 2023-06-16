import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { apiPath } from "../services";
import { useSelector } from "react-redux";

function AccountBookUpload(props) {
  const { token } = useSelector((state) => state.login); //아이디 가져오는 법
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (!result.cancelled) {
        setSelectedFile(result.uri);
      }
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        console.log("No file selected.");
        return;
      }

      const fileExtension = selectedFile.split(".").pop(); // 파일 확장자 추출
      const timestamp = Date.now();
      const fileName = `${token}_file_${timestamp}.${fileExtension}`; // 파일 이름 생성

      // 파일을 FormData 객체에 추가합니다.
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile,
        name: fileName,
        type: "text/csv",
      });

      // Axios를 사용하여 파일을 서버로 전송합니다.
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

  return (
    <View>
      <Button title="파일 선택하기" onPress={handleFileSelect} />
      {selectedFile && (
        <View>
          <Text>CSV File: {selectedFile}</Text>
          <Button title="파일 저장하기" onPress={handleFileUpload} />
        </View>
      )}
    </View>
  );
}

export default AccountBookUpload;
