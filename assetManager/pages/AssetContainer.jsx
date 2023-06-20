import { FontAwesome } from "@expo/vector-icons";
import { Box, Button } from "native-base";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../external/Carousel";
import ContentScrollView from "@components/ContentScrollView";
import { StockCRUDpage } from "../views";
import AptCrudPage from "../views/crudPage/AptCrudPage";
import GoldCrudPage from "../views/crudPage/GoldCrudPage";

const entries = [
  { key: "1", title: "예/적금", naviPath: "depositCrud" },
  { key: "2", title: "부동산", naviPath: "" },
  { key: "3", title: "자동차", naviPath: "carCrud" },
  { key: "4", title: "금", naviPath: "" },
  { key: "5", title: "외환", naviPath: "" },
  { key: "6", title: "주식", naviPath: "stockCrud" },
  { key: "7", title: "코인", naviPath: "" },
  { key: "8", title: "부채1", naviPath: "" },
  { key: "9", title: "부채2", naviPath: "" },
  { key: "10", title: "부채3", naviPath: "" },
];

function AssetContainer() {
  const navigation = useNavigation();
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = Dimensions.get("window").width - 100;

  //press navigation
  const detailOnPress = (naviPath) => {
    navigation.navigate(naviPath);
  };

  const iconSelectFuntion = (key) => {
    switch (key) {
      case "1":
        return <FontAwesome name="money" size={30} color="black" />;
      case "2":
        return <FontAwesome name="money" size={30} color="black" />;
      case "3":
        return <FontAwesome name="money" size={30} color="black" />;
      case "4":
        return <FontAwesome name="money" size={30} color="black" />;
      case "5":
        return <FontAwesome name="money" size={30} color="black" />;
      case "6":
        return <FontAwesome name="money" size={30} color="black" />;
      case "7":
        return <FontAwesome name="money" size={30} color="black" />;
      case "8":
        return <FontAwesome name="money" size={30} color="black" />;
      case "9":
        return <FontAwesome name="money" size={30} color="black" />;
      case "10":
        return <FontAwesome name="money" size={30} color="black" />;

      default:
        break;
    }
  };

  const contentsFunction = (key) => {
    switch (key) {
      case "1":
        return (
          <View
            style={{
              width: "100%",
              height: 350,
              marginBottom: 10,
              backgroundColor: "white",
              borderWidth: 1,
            }}
          >
            <Box>
              <Text>예적금 관련 surmary</Text>
            </Box>
          </View>
        );
      case "2":
        return <AptCrudPage></AptCrudPage>;
      case "3":
        return (
          <View>
            <Box>
              <Text>자동차 관련 surmary</Text>
            </Box>
          </View>
        );
      case "4":
        return <GoldCrudPage/>
      case "5":
        return (
          <View>
            <Box>
              <Text>외환 관련 surmary</Text>
            </Box>
          </View>
        );
      case "6":
        return <StockCRUDpage />;
      case "7":
        return (
          <View>
            <Box>
              <Text>코인 관련 surmary</Text>
            </Box>
          </View>
        );
      case "8":
        return (
          <View>
            <Box>
              <Text>부채1 관련 surmary</Text>
            </Box>
          </View>
        );
      case "9":
        return (
          <View>
            <Box>
              <Text>부채2 관련 surmary</Text>
            </Box>
          </View>
        );
      case "10":
        return (
          <View>
            <Box>
              <Text>부채3 관련 surmary</Text>
            </Box>
          </View>
        );

      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <>
      <View style={{ backgroundColor: "lightgray" }}>
        <Box w={"100%"}>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Box
              w={70}
              h={70}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={35}
              bg={"yellow.100"}
            >
              {iconSelectFuntion(item.key)}
              <Text style={{ color: "black" }}>{item.title}</Text>
            </Box>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: "100%",
              backgroundColor: "skyblue",
              alignItems: "center",
            }}
          >
            {contentsFunction(item.key)}
          </View>
        </Box>
      </View>
    </>
  );
  return (
    <>
      <ContentScrollView>
        <Box h={"250"} bg={"amber.100"}>
          <Text fontSize="4xl">총자산 보여주는 곳</Text>
        </Box>
        <Carousel
          data={entries}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </ContentScrollView>
    </>
  );
}

export default AssetContainer;
