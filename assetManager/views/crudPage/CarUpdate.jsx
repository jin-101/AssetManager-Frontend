import React, { useEffect } from "react";
import { apiPath } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Center, HStack, Stack, Text } from "native-base";
import axios from "axios";
import { inputPriceFormat } from "../../utils";
import ContentScrollView from "@components/ContentScrollView";
import { userCarUpdate } from "../../action";

const textListInfo = [
  { title: "제조사", key: "company" },
  { title: "모델명", key: "model" },
  { title: "연식", key: "year", unit: "년식" },
  { title: "현재 예상가격", key: "price", unit: "원", isPrice: true },
];
function CarUpdate(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { userCar } = useSelector((state) => state.userCar);

  const onRemove = (index) => {
    //detail code 보내서 삭제
    axios({
      url: `${apiPath}/car/carDelete`,
      method: "DELETE",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        setUserSavings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return "";
  };

  useEffect(() => {
    axios({
      url: `${apiPath}/car/carCrud`,
      method: "GET",
      params: {
        userId: token,
      },
    }) //id 넘겨줘야됨
      .then((res) => {
        dispatch(userCarUpdate(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ContentScrollView>
      <Center mt={5} mb={5}>
        <Box w={"90%"}>
          {userCar?.map((el, index) => (
            <Stack key={index}>
              <Box
                bgColor={"white"}
                mt={index === 0 ? 2.5 : 5}
                mb={index === userCar?.length - 1 ? 5 : 2.5}
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
                    mt={5}
                    w={"60%"}
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

export default CarUpdate;
