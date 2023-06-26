import { Box } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import { isAndroid } from "../utils";

function ContentScrollView({ children }) {
  return (
    <>
      <FlatList
        data={[{ key: "content" }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <>{children}</>}
      />
    </>
  );
}

export default ContentScrollView;
