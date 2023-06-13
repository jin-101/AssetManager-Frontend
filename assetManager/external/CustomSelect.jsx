import React from "react";
import { Select } from "native-base";

const CustomSelect = React.forwardRef((props, ref) => {
  return (
    <Select {...props}>
      <Select.Input {...props} readOnly={"true"} />
    </Select>
  );
});

export default CustomSelect;
