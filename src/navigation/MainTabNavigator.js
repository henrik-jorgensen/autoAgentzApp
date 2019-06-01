import React from "react";
import { Platform, Dimensions, StyleSheet, Text } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Icon } from "native-base";

import Store from "../redux/store";
import { IsIphoneX, IsIphoneXsMax } from "../components/common";

import LikedScreen from "../screens/LikedScreen";
import NopeScreen from "../screens/NopeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewVehiclesScreen from "../screens/NewVehiclesScreen";

const { store } = Store();

const NewVehiclesStack = createStackNavigator({
  newVehicles: NewVehiclesScreen
});

const LikedStack = createStackNavigator({
  liked: LikedScreen
});

const NopeStack = createStackNavigator({
  nope: NopeScreen
});

const SettingsStack = createStackNavigator({
  settings: SettingsScreen
});

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 55,
    borderTopColor: "#2b2b2b",
    marginBottom: 3
  },
  tabBarStyleX: {
    borderTopColor: "#2b2b2b",
    marginBottom: -36,
    height: 55
  },
  tabBarStyleXsMax: {
    height: 60,
    borderTopColor: "#2b2b2b",
    marginBottom: -36
  }
});

const TAB_BAR_STYLE = () => {
  if (Platform.OS === "ios" && IsIphoneX()) {
    return styles.tabBarStyleX;
  } else if (Platform.OS === "ios" && IsIphoneXsMax()) {
    return styles.tabBarStyleXsMax;
  } else {
    return styles.tabBarStyle;
  }
};

const MainTabNavigator = createBottomTabNavigator(
  {
    newVehicles: NewVehiclesScreen,
    liked: LikedScreen,
    nope: NopeScreen,
    settings: SettingsScreen
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff", //"#007aff",
      inactiveTintColor: "grey",
      labelStyle: { fontSize: 12 },
      activeBackgroundColor: "#2b2b2b",
      inactiveBackgroundColor: "#2b2b2b",
      style: TAB_BAR_STYLE()
    },
    lazy: false
  }
);

const AppContainer = createAppContainer(MainTabNavigator);

export default AppContainer;
