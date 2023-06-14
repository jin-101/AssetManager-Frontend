import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const modalBg = {
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
    height: "80%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: "10%",
    backgroundColor: "#4f69c6",
    justifyContent: "center",
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
};

export const formControlLableBasicStyle = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
