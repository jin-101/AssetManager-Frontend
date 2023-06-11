import React, { useState } from "react";
import { Button, FormControl, HStack, Text } from "native-base";
import { inputTagCommonStyle } from "../utils";
import { TextInput } from "react-native";
import DatePickerModal from "./DatePickerModal";
import { formControlLableBasicStyle } from "../styles";

function InputDateComponent({
  name = "",
  id = "0",
  dispatchF = undefined,
  parentSetState = undefined,

  value = "",
  title = "",
  helperText = "",
  formControlProps = {},
  formControlLabelProps = {},
  textInputProps = {},
  buttonProps = {},
  FormControlHelperTextProps = {},
  formControlStyle = {}, //기존 제작 파라매타
  labelStyle = {}, //기존 제작 파라매타
  inputStyle = {}, //기존 제작 파라매타

  modalProps = {},
  layoutIsScroll = true,
  datePickerProps = {},
}) {
  console.log("InputDateComponent >>>");
  const [show, setShow] = useState(false);
  const modalShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <FormControl isDisabled {...formControlStyle} {...formControlProps}>
        <Text
          style={{
            ...formControlLableBasicStyle.label,
            ...labelStyle,
          }}
          {...formControlLabelProps}
        >
          {title}
        </Text>
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
          <Button h="45" ml="2" onTouchEnd={modalShow} {...buttonProps}>
            날짜를 선택하세요.
          </Button>
        </HStack>
        <FormControl.HelperText {...FormControlHelperTextProps}>
          {helperText}
        </FormControl.HelperText>
      </FormControl>
      <DatePickerModal
        layoutIsScroll={layoutIsScroll}
        modalControlState={{ state: show, setState: modalShow }}
        datePickerProps={datePickerProps}
        modalProps={modalProps}
        customProps={{
          id: id,
          name: name,
          dispatchF: dispatchF,
          parentSetState: parentSetState,
        }}
      />
    </>
  );
}
export default React.memo(InputDateComponent);
