import React from "react";
import { FlatList } from "react-native";

function ContentScrollView({ children, flatListRef }) {
  return (
    <>
      <FlatList
        ref={flatListRef}
        data={[{ key: "content" }]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <>{children}</>}
      />
    </>
  );
}

export default ContentScrollView;
