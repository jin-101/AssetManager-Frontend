import { StyleSheet, Dimensions } from "react-native";
import { isAndroid } from "../utils";
import { Text } from "react-native";

const { width, height } = Dimensions.get("window");

export const modalBg = {
  ...StyleSheet.absoluteFillObject,
  position: "absolute",
  width: width,
  height: height,
  top: 0,
  backgroundColor: "gray",
  opacity: 0.5,
};

export const loginLayoutStyle = {
  container: {
    flex: 1,
  },
  content: {
    marginTop: 100,
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: isAndroid ? "10%" : "15%",
    backgroundColor: "#4f69c6",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerText: {
    fontSize: 15,
    color: "white",
  },
};

//custom styles
export const commonHeaderStyle = {
  headerStyle: {
    backgroundColor: "#4f69c6",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  // headerLeft: () => (
  //   <Text style={{ marginLeft: 10 }}>{"    "}</Text> // 여백 추가
  // ),
};

export const btnStyle = StyleSheet.create({
  variant: "outline",
  backgroundColor: "white",
  colorScheme: "gray",
  borderColor: "#d3d3d3", // 기존 - borderColor: "gray.400" / #e6e6fa / 현재 - #d3d3d3 (lightgray)
  borderRadius: 10,
  width: "42.5%",
  height: "50",
});
export const btnTextStyle = StyleSheet.create({
  color: "gray.900",
  fontWeight: "semibold",
  fontSize: 16,
});
export const btnPressStyle = StyleSheet.create({
  bg: "gray.200",
  borderColor: "white",
});

export const formControlLableBasicStyle = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: "black",
    fontSize: 18,
    fontWeight: "normal",
  },
});
