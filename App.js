import * as Expo from "expo";
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  StatusBar
} from "react-native";
import axios from "axios";
import { AppLoading, Asset } from "expo";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Store from "./src/redux/store";
import RootNavigator from "./src/navigation/RootNavigator";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import ApiKeys from "./constants/ApiKeys";
import URLs from "./constants/URLs";

TextInput.defaultProps.selectionColor = "#fff"; // sets default textInput "cursor" color

const { persistor, store } = Store();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isAuthenticationReady: false,
    isAuthenticated: false
  };

  constructor(props) {
    super(props);

    // Initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    // listen to current AuthState
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  async componentDidMount() {
    // if there is a token in AsyncStorage, sign user in with token
    let token = await AsyncStorage.getItem("sms_token");
    let uid = await AsyncStorage.getItem("uid");

    if (token && uid) {
      try {
        await axios.post(URLs.logSignIn, {
          uid: uid,
          accountSid: ApiKeys.CloudFunctions.accountSid,
          authToken: ApiKeys.CloudFunctions.authToken
        });
        await firebase.auth().signInWithCustomToken(token);
      } catch (error) {
        console.log(error);
      }
    }
  }

  onAuthStateChanged = user => {
    // update state depending on user is logged in or not
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  };

  handleNavigation = () => {
    if (!this.state.isAuthenticated) {
      return <RootNavigator />;
    } else {
      return <MainTabNavigator />;
    }
  };

  render() {
    if (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onError={console.warn}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView
            style={styles.container}
            forceInset={{ bottom: "never" }}
          >
            <StatusBar backgroundColor="#333" barStyle="light-content" />
            {this.handleNavigation()}
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }

  _cacheResourcesAsync = async () => {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      OpenSans_bold: require("./assets/fonts/OpenSans-Bold.ttf"),
      OpenSans_regular: require("./assets/fonts/OpenSans-Regular.ttf"),
      OpenSans_light: require("./assets/fonts/OpenSans-Light.ttf"),
      OpenSans_semiBold: require("./assets/fonts/OpenSans-SemiBold.ttf")
    });

    const images = [
      require("./assets/vehicleCard.png"),
      require("./assets/LogoHorizontalWhite.png"),
      require("./assets/dk_flag.png"),
      require("./assets/swipeLeftIcon.png"),
      require("./assets/swipeRightIcon.png"),
      require("./assets/1.jpg"),
      require("./assets/2.jpg"),
      require("./assets/3.jpg"),
      require("./assets/4.jpg"),
      require("./assets/5.jpg")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    justifyContent: "center"
  }
});
