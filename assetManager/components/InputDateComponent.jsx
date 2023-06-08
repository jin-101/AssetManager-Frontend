import React, { useCallback, useState } from "react";
import { Button, FormControl, HStack, Stack } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { inputTagCommonStyle, makeDateString } from "../utils";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";

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
  dateViewerProps = {},
  dateSelectProps = {},
  dateHelperTextProps = {},
  dateTimePicker = {},
  formControlStyle = {}, //기존 제작 파라매타
  labelStyle = {}, //기존 제작 파라매타
  inputStyle = {}, //기존 제작 파라매타
}) {
  console.log("InputDateComponent >>>", "index", id, " value", value);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = useCallback((event, selectedDate) => {
    const currentDate = selectedDate;
    const dateFormat = makeDateString(currentDate);

    if (parentSetState) parentSetState(dateFormat);
    if (dispatchF) dispatch(dispatchF(id, name, dateFormat));

    setShow(false);
    setDate(currentDate);
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
            {...dateViewerProps}
          />
          <Button
            h="45"
            ml="2"
            onTouchEnd={() => setShow(true)}
            {...dateSelectProps}
          >
            날짜를 선택하세요.
          </Button>
        </HStack>
        <FormControl.HelperText {...dateHelperTextProps}>
          {helperText}
        </FormControl.HelperText>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            onChange={onChange}
            display="calendar"
            // positiveButton={{ label: "확인" }}
            // negativeButton={{ label: "취소" }}
            {...dateTimePicker}
          />
        )}
      </FormControl>
    </>
  );
}
export default React.memo(InputDateComponent);
