import React, { useCallback } from "react";
import { FormControl, HStack, Text } from "native-base";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
function InputRadioComponent({
  name,
  id,
  value,
  dispatchF,
  parentSetState,
  title,
  list,
  formControlStyle,
  labelStyle,
  inputStyle,
}) {
  console.log("InputRadioComponent >>>", "index", id, " value", value);
  const dispatch = useDispatch();

  const onChange = useCallback((newValue) => {
    if (parentSetState) parentSetState(newValue);
    if (dispatchF) dispatch(dispatchF(id, name, newValue));
  }, []);

  return (
    <FormControl isDisabled {...formControlStyle}>
      <FormControl.Label
        w="40%"
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
      <RadioButton.Group onValueChange={onChange} value={value}>
        <HStack {...inputStyle}>
          {list.map((el, index) => (
            <HStack key={index} {...el.liStyle}>
              <Text>{el.text}</Text>
              <RadioButton value={el.value} />
            </HStack>
          ))}
        </HStack>
      </RadioButton.Group>
    </FormControl>
  );
}
export default React.memo(InputRadioComponent);
