import React, { useCallback } from "react";
import { HStack, Text, FormControl } from "native-base";
import { TextInput, Alert } from "react-native";
import { inputTagCommonStyle } from "../utils";
import { useDispatch } from "react-redux";

const keyBoardType = (type) => {
  let keyboard;
  switch (type) {
    case "number":
      keyboard = "numeric";
      break;
    case "double":
      keyboard = "decimal-pad";
      break;
    case "email":
      keyboard = "email-address";
      break;
    case "pad":
      keyboard = "phone-pad";
      break;
    case "url":
      keyboard = "url";
      break;
    default:
      keyboard = "default";
      break;
  }
  return keyboard;
};

function InputTextComponent({
  name,
  id,
  value,
  placeholder = "",
  dispatchF,
  parentSetState,
  title = "",
  helperText = "",
  inputType = "text",
  formControlStyle = {}, //native-base에 formControl 속성 모두 입력가능
  labelStyle = {}, // native-base에 formControl.label _text 속성 모두 입력가능
  textLabel, // frontText, endText, frontTextSize, endTextSize
  inputStyle = {}, // style 속성 입력가능
  alertTitle = "주의",
  alertContent = "올바른 값을 입력해주세요.",
}) {
  console.log("InputTextComponent >>>");
  const dispatch = useDispatch();

  const isNumType = inputType === "number" || inputType === "double" || false;
  const keyboardType = keyBoardType(inputType);

  const onChangeText = useCallback((text) => {
    if (inputType === "number") {
      const format = /^[1-9]/;
      if (text.length > 0 && !format.test(text)) {
        Alert.alert(alertTitle, alertContent);
        return;
      }
    } else if (inputType === "double") {
      const commaLen = text.replaceAll(/[0-9]/gi, "").length;
      const format = /^[.]{1}|^.*-.*|^.*,.*/;
      if (commaLen > 1 || (text.length > 0 && format.test(text))) {
        Alert.alert(alertTitle, alertContent);
        return;
      }
    }
    if (parentSetState) parentSetState(text);
    if (dispatchF) dispatch(dispatchF(id, name, text));
  }, []);

  return (
    <FormControl isDisabled {...formControlStyle}>
      {/* Label */}
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

      <HStack alignItems="center">
        {/* input 앞에 텍스트 삽입 */}
        {textLabel?.frontText && (
          <Text fontSize={textLabel?.frontTextSize || "lg"}>
            {textLabel?.frontText}
          </Text>
        )}

        <TextInput
          keyboardType={keyboardType}
          style={{
            ...inputTagCommonStyle,
            marginLeft: textLabel?.frontText ? 10 : 0,
            marginRight: textLabel?.endText ? 10 : 0,
            textAlign: isNumType ? "right" : "left",
            paddingLeft: isNumType ? 0 : 10,
            paddingRight: isNumType ? 10 : 0,
            ...inputStyle,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />

        {/* input 뒤에 텍스트 삽입 */}
        {textLabel?.endText && (
          <Text fontSize={textLabel?.endTextSize || "lg"}>
            {textLabel?.endText}
          </Text>
        )}
      </HStack>

      {/* 부연설명 text */}
      <FormControl.HelperText>{helperText}</FormControl.HelperText>
    </FormControl>
  );
}

export default React.memo(InputTextComponent);
