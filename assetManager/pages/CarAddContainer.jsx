import React, { useState } from "react";
import { Box } from "native-base";
import SelectComponent from "../components/SelectComponent";
import { useEffect } from "react";

function CarAddContainer(props) {
  const [carCompany, setCarCompany] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  useEffect(() => {
    axios({
      url: apiPath + "/car/companyList.do",
      method: "GET",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "//");
      });
  }, []);

  return (
    <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
      <Box w="100%" bg="amber.100">
        <SelectComponent
          isVertical={true}
          formControlProps={{}}
          formControlLabelProps={{
            text: "제조사 조회",
            fontWeight: 700,
            color: "black",
          }}
          FormControlHelperProps={{}}
          selectProps={{}}
          selectItem={[]}
          selectItemStyle={{}}
        />
        {/* <SelectComponent
          formControlProps={{}}
          formControlLabelProps={{
            text: "제목",
            fontWeight: 700,
            color: "black",
          }}
          FormControlHelperProps={{}}
          selectProps={{}}
          selectItem={[]}
          selectItemStyle={{}}
        /> */}
        {/* <SelectComponent
          formControlProps={{}}
          formControlLabelProps={{
            text: "제목",
            fontWeight: 700,
            color: "black",
          }}
          FormControlHelperProps={{}}
          selectProps={{}}
          selectItem={[]}
          selectItemStyle={{}}
        /> */}
      </Box>
    </Box>
  );
}

export default CarAddContainer;
