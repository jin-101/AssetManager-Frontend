import { Box } from "native-base";
import React from "react";
import InputTextComponent from "@components/InputTextComponent";

function AptCrudPage({ parentLoading }) {
  parentLoading(); //데이터 받아오고 함수호출 -> 부모에서 로딩처리
  return (
    <Box>
      <InputTextComponent></InputTextComponent>
    </Box>
  );
}

export default AptCrudPage;
