import React, { useCallback } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Center, HStack, Icon, Text } from "native-base";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { pageUpdate } from "../action";
import { useNavigation } from "@react-navigation/native";
import { loginLayoutStyle } from "../styles";

const styles = StyleSheet.create(loginLayoutStyle);

function Footerbar() {
  const { pageState } = useSelector((state) => state.footerNav);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const footNaviAction = useCallback(
    (page) => {
      dispatch(pageUpdate(page));
    },
    [dispatch]
  );

  return (
    <View style={styles.footer}>
      <HStack h="100%" w={"100%"} alignItems="center" justifyContent="center">
        <Pressable
          cursor="pointer"
          opacity={pageState === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            footNaviAction(0);
            navigation.setOptions({ title: "홈" });
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={pageState === 0 ? "home" : "home-outline"}
                />
              }
              color="white"
              size="lg"
            />
            <Text style={styles.footerText}>홈</Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={pageState === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            footNaviAction(1);
            navigation.setOptions({ title: "검색" });
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialIcons name="search" />}
              color="white"
              size="lg"
            />
            <Text style={styles.footerText}>검색</Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={pageState === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => {
            footNaviAction(2);
            navigation.setOptions({ title: "자산" });
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={pageState === 2 ? "wallet" : "wallet-outline"}
                />
              }
              color="white"
              size="lg"
            />
            <Text style={styles.footerText}>자산</Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={pageState === 3 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => {
            footNaviAction(3);
            navigation.setOptions({ title: "통계" });
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={pageState === 3 ? "bar-chart" : "bar-chart-outline"}
                />
              }
              color="white"
              size="lg"
            />
            <Text style={styles.footerText}>통계</Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={pageState === 4 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            footNaviAction(4);
            navigation.setOptions({ title: "가계부" });
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={
                    pageState === 4 ? "book-account" : "book-account-outline"
                  }
                />
              }
              color="white"
              size="lg"
            />
            <Text style={styles.footerText}>가계부</Text>
          </Center>
        </Pressable>
      </HStack>
    </View>
  );
}
export default Footerbar;
