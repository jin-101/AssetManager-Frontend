import React, { useCallback } from "react";
import { Center, HStack, Icon, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Modal, StyleSheet, View, Text } from "react-native";
import { DatePicker, CalendarList } from "react-native-common-date-picker";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  modalBg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    opacity: 0.5,
  },
  modalContaniner: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalTitle: {
    height: 60,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  modalTitleText: {
    fontSize: 20,
    fontWeight: 700,
  },
  modalContent: {
    backgroundColor: "white",
  },
});

function DatePickerModal({
  layoutIsScroll = true,
  modalControlState = {}, //모달의 열고 닫는 상태를 관리하는 함수
  datePickerProps = {}, //(DatePicker 스타일)
  modalProps = {}, //titleProps(base HStack 스타일), titleText(String), contentProps(native View 스타일)
  customProps = {},
}) {
  const {
    name = "",
    id = "0",
    dispatchF = undefined,
    parentSetState = undefined,
  } = customProps;
  const { titleProps, titleText, contentProps } = modalProps;
  const dispatch = useDispatch();
  const currentDate = new Date();
  const onChange = useCallback((val) => {
    if (parentSetState) parentSetState(val);
    if (dispatchF) dispatch(dispatchF(val, id, name));
    modalControlState.setState();
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalControlState.state}
      onRequestClose={modalControlState.setState}
    >
      <View style={styles.modalBg}></View>
      <View style={styles.modalContaniner}>
        <HStack style={styles.modalTitle} {...titleProps}>
          <Text style={styles.modalTitleText}>
            {titleText || "날짜를 선택해주세요."}
          </Text>
          <Pressable cursor="pointer" onPress={modalControlState.setState}>
            <Center>
              <Icon as={<Feather name="x" size={35} color="black" />} />
            </Center>
          </Pressable>
        </HStack>
        <View style={{ ...styles.modalContent, ...contentProps }}>
          {layoutIsScroll ? (
            <DatePicker
              type="YYYY-MM" // 스크롤 유형
              minDate="2000-01-01" //시작일
              maxDate="2099-12-31" //종료일
              defaultDate={currentDate} // 처음 보여지는 날짜
              showToolBar={true}
              toolBarStyle={{
                justifyContent: "space-around",
                borderTopWidth: 0.5,
                borderColor: "lightgray",
              }}
              rowHeight={60}
              selectedBorderLineWidth="3"
              toolBarPosition="bottom" // 확인 취소 박스 위치
              cancelText="취소"
              confirmText="확인"
              yearSuffix="년"
              monthSuffix="월"
              confirm={onChange} // 확인 클릭 시 콜백함수
              cancel={modalControlState.setState}
              {...datePickerProps}
            />
          ) : (
            //추후 업데이트 예정(기본달력모드)
            <CalendarList
              containerStyle={{ flex: 1 }}
              cancel={modalControlState.setState}
              confirm={(data) => {
                console.log(data);
                // onChange();
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

export default DatePickerModal;
