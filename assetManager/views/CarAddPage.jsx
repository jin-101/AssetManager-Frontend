import React from "react";
import { ScrollView, VStack } from "native-base";
import CarSearchContainer from "../pages/CarSearchContainer";
import CarAddContainer from "../pages/CarAddContainer";

function CarAddPage(props) {
  return (
    <ScrollView>
      <VStack alignItems="center" mt="5" mb="5">
        <CarSearchContainer />
        <CarAddContainer />
      </VStack>
    </ScrollView>
  );
}
export default CarAddPage;
