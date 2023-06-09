import { FormControl, HStack, Select, VStack } from "native-base";
import React, { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { formControlLableBasicStyle } from "../styles";

function SelectComponent({
  isVertical = true,
  formControlProps = {}, //{FormControl 속성}
  formControlLabelProps = {}, // {Text 속성}
  formControlHelperProps = {}, // {FormControl.HelperText 속성}
  selectProps = {}, //placeholder = "", color,placeholderTextColor,defaultValue = "",isDisabled = false, isHovered = false,isFocused = false,isFocusVisible = false,dropdownIcon = undefined,dropdownOpenIcon = undefined,dropdownCloseIcon = undefined,variant = "outline", onOpen = () => {}, onClose = () => {},
  selectItem = [], // 선택 item
  selectItemStyle = {}, // 선택 item들의 공통스타일
}) {
  const { text: formControlLabelText = "", ...formControlLabelStyleProps } =
    useMemo(() => formControlLabelProps);
  const { text: FormControlHelperText = "", ...FormControlHelperStyleProps } =
    useMemo(() => formControlHelperProps);

  const titleLable = useCallback(() => {
    return (
      <Text
        style={formControlLableBasicStyle.label}
        {...formControlLabelStyleProps}
      >
        {formControlLabelText}
      </Text>
    );
  }, []);

  const selector = useCallback((isVertical) => {
    return (
      <Select placeholder="선택해주세요." {...selectProps}>
        {selectItem.map((el, index) => (
          <Select.Item key={index} {...el} style={{ ...selectItemStyle }} />
        ))}
      </Select>
    );
  }, []);

  return (
    <FormControl
      bg="coolGray.700"
      maxW="100%"
      {...formControlProps}
      style={{ width: "100%" }}
    >
      {isVertical ? (
        <VStack
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
            }}
          >
            {titleLable()}
            {selector(true)}
          </View>
        </VStack>
      ) : (
        <View style={{ width: "100%" }}>
          <HStack>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
              }}
            >
              {titleLable()}
            </View>
            <View
              style={{
                width: "70%",
              }}
            >
              {selector(false)}
            </View>
          </HStack>
        </View>
      )}
      <FormControl.HelperText {...FormControlHelperStyleProps}>
        {FormControlHelperText}
      </FormControl.HelperText>
    </FormControl>
  );
}

export default SelectComponent;
