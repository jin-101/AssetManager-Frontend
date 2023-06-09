//연습중..
import { Button, Modal } from "native-base";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { DatePicker, CalendarList } from "react-native-common-date-picker";
import { ScrollView } from "react-native";

function SearchContainer({
  buttonProps = {},
  modalProps = {},
  modalHeaderText = "",
  isScroll = true,
  datePickerProps = {},
}) {
  console.log("InputDateComponent >>>");
  const currentDate = new Date();
  const [show, setShow] = useState(false);

  const onChange = useCallback((val) => {
    setShow(false);
  }, []);
  return (
    <ScrollView>
      <Text style={{ height: 1000, backgroundColor: "red" }}></Text>

      <Button h="45" ml="2" onTouchEnd={() => setShow(true)} {...buttonProps}>
        날짜를 선택하세요.aa
      </Button>

      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg"
        {...modalProps}
      >
        <Modal.Content bg="white">
          <Modal.CloseButton />
          <Modal.Header>
            {modalHeaderText || "날짜를 선택해주세요."}
          </Modal.Header>
          <Modal.Body>
            {isScroll ? (
              <DatePicker
                type="YYYY-MM" // 스크롤 유형
                minDate="2000-01-01" //시작일
                maxDate="2099-12-31" //종료일
                defaultDate={currentDate} // 처음 보여지는 날짜
                toolBarPosition="bottom" // 확인 취소 박스 위치
                cancelText="취소"
                confirmText="확인"
                yearSuffix="년"
                monthSuffix="월"
                confirm={onChange} // 확인 클릭 시 콜백함수
                cancel={() => {
                  setShow(false);
                }}
                {...datePickerProps}
              />
            ) : (
              //추후 업데이트 예정(기본달력모드)
              <CalendarList
                containerStyle={{ flex: 1 }}
                cancel={() => setShow(false)}
                confirm={(data) => {
                  console.log(data);
                  // onChange();
                }}
              />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  modal: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
    opacity: 0.5,
  },
});

export default SearchContainer;
