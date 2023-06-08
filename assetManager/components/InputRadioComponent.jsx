import React, { useCallback } from "react";
import { FormControl, HStack, Text } from "native-base";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
function InputRadioComponent({
  name = "",
  id = "0",
  value = "",
  dispatchF = undefined,
  parentSetState = undefined,
  title = "",
  radioButtonList = [], // 구조 -> [{text : "", value:"", liStyle:{ HStack 속성적용 }, RadioButtonLabelProps:{ Text 속성적용 }, RadioButtonItemProps:{ RadioButton 속성적용}}]
  formControlProps = {}, // FormControl 속성적용
  formControlLabelProps = {}, //FormControl.Label 속성적용
  labelStyle = {}, // style 속성적용
  radioButtonGroupProps = {}, //RadioButton.Group 속성적용
  inputStyle = {}, //HStack 속성적용
}) {
  console.log("InputRadioComponent >>>", "index", id, " value", value);
  const dispatch = useDispatch();

  const onChange = useCallback((newValue) => {
    if (parentSetState) parentSetState(newValue);
    if (dispatchF) dispatch(dispatchF(id, name, newValue));
  }, []);

  return (
    <FormControl isDisabled {...formControlProps}>
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
        {...formControlLabelProps}
      >
        {title}
      </FormControl.Label>
      <RadioButton.Group
        onValueChange={onChange}
        value={value}
        {...radioButtonGroupProps}
      >
        <HStack {...inputStyle}>
          {radioButtonList.map((el, index) => (
            <HStack key={index} {...el.liStyle}>
              <Text {...el.RadioButtonLabelProps}>{el.text}</Text>
              <RadioButton value={el.value} {...el.RadioButtonItemProps} />
            </HStack>
          ))}
        </HStack>
      </RadioButton.Group>
    </FormControl>
  );
}
export default React.memo(InputRadioComponent);
