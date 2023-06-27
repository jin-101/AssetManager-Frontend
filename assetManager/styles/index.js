import { StyleSheet, Dimensions } from "react-native";
import { isAndroid } from "../utils";

export const { width: windowWidth, height: windowHeight } =
  Dimensions.get("window");
// export const footerHeight = isAndroid
//   ? windowHeight * 0.1
//   : windowHeight * 0.15;

export const footerHeight = windowHeight * 0.1;

export const modalBg = {
  ...StyleSheet.absoluteFillObject,
  position: "absolute",
  width: windowWidth,
  height: windowHeight,
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: footerHeight,
    backgroundColor: "#4f69c6",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerText: {
    fontSize: 20,
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

export const leftPaperButton = {
  mode: "contained",
  style: { width: "30%" },
};

export const rightPaperButton = {
  mode: "outlined",
  buttonColor: "#F8F8FF",
  style: { width: "30%" },
};

export const rightPaperButtonNoWidth = {
  mode: "outlined",
  buttonColor: "#F8F8FF",
};

export const boxStyle = StyleSheet.create({
  backgroundColor: "#ECEEFF",
  width: "90%",
  p: "5",
  borderRadius: "2xl",
});

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
