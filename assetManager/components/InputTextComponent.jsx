import React, { useCallback } from "react";
import { HStack, Text, FormControl } from "native-base";
import { TextInput, Alert } from "react-native";
import {
  alertText,
  inputPriceFormat,
  inputTagCommonStyle,
  keyBoardType,
  req,
} from "../utils";
import { useDispatch } from "react-redux";
import { formControlLableBasicStyle } from "../styles";

function InputTextComponent({
  name = "",
  id = "0",
  value = "",
  priceFormat = false,
  placeholder = "",
  dispatchF = undefined,
  parentSetState = undefined,
  title = "",
  helperText = "",
  inputType = "text",
  formControlProps = {},
  formControlLabelProps = {},
  textInputPropsForFront = {},
  textInputProps = {},
  formHelperTextProps = {},
  formControlStyle = {}, //native-base에 formControl 속성 모두 입력가능
  labelStyle = {}, // native-base에 formControl.label _text 속성 모두 입력가능
  textLabel = {}, // frontText, endText, frontTextSize, endTextSize
  inputStyle = {}, // style 속성 입력가능
  alertTitle = alertText.basic.title,
  alertContent = alertText.basic.content,
}) {
  console.log("InputTextComponent >>>");
  const dispatch = useDispatch();

  const isNumType = inputType === "number" || inputType === "double" || false;
  const keyboardType = keyBoardType(inputType);

  const onChangeText = useCallback((text) => {
    if (inputType === "number") {
      const format = req.num;
      if (
        (text.length > 0 && !format.test(text[text.length - 1])) ||
        (text.length === 1 && text === "0")
      ) {
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
    if (parentSetState) parentSetState(text, id, name);
    if (dispatchF) dispatch(dispatchF(text, id, name));
  }, []);

  return (
    <FormControl {...formControlStyle} {...formControlProps}>
      <Text
        style={{
          ...formControlLableBasicStyle.label,
          ...labelStyle,
        }}
        {...formControlLabelProps}
      >
        {title}
      </Text>

      <HStack alignItems="center" w="100%">
        {/* input 앞에 텍스트 삽입 */}
        {textLabel?.frontText && (
          <Text
            fontSize={textLabel?.frontTextSize || "lg"}
            {...textInputPropsForFront}
          >
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
          placeholderTextColor="lightgray"
          value={priceFormat ? inputPriceFormat(value) : value}
          onChangeText={onChangeText}
          {...textInputProps}
        />

        {/* input 뒤에 텍스트 삽입 */}
        {textLabel?.endText && (
          <Text fontSize={textLabel?.endTextSize || "lg"}>
            {textLabel?.endText}
          </Text>
        )}
      </HStack>

      {/* 부연설명 text */}
      <FormControl.HelperText {...formHelperTextProps}>
        {helperText}
      </FormControl.HelperText>
    </FormControl>
  );
}
export default React.memo(InputTextComponent);
