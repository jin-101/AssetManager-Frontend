import { View } from "native-base";
import React from "react";
import UserName from "../pages/loginContainer/UserName";
import PhoneNumber from "../pages/loginContainer/PhoneNumber";

function SearchIdPage(props) {
  return (
    <View justifyContent="center" alignItems="center" mt="5">
      <View w="90%">
        <UserName />
        <PhoneNumber />
      </View>
    </View>
  );
}

export default SearchIdPage;
