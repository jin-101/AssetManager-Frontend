import React, { useCallback, useState } from "react";
import { Button, FormControl, HStack, Modal } from "native-base";
import { inputTagCommonStyle } from "../utils";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { DatePicker, CalendarList } from "react-native-common-date-picker";

function InputDateComponent({
  name = "",
  id = "0",
  value = "",
  dispatchF = undefined,
  parentSetState = undefined,
  title = "",
  helperText = "",
  formControlProps = {},
  formControlLabelProps = {},
  textInputProps = {},
  buttonProps = {},
  FormControlHelperTextProps = {},
  modalProps = {},
  modalHeaderText = "",
  isScroll = true,
  datePickerProps = {},
  formControlStyle = {}, //기존 제작 파라매타
  labelStyle = {}, //기존 제작 파라매타
  inputStyle = {}, //기존 제작 파라매타
}) {
  console.log("InputDateComponent >>>");
  const dispatch = useDispatch();
  const currentDate = new Date();
  const [show, setShow] = useState(false);

  const onChange = useCallback((val) => {
    if (parentSetState) parentSetState(val);
    if (dispatchF) dispatch(dispatchF(val, id, name));
    setShow(false);
  }, []);

  return (
    <>
      <FormControl isDisabled {...formControlStyle} {...formControlProps}>
        <FormControl.Label
          _disabled={{
            _text: {
              fontSize: "lg",
              color: "black",
              fontWeight: "bold",
              ...labelStyle,
            },
          }}
          {...formControlLabelProps}
        >
          {title}
        </FormControl.Label>
        <HStack alignItems="center" justifyContent="center" h="50" mb="1">
          <TextInput
            style={{
              ...inputTagCommonStyle,
              width: "50%",
              ...inputStyle,
            }}
            value={value}
            readOnly={true}
            {...textInputProps}
          />
          <Button
            h="45"
            ml="2"
            onTouchEnd={() => setShow(true)}
            {...buttonProps}
          >
            날짜를 선택하세요.
          </Button>
        </HStack>
        <FormControl.HelperText {...FormControlHelperTextProps}>
          {helperText}
        </FormControl.HelperText>
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
      </FormControl>
    </>
  );
}
export default React.memo(InputDateComponent);
