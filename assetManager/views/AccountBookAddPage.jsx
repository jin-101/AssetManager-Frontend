import { HStack, VStack, Box, FormControl } from "native-base";
import React, { useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import InputRadioComponent from "@components/InputRadioComponent";
import InputTextComponent from "@components/InputTextComponent";
import InputDateComponent from "@components/InputDateComponent";
import SelectComponent from "@components/SelectComponent";
import { inputTagCommonStyle, makeDateString } from "../utils";
import CategoryModal from "../components/CategoryModal";
import { TextInput } from "react-native-gesture-handler";
import {
  formControlLableBasicStyle,
  leftPaperButton,
  rightPaperButton,
} from "../styles";
import { left } from "@popperjs/core";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { apiPath } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { isAddDeleteData } from "../action";
import { Button } from "react-native-paper";

function AccountBookAddPage({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const currentDate = makeDateString(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const year = Number(currentDate.substring(0, 4));
  const [money, setMoney] = useState("");
  const [radio, setRadio] = useState("withdraw");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");
  const [category, setCategory] = useState("");

  const { itemList } = route.params;
  const uniqueAccountNumbers = [
    ...new Set(itemList.map((item) => item.accountNumber)),
  ];
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");

  const [show, setShow] = useState(false);
  const modalShow = (e) => {
    setShow((prev) => !prev);
  };

  const [showPicker, setShowPicker] = useState(false);

  const handleOpenPicker = () => {
    if (!showPicker) {
      setShowPicker(true);
    }
  };
  const handleClosePicker = () => {
    if (showPicker) {
      setShowPicker(false);
    }
  };
  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setShowPicker(false);
      setSelectedTime(selectedTime);
      console.log(selectedTime);
    } else {
      setShowPicker(false);
    }
  };

  const currentTimeData = new Date();
  const [selectedTime, setSelectedTime] = useState(currentTimeData);

  //시간만 스트링 형태로 출력 12:00:00 AM
  const selectedTimeString = selectedTime.toLocaleTimeString();
  // console.log(selectedTimeString);

  //12:00:00 AM의 길이
  const TimeLength = selectedTimeString.length;

  //DB 저장을 위해 12:00:00 형식으로 출력
  const TimeForSaveData = selectedTimeString.substring(0, TimeLength - 3);
  const TimeForSaveLength = TimeForSaveData.length;
  const TimeForSave =
    TimeForSaveLength == 7 ? "0" + TimeForSaveData : TimeForSaveData;

  console.log("db저장용!!!" + TimeForSave);

  //화면에 보여주기 위한 시간 12:00 형식
  const TimeforValue = selectedTimeString.substring(0, TimeLength - 6);
  console.log("화면출력용!" + TimeforValue);

  const SaveOneAccount = () => {
    if (money === "") {
      Alert.alert("", "금액을 입력해주세요.");
      return;
    }
    if (content === "") {
      Alert.alert("", "거래처를 입력해주세요.");
      return;
    }
    if (selectedAccountNumber === "") {
      Alert.alert("", "거래수단을 선택해주세요.");
      return;
    }
    axios({
      url: apiPath + "/rest/webboard/saveoneaccount.do",
      method: "post",
      data: {
        withdraw: 0,
        deposit: 0,
        [radio]: money,
        category: category,
        content: content,
        memo: memo,
        accountNumber: selectedAccountNumber,
        exchangeDate: selectedDate + "T" + TimeForSave,
        memberId: token,
      },
      headers: { "Content-Type": `application/json` },
    })
      .then(() => {
        console.log("axios 가계부 한건 추가 성공");
        dispatch(isAddDeleteData("Add"));
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      {/* 카드내역 추가 */}
      <VStack mt="5" mb="5" alignItems="center">
        <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
          <Box w="100%">
            <HStack
              justifyContent="space-around"
              alignItems="center"
              mb="5"
              borderRadius="lg"
              backgroundColor="amber.100"
            >
              <Text
                style={{
                  fontSize: 25,
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 15,
                }}
              >
                가계부 추가
              </Text>
            </HStack>
            <View style={{ marginBottom: 0 }}>
              <InputTextComponent
                name="money"
                inputType={"number"}
                priceFormat={true}
                formControlProps={{ mb: "5" }}
                formControlLabelProps={{ text: "금액(원)" }}
                alertContent={"정확한 금액을 입력해주세요."}
                placeholder="0"
                value={money}
                parentSetState={setMoney}
              />
            </View>
            <InputRadioComponent
              name="Type"
              formControlProps={{ mb: "8", isDisabled: true }}
              formControlLabelProps={{
                text: "분류",
              }}
              radioButtonList={[
                {
                  text: "지출",
                  value: "withdraw", //저장할 때도 이 값이 간다.
                  liStyle: { alignItems: "center", ml: "5", mr: "10" },
                },
                {
                  text: "수입",
                  value: "deposit",
                  liStyle: { alignItems: "center" },
                },
              ]}
              value={radio}
              parentSetState={setRadio}
            />
            <FormControl>
              <Text style={{ ...formControlLableBasicStyle.label }}>
                카테고리
              </Text>
            </FormControl>
            <TouchableOpacity onPress={modalShow}>
              <TextInput
                style={{
                  ...inputTagCommonStyle,
                  textAlign: left,
                  paddingLeft: 10,
                  marginBottom: 50,
                }}
                placeholder="미분류"
                placeholderTextColor="lightgray"
                editable={false}
                value={category}
              />
            </TouchableOpacity>
            <InputTextComponent
              name="content"
              inputType={"text"} //Text가 디폴트임 (생략가능)
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "거래처" }}
              alertContent={"정확한 금액을 입력해주세요."}
              placeholder="거래처를 입력하세요"
              value={content}
              parentSetState={setContent}
            />
            <SelectComponent
              isVertical={true}
              formControlProps={{ marginBottom: 10 }}
              formControlLabelProps={{
                text: "거래수단",
              }}
              selectItem={uniqueAccountNumbers}
              value={selectedAccountNumber}
              parentSetState={setSelectedAccountNumber}
            />
            <InputDateComponent
              name="startDate"
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "날짜" }}
              value={selectedDate}
              datePickerProps={{
                type: "YYYY-MM-DD",
                minDate: `${year - 5}-01-01`,
                maxDate: `${year + 5}-12-31`,
                daySuffix: "일",
                width: 300,
                rowHeight: 60,
                selectedBorderLineWidth: "2",
                toolBarCancelStyle: { color: "black" },
              }}
              parentSetState={setSelectedDate}
            />
            {/* 시간 부분 */}
            <HStack h={45} alignItems="center" mb={10}>
              <TextInput
                style={{
                  ...inputTagCommonStyle,
                  width: 190,
                  height: 45,
                  // backgroundColor: "white",
                  textAlign: "center",
                  color: "gray",
                }}
                //placeholder={substringTime} //스트링 값이 들어가야 함
                placeholderTextColor="lightgray"
                editable={false}
                value={TimeforValue}
              />

              <Button
                {...leftPaperButton}
                style={{ width: "35%", marginLeft: 20, height: 40 }}
                onPress={handleOpenPicker}
                backgroundColor="red"
              >
                시간 선택
              </Button>

              {showPicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  onChange={handleTimeChange}
                />
              )}
            </HStack>

            <InputTextComponent
              name="price"
              inputType={"text"}
              formControlProps={{ mb: "5" }}
              formControlLabelProps={{ text: "메모" }}
              alertContent={""}
              placeholder="메모 입력"
              value={memo}
              parentSetState={setMemo}
              // formControlHelperProps={{ text: "상품을 선택하세요." }}
            />
            <Box alignItems={"center"}>
              <Button
                {...rightPaperButton}
                style={{ width: 320 }}
                onPress={SaveOneAccount}
              >
                저장하기
              </Button>
            </Box>
          </Box>
        </Box>
        <CategoryModal
          showState={show}
          showSetState={modalShow}
          categorySetState={setCategory}
        />
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  picker: {
    // height: 50,
    // width: 200,
    fontSize: 15, // 글씨 크기 조정
    backgroundColor: "white",
  },
  pickerItem: {
    fontSize: 10, // 글씨 크기 조정
  },
});

export default AccountBookAddPage;
