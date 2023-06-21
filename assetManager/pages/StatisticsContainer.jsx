import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { Text } from "native-base";
import { useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";

function StatisticsContainer() {
  const { token } = useSelector((state) => state.login);
  const [totalAsset, setTotalAsset] = useState("0");
  useEffect(() => {
    axios({
      url: `${apiPath}/user/getTotalAsset`,
      method: "GET",
      params: {
        userId: token,
      },
    }).then((res) => {
      setTotalAsset(res.data);
    });
  }, []);
  return (
    <ContentScrollView>
      <Text>{totalAsset}</Text>
    </ContentScrollView>
  );
}

export default StatisticsContainer;
