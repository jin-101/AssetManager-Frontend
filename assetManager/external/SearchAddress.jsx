import React, { useState } from "react";
import Postcode from "@actbase/react-daum-postcode";
import { Modal } from "react-native";
import { Button } from "native-base";

const SearchAddress = ({ btnStyle, dispatchF, parentState }) => {
  const [isModal, setModal] = useState(false);
  const onPress = () => {
    setModal(true);
  };
  return (
    <>
      {isModal && (
        <Modal>
          <Postcode
            style={{ width: "100%", height: "100%" }}
            jsOptions={{ animation: true, hideMapBtn: true }}
            onSelected={(data) => {
              const { address, zonecode } = data;
              console.log(data);
              if (parentState) parentState(address);
              setModal(false);
            }}
          />
        </Modal>
      )}
      <Button {...btnStyle} onPress={onPress}>
        {"주소검색"}
      </Button>
    </>
  );
};
export default SearchAddress;
