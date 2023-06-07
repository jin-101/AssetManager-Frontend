//제작중

import { Select } from "native-base";
import React from "react";

function SelectComponent({ selectProps = {}, selectItemProps = [] }) {
  return (
    <Select {...selectProps}>
      {selectItemProps.map((el, i) => (
        <Select.Item key={i} {...el} />
      ))}
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
