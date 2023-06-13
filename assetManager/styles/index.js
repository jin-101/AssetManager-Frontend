import { StyleSheet } from "react-native";

export const modalBg = {
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
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
