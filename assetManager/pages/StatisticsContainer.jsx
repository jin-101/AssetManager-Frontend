import React, { useState, useEffect } from "react";
import { apiPath } from "../services";
import { Text } from "native-base";
import { useSelector } from "react-redux";
import ContentScrollView from "@components/ContentScrollView";
import axios from "axios";
import Loading from "../components/Loading";

function StatisticsContainer() {
  const { token } = useSelector((state) => state.login);
  const [totalAsset, setTotalAsset] = useState("0");
  const [fiInd, setFiInd] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(fiInd);

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: `${apiPath}/getFiInd`,
      method: "GET",
      params: {
        userId: token,
        //totalAsset: totalAsset,
      },
    })
      .then((res) => {
        //console.log("거주주택마련부채부담지표 " + res.data.mortgageLoanBurdenInd);
        const result = res.data;
        setFiInd(result);
        setTotalAsset(result.totalAsset);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <ContentScrollView>
      <Text>{"총자산 " + totalAsset}</Text>
      <Text>{"가계수지지표 " + fiInd.householdInd}</Text>
      <Text>{"총부채상환지표 " + fiInd.totalDebtRepaymentInd}</Text>
      <Text>{"소비생활부채상환지표 " + fiInd.consumeDebtRepaymentInd}</Text>
      <Text>
        {"거주주택마련부채상환지표 " + fiInd.mortgageLoanRepaymentInd}
      </Text>
      <Text>{"총부채부담지표 " + fiInd.totalDebtBurdenInd}</Text>
      <Text>{"거주주택마련부채부담지표 " + fiInd.mortgageLoanBurdenInd}</Text>
      <Text>{"금융투자성향지표 " + fiInd.fiInvestInd}</Text>
      <Text>{"금융자산비중지표 " + fiInd.fiAssetInd}</Text>
    </ContentScrollView>
  );
}

export default StatisticsContainer;
