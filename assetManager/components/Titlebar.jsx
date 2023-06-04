import React from "react";
import { StyleSheet, View } from "react-native";
import { Box, Text } from "native-base";

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
});
function Titlebar({ title }) {
  return (
    <View style={styles.header}>
      <Box bg="indigo.500" height="100%" justifyContent="center">
        <Text fontSize="4xl" color="white">
          {title}
        </Text>
      </Box>
    </View>
  );
}
export default Titlebar;
