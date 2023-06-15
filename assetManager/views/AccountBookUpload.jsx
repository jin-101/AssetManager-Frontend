import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

function AccountBookUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [csvData, setCSVData] = useState([]);

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

  const handleUpload = () => {
    // 파일 업로드 로직을 작성합니다.
    // selectedFile 변수에 선택한 파일의 경로 또는 uri가 저장됩니다.
    console.log("Selected file:", selectedFile);
  };

  const readFileData = async (fileUri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      setFileData(fileContent);
      console.log(fileData);
    } catch (error) {
      console.log("Error reading file:", error);
    }
  };

  const parseCSVData = async (fileUri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const lines = fileContent.split("\n");
      const parsedData = lines.map((line) => line.split(","));

      setCSVData(parsedData);
      console.log(csvData);
    } catch (error) {
      console.log("Error parsing CSV data:", error);
    }
  };

  return (
    <View>
      <Button title="Select CSV File" onPress={handleFileSelect} />
      {selectedFile && (
        <View>
          <Text>CSV File: {selectedFile}</Text>
          <Button title="Show CSV Data" onPress={() => console.log(csvData)} />
          <Text>{csvData}</Text>
        </View>
      )}
    </View>
  );
}

export default AccountBookUpload;
