import * as React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function SideMenu01({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function SideMenu02({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function HomeScreen2() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function WalletScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Wallet!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen2} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "ios-list" : "ios-list-outline";
        } else if (route.name === "Wallet") {
          iconName = focused ? "wallet" : "wallet-outline";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen2} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
    <Tab.Screen name="Wallet" component={WalletScreen} />
  </Tab.Navigator>
);

const CustomDrawerContent = (props) => (
  <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
    <ScrollView>
      <TouchableOpacity onPress={() => props.navigation.navigate("SideMenu01")}>
        <Text>Side Menu 01</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("SideMenu02")}>
        <Text>Side Menu 02</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export default function DrawerNavi() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={TabScreen} />
        <Drawer.Screen name="SideMenu01" component={SideMenu01} />
        <Drawer.Screen name="SideMenu02" component={SideMenu02} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
