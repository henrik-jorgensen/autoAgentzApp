import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";

import AuthHomeScreen from "../screens/auth/AuthHomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import AcceptTermsScreen from "../screens/newUser/AcceptTermsScreen";
import TermsScreen from "../screens/newUser/TermsScreen";
import PrivacyPolicyScreen from "../screens/newUser/PrivacyPolicyScreen";
import NameScreen from "../screens/newUser/NameScreen";
import CompanyScreen from "../screens/newUser/CompanyScreen";
import EmailScreen from "../screens/newUser/EmailScreen";
import WebsiteScreen from "../screens/newUser/WebsiteScreen";
import WelcomeScreen from "../screens/newUser/WelcomeScreen";

const RootNavigator = createStackNavigator(
  {
    authHome: AuthHomeScreen,
    login: LoginScreen,
    terms: AcceptTermsScreen,
    name: NameScreen,
    company: CompanyScreen,
    email: EmailScreen,
    website: WebsiteScreen,
    welcome: WelcomeScreen,
    showTerms: TermsScreen,
    privacyPolicy: PrivacyPolicyScreen,
    main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "authHome",
    lazy: true
  }
);

const RootAppContainer = createAppContainer(RootNavigator);

export default RootAppContainer;
