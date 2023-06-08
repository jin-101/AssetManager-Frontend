import React, { useState } from "react";
import { Box, Select } from "native-base";

function CarAddContainer(props) {
  const [carCompany, setCarCompany] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  return (
    <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
      <Box maxW="300">
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
      </Box>
    </Box>
  );
}

export default CarAddContainer;
