import React from "react";
import { VStack } from "native-base";
import CarSearchContainer from "../pages/CarSearchContainer";
import CarAddContainer from "../pages/CarAddContainer";

function CarAddPage(props) {
  return (
    <VStack alignItems="center">
      <CarSearchContainer />
      <CarAddContainer />
    </VStack>
  );
}
export default CarAddPage;
