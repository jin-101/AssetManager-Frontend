import { StyleSheet } from "react-native";

export const loginLayoutStyle = {
  container: {
    flex: 1,
  },
  header: {
    height: 50,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: 50,
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
