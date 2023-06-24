import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { apiPath } from "../services";
import { useSelector } from "react-redux";

function CashReceiptUpload(props) {
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
      const fileName = `${token}_CashReceiptFile_${timestamp}.${fileExtension}`; // 파일 이름 생성

      // 파일을 FormData 객체에 추가
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile,
        name: fileName,
        type: "text/csv",
      });

      // Axios를 사용하여 파일을 서버로 전송
      const response = await axios.post(
        apiPath + "/rest/webboard/cashreceiptfilesave.do",
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

  const [napbuhwangeupseaek, setNapbuhwangeupseaek] = useState(0);

  //콘솔 찍기위해 시험용으로 작성한 엑시오스
  useEffect(() => {
    axios({
      method: "post",
      url: apiPath + "/rest/yearEndTax/calculateTax.do",
      data: JSON.stringify({
        memberId: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setNapbuhwangeupseaek(response.data);
        console.log("시험용 엑시오스 성공");
      })
      .catch((error) => {
        console.log("시험용 엑시으스 실패 : " + error);
      });
  }, []);

  return (
    <View>
      <Text>현금영수증 CSV 파일 업로드 페이지</Text>
      <Text>{napbuhwangeupseaek}</Text>
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

export default CashReceiptUpload;
