//제작중
import { Select } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

function SelectComponent({
  placeholder = "",
  color,
  placeholderTextColor,
  defaultValue = "",
  isDisabled = false,
  isHovered = false,
  isFocused = false,
  isFocusVisible = false,
  dropdownIcon = undefined,
  dropdownOpenIcon = undefined,
  dropdownCloseIcon = undefined,
  variant = "outline",
  onOpen = () => {},
  onClose = () => {},
}) {
  return (
    <Select
      selectedValue={"service"}
      minWidth="200"
      accessibilityLabel="Choos"
      placeholder={placeholder}
      color={color}
      placeholderTextColor={placeholderTextColor}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      isHovered={isHovered}
      isFocused={isFocused}
      isFocusVisible={isFocusVisible}
      dropdownIcon={dropdownIcon}
      dropdownOpenIcon={dropdownOpenIcon}
      dropdownCloseIcon={dropdownCloseIcon}
      variant={variant}
      onOpen={opOpen}
      onClose={onClose}
      mt={1}
      onValueChange={(itemValue) => {}}
    >
      <Select.Item label="UX Research" value="ux" />
      <Select.Item label="Web Development" value="web" />
      <Select.Item label="Cross Platform Development" value="cross" />
      <Select.Item label="UI Designing" value="ui" />
      <Select.Item label="Backend Development" value="backend" />
    </Select>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});
export default SelectComponent;
