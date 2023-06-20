import { Box, Text } from "native-base";
import React from "react";
import { View } from "react-native";

function DepositCrudPage(props) {
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
}

export default DepositCrudPage;
