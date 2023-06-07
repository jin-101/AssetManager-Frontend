import {
  Actionsheet,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
  useDisclose,
  Form,
  Picker,
} from "native-base";
import React from "react";

function SelectComponent(props) {
  //   return (
  //     <Center>
  //       <FormControl w="3/4" maxW="300" isRequired isInvalid>
  //         <FormControl.Label>Choose service</FormControl.Label>
  //         <Select
  //           minWidth="200"
  //           accessibilityLabel="Choose Service"
  //           placeholder="Choose Service"
  //           mt="1"
  //           variant="underlined"
  //         >
  //           <Select.Item label="UX Research" value="ux" />
  //           <Select.Item label="Web Development" value="web" />
  //           <Select.Item label="Cross Platform Development" value="cross" />
  //           <Select.Item label="UI Designing" value="ui" />
  //           <Select.Item label="Backend Development" value="backend" />
  //           <Select.Item label="UX Research" value="ux" />
  //           <Select.Item label="Web Development" value="web" />
  //           <Select.Item label="Cross Platform Development" value="cross" />
  //           <Select.Item label="UI Designing" value="ui" />
  //           <Select.Item label="Backend Development" value="backend" />
  //           <Select.Item label="UX Research" value="ux" />
  //           <Select.Item label="Web Development" value="web" />
  //           <Select.Item label="Cross Platform Development" value="cross" />
  //           <Select.Item label="UI Designing" value="ui" />
  //           <Select.Item label="Backend Development" value="backend" />
  //           <Select.Item label="UX Research" value="ux" />
  //           <Select.Item label="Web Development" value="web" />
  //           <Select.Item label="Cross Platform Development" value="cross" />
  //           <Select.Item label="UI Designing" value="ui" />
  //           <Select.Item label="Backend Development" value="backend" />
  //         </Select>
  //       </FormControl>
  //     </Center>
  //   );
  return (
    <Form>
      <Picker
        note
        mode="dropdown"
        style={{ width: 120 }}
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}
      >
        <Picker.Item label="Wallet" value="key0" />
        <Picker.Item label="ATM Card" value="key1" />
        <Picker.Item label="Debit Card" value="key2" />
        <Picker.Item label="Credit Card" value="key3" />
        <Picker.Item label="Net Banking" value="key4" />
      </Picker>
    </Form>
  );
}

export default SelectComponent;
