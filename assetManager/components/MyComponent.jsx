import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showButtonClick = () => {
    setIsVisible(true);
  };
  const hideButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Show Box" onPress={showButtonClick} />
      <Button title="Hide Box" onPress={hideButtonClick} />
      {isVisible && <View style={styles.box} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});

export default MyComponent;
