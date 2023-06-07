import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Hook from "./TestHook";

const style = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column",
    //justifyContent: "space-between",
    alignItems: "stretch",
    justifyContent: "center",
  },
});

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>안녕하세요 HomeScreen 테스터입니다.</Text>
      <Button
        title="프로필 페이지로 이동"
        onPress={() =>
          navigation.navigate("Profile", {
            //itemId: 78,
            otherParam: "anything",
          })
        }
      ></Button>
      <Button
        title="Hook을 이용하는 방법"
        onPress={() => navigation.navigate("Hook")}
      ></Button>
    </View>
  );
}

function ProfileScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params; // const otherParam = route.params.otherParam; 와 같다

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>안녕하세요 ProfileScreen 테스터입니다.</Text>

      <Text>itemId : {JSON.stringify(itemId)}</Text>
      <Text>otherParam : {JSON.stringify(otherParam)}</Text>
      <Text>otherParam : {otherParam}</Text>

      <Button
        title="프로필 페이지로 이동"
        onPress={() => navigation.push("Profile")}
      ></Button>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

class FlexPractice extends Component {
  render() {
    return (
      <SafeAreaView style={style.container}>
        {/* <View style={{ flex: 1, backgroundColor: "red" }}></View>
        <View style={{ flex: 2, backgroundColor: "skyblue" }}></View>
        <View style={{ flex: 3, backgroundColor: "yellow" }}></View> */}
        <View style={{ width: 50, height: 50, backgroundColor: "red" }}></View>
        <View
          style={{ width: 50, height: 50, backgroundColor: "orange" }}
        ></View>
        <View style={{ height: 50, backgroundColor: "yellow" }}></View>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home Page" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: "Profile Page" }}
              initialParams={{ itemId: 10000 }}
            />

            <Stack.Screen
              name="Hook"
              component={Hook}
              options={{ title: "Hook Page" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

export default FlexPractice;
