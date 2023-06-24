import React, { useState, useEffect } from "react";
import { apiPath } from "../../services";
import { useSelector } from "react-redux";
import { Box, Button, Center, HStack, Stack, Text } from "native-base";
import axios from "axios";
import { inputPriceFormat } from "../../utils";
import ContentScrollView from "@components/ContentScrollView";

const textListInfo = [
  { title: "은행", key: "bank" },
  { title: "상품명", key: "productName" },
  { title: "시작일", key: "startDate" },
  { title: "만기일", key: "endDate" },
  { title: "금액", key: "price", unit: "원", isPrice: true },
  { title: "이자율", key: "rate", unit: "%" },
];

function DepositUpdate(props) {
  const { token } = useSelector((state) => state.login);
  const [userDeposit, setUserDeposit] = useState([]);

  const onRemove = (index) => {
    console.log(userDeposit[index]);
    //detail code 보내서 삭제
    axios({
      url: `${apiPath}/deposit/depositDelete`,
      method: "DELETE",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        setUserDeposit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return "";
  };
  useEffect(() => {
    axios({
      url: `${apiPath}/deposit/depositUpdate`,
      method: "GET",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        setUserDeposit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userDeposit);
  return (
    <ContentScrollView>
      <Center mt={5} mb={5}>
        <Box w={"90%"}>
          {userDeposit?.map((el, index) => (
            <Stack key={index}>
              <Box
                bgColor={"white"}
                mt={index === 0 ? 2.5 : 5}
                mb={index === userDeposit?.length - 1 ? 5 : 2.5}
                padding={5}
                borderRadius={20}
              >
                {textListInfo?.map((li, idx) => (
                  <HStack key={idx}>
                    <Text fontSize={15} fontWeight={"semibold"}>
                      {li?.title + " : "}
                    </Text>
                    <Text fontSize={15}>
                      {li?.isPrice
                        ? inputPriceFormat(el[li?.key])
                        : el[li?.key]}
                      {li?.unit}
                    </Text>
                  </HStack>
                ))}
                <Center>
                  <Button
                    w={"40%"}
                    mt={5}
                    colorScheme={"danger"}
                    onPress={onRemove(index)}
                  >
                    삭제
                  </Button>
                </Center>
              </Box>
            </Stack>
          ))}
        </Box>
      </Center>
    </ContentScrollView>
  );
}

export default DepositUpdate;
