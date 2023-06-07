//제작중

import { Select } from "native-base";
import React from "react";

function SelectComponent({}) {
  return (
    <Select
      selectedValue={"service"}
      minWidth="200"
      accessibilityLabel="Choose Service"
      placeholder="Choose Service"
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
