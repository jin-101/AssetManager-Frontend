import { Text, View } from "native-base";
import React, { useState } from "react";
import Loading from "../components/Loading";

function GuestPage(props) {
  const [isLoading, useIsLoading] = useState(true);
  console.log(isLoading);
  if (isLoading) return <Loading />;
  return (
    <View>
      <Text>메렁메렁메렁</Text>
    </View>
  );
}

export default GuestPage;
