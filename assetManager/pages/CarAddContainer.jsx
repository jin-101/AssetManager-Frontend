import React, { useState } from "react";
import { Box } from "native-base";
import SelectComponent from "../components/SelectComponent";

function CarAddContainer(props) {
  const [carCompany, setCarCompany] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  return (
    <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
      <Box maxW="300">
        <SelectComponent />
        <SelectComponent />
        <SelectComponent />
      </Box>
    </Box>
  );
}

export default CarAddContainer;
