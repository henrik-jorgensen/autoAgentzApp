import React from "react";
import { Platform, Dimensions, StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Icon } from "native-base";
import { IsIphoneX, IsIphoneXsMax } from "../components/common";

import LikedScreen from "../screens/LikedScreen";
import NopeScreen from "../screens/NopeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewVehiclesScreen from "../screens/NewVehiclesScreen";

const NewVehiclesStack = createStackNavigator({
  newVehicles: NewVehiclesScreen
});

NewVehiclesStack.navigationOptions = {
  tabBarLabel: "New Vehicles",
  tabBarIcon: ({ tintColor }) => (
    <Icon
      ios="ios-car"
      android="md-car"
      style={{ color: tintColor, fontSize: 30 }}
    />
  )
};

const LikedStack = createStackNavigator({
  liked: LikedScreen
});

LikedStack.navigationOptions = {
  tabBarLabel: "Like",
  tabBarIcon: ({ tintColor }) => (
    <Icon
      ios="ios-thumbs-up"
      android="md-thumbs-up"
      style={{ color: tintColor, fontSize: 30 }}
    />
  )
};

const NopeStack = createStackNavigator({
  nope: NopeScreen
});

NopeStack.navigationOptions = {
  tabBarLabel: "Nope",
  tabBarIcon: ({ tintColor }) => (
    <Icon
      ios="ios-thumbs-down"
      android="md-thumbs-down"
      style={{ color: tintColor, fontSize: 30 }}
    />
  )
};

const SettingsStack = createStackNavigator({
  settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "More",
  tabBarIcon: ({ tintColor }) => (
    <Icon
      ios="ios-menu"
      android="md-menu"
      style={{ color: tintColor, fontSize: 30 }}
    />
  )
};

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
    borderTopColor: "#2b2b2b"
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
    NewVehiclesStack,
    LikedStack,
    NopeStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff", //"#007aff",
      inactiveTintColor: "grey",
      labelStyle: { fontSize: 12 },
      activeBackgroundColor: "#2b2b2b",
      inactiveBackgroundColor: "#2b2b2b",
      style: TAB_BAR_STYLE()
    }
  }
);

const AppContainer = createAppContainer(MainTabNavigator);

export default AppContainer;
