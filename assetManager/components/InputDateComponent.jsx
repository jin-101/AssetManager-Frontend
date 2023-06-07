import React, { useCallback, useState } from "react";
import { Button, FormControl, HStack } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { inputTagCommonStyle, makeDateString } from "../utils";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";

function InputDateComponent({
  name,
  parentFunction = undefined,
  id,
  value,
  dispatchF,
  title,
  mode = "date",
  helperText,
  formControlStyle,
  labelStyle,
  inputStyle,
}) {
  console.log("InputDateComponent >>>", "index", id, " value", value);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = useCallback((event, selectedDate) => {
    const currentDate = selectedDate;
    const dateFormat = makeDateString(currentDate);

    // if (parentFunction) parentFunction(name, dateFormat);
    if (dispatchF) dispatch(dispatchF(id, name, dateFormat));

    setShow(false);
    setDate(currentDate);
  }, []);

  return (
    <>
      <FormControl isDisabled {...formControlStyle}>
        <FormControl.Label
          _disabled={{
            _text: {
              fontSize: "lg",
              color: "black",
              fontWeight: "bold",
              ...labelStyle,
            },
          }}
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
          />
          <Button h="45" ml="2" onTouchEnd={() => setShow(true)}>
            날짜를 선택하세요.
          </Button>
        </HStack>
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </FormControl>
    </>
  );
}
export default React.memo(InputDateComponent);
