import axios from "axios";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  AsyncStorage,
  Dimensions,
  Alert,
  NetInfo
} from "react-native";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { Localization } from "expo-localization";
import { Icon } from "native-base";

import * as actions from "../redux/actions";
import URLs from "../../constants/URLs";
import ApiKeys from "../../constants/ApiKeys";
import { Spinner } from "../components/common";
import Swipe from "../components/Swipe";
import VehicleCard from "../components/common/VehicleCard";
import VehicleCardDemo from "../components/common/VehicleCardDemo";
import Welcome from "../components/common/Welcome";
import CardHelp from "../components/common/CardHelp";
import { Translations } from "../components/common/Translations";

import { Vehicles } from "../../assets/data/vehicles";
import { VehiclesDA } from "../../assets/data/vehiclesDA";
import { VehiclesDE } from "../../assets/data/vehiclesDE";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class NewVehiclesScreen extends Component {
  constructor(props) {
    super(props);
    if (!this.props.language) {
      // Get device language and remove region identifier (the '-' and everything following)
      const deviceLocale = Localization.locale.split("-")[0];
      console.log("Device language: ", deviceLocale);

      // Set device language as user's preferred language in redux state
      this.props.setLanguage(deviceLocale);

      // get content strings in correct language
      this.handleStrings(deviceLocale);
    } else {
      // get content strings in correct language
      this.handleStrings(this.props.language);
    }
  }

  state = {
    loading: false,
    resetting: false,
    submittingLikes: false,
    customer: false,
    strings: {}
  };

  static navigationOptions = ({ navigation }) => {
    const tabBarLabel =
      navigation.state.params && navigation.state.params.tabBarLabel
        ? navigation.state.params.tabBarLabel
        : "New Vehicles";

    return {
      header: null,
      tabBarLabel: tabBarLabel,
      tabBarIcon: ({ tintColor }) => (
        <Icon
          ios="ios-car"
          android="md-car"
          style={{ color: tintColor, fontSize: 30 }}
        />
      )
    };
  };

  async componentDidMount() {
    // update tabBarLabel language if changed
    this.translateTabBarLabel();

    // get uid from AsyncStorage and save it to redux state
    let uid = await AsyncStorage.getItem("uid");
    this.props.saveUidToState(uid);

    // register device for push notifications
    this.registerForPushNotificationsAsync(uid);

    // check if user is registered as a customer
    this.checkIfCustomer();

    // check if device is connected to the internet
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleStrings = language => {
    // get strings in correct language
    const strings = Translations(language);

    // Save content strings to redux state
    this.props.saveStringsToState(strings);
  };

  translateTabBarLabel = () => {
    // get react-navigation's setParams function from props
    const {
      navigation: { setParams }
    } = this.props;

    // update react-navigation tabBarLabel params dynamically from redux store
    setParams({
      tabBarLabel: this.props.strings.mainTabNavigator.newVehicles
    });
  };

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.setIsConnected();
    } else {
      this.props.setIsNotConnected();
    }
  };

  registerForPushNotificationsAsync = async uid => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to Firebase so we can use it to send push notifications from there
    await axios.post(URLs.addPushToken, {
      uid: this.props.uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken,
      expoPushToken: token
    });
  };

  handleDemoData = () => {
    if (this.props.language === "da") {
      return VehiclesDA;
    }
    if (this.props.language === "de") {
      return VehiclesDE;
    }
    return Vehicles;
  };

  renderScreen = () => {
    const strings = this.props.strings.newVehicles;

    // show when app is checking for new vehicles
    if (this.state.loading) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.checkForVehicles}</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    // show when app is resetting vehicles
    if (this.state.resetting) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.resettingVehicles}</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    // show when app is submitting likes
    if (this.state.submittingLikes) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.submittingLikesText}</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    // show when all done for today - DEMO version
    if (
      !this.state.customer &&
      this.props.showDemo &&
      (this.props.submittedLikes || this.props.noLikes)
    ) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.demoAllDone}</Text>
            <Text style={styles.textStyleInfo}>{strings.demoAllDoneInfo}</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.endNewVehiclesDemo()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>
                {strings.demoBackToWelcome}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // show when user wants a demo of Swipe vehicle feature
    if (!this.state.customer && this.props.showDemo) {
      return (
        <View>
          {this.renderSwipeHelp()}
          <Swipe
            data={this.handleDemoData()}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeLeft={vehicle => {
              this.props.dislikeVehicle(vehicle);
            }}
            onSwipeRight={vehicle => {
              this.props.likeVehicle(vehicle);
            }}
            keyProp="id"
          />
        </View>
      );
    }

    // show when new user enters app and as long as not registered as customer
    if (!this.state.customer) {
      return <Welcome showDemo={this.showNewVehiclesDemo} />;
    }

    // show when all done for today
    if (this.props.submittedLikes || this.props.noLikes) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.allDone}</Text>
            <Text style={styles.textStyleInfo}>{strings.allDoneInfo}</Text>
          </View>
        </View>
      );
    }

    // show when no new vehicles are available yet
    if (this.props.noVehicles) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.noNewVehicles}</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.checkForNewVehicles()}
              style={styles.button}
            >
              <Text style={styles.textStyleButton}>
                {strings.checkForVehiclesButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // show when new vehicles are available to swipe through
    return (
      <View>
        {this.renderSwipeHelp()}
        <Swipe
          data={this.props.vehicles}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeLeft={vehicle => {
            this.props.dislikeVehicle(vehicle);
          }}
          onSwipeRight={vehicle => {
            this.props.likeVehicle(vehicle);
          }}
          keyProp="id"
        />
      </View>
    );
  };

  renderNoMoreCards = () => {
    const strings = this.props.strings.newVehicles;

    // show when NO vehicles were liked and NOT in Demo mode
    if (this.props.likedVehicles.length === 0 && !this.props.showDemo) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.noMoreVehicles}</Text>
            <Text style={styles.textStyleInfo}>
              {strings.noLikedVehiclesInfo}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.props.noLikedVehicles()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>
                {strings.confirmNoLikesButton}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.resetVehicles()}
              style={[styles.button, { marginTop: 20 }]}
            >
              <Text style={styles.textStyleButton}>
                {strings.noLikesResetVehiclesButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // show when NO vehicles were liked and IN Demo mode
    if (this.props.likedVehicles.length === 0 && this.props.showDemo) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.demoNoMoreVehicles}</Text>
            <Text style={styles.textStyleInfo}>
              {strings.demoNoMoreVehiclesInfo}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.props.noLikedVehicles()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>
                {strings.demoSubmitLikesButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // show when SOME vehicles were liked and NOT in Demo mode
    if (!this.props.showDemo) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.noMoreVehicles}</Text>
            <Text style={styles.textStyleInfo}>
              {strings.noMoreVehiclesInfo}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.submitLikes()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>
                {strings.submitLikesButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // show when SOME vehicles were liked and IN Demo mode
    if (this.props.showDemo) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{strings.demoNoMoreVehicles}</Text>
            <Text style={styles.textStyleInfo}>
              {strings.demoNoMoreVehiclesInfo}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.submitLikes()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>
                {strings.demoSubmitLikesButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  renderCard = vehicle => {
    if (!this.props.showDemo) {
      return <VehicleCard vehicle={vehicle} key={vehicle.id} />;
    } else {
      return <VehicleCardDemo vehicle={vehicle} key={vehicle.id} />;
    }
  };

  renderSwipeHelp = () => {
    if (!this.props.swipeHelp) {
      return;
    }

    return (
      <View style={styles.viewCardHelp}>
        <CardHelp
          onClickButton={() => {
            this.props.hideCardHelp();
          }}
        />
      </View>
    );
  };

  showNewVehiclesDemo = () => {
    this.props.clearLikesDislikes();
    this.props.vehiclesOutdated();
    this.props.resetIndex();
    this.props.showCardHelp();
    this.props.showDemoVehicles();
  };

  endNewVehiclesDemo = () => {
    this.props.clearLikesDislikes();
    this.props.vehiclesOutdated();
    this.props.resetIndex();
    this.props.endDemoVehicles();
  };

  checkIfCustomer = async () => {
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return;
    }

    this.setState({ loading: true });

    console.log("checking if customer...");

    let uid = await AsyncStorage.getItem("uid");
    //this.props.saveUidToState(uid);

    console.log("uid: ", uid);

    let { data } = await axios.post(URLs.checkIfCustomer, {
      uid: uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken
    });

    if (data.customer) {
      this.setState({ customer: true });
      this.props.setIsCustomerTrue();
      this.checkForNewVehicles();
    } else {
      this.props.setIsCustomerFalse();
      this.props.vehiclesOutdated();
      this.setState({ customer: false });
      return this.setState({ loading: false });
    }
  };

  checkIfTrialReady = async () => {
    strings = this.props.strings.helpMessages;

    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ loading: true });

    console.log("checking if trial ready...");

    let uid = await AsyncStorage.getItem("uid");
    //this.props.saveUidToState(uid);

    let { data } = await axios.post(URLs.checkIfCustomer, {
      uid: uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken
    });

    if (data.customer) {
      this.setState({ customer: true });
      this.props.setIsCustomerTrue();
      this.checkForNewVehicles();
    } else {
      this.props.setIsCustomerFalse();
      this.props.vehiclesOutdated();
      this.setState({ customer: false });
      this.setState({ loading: false });
      return Alert.alert(strings.freeTrialHeader, strings.freeTrialHelp);
    }
  };

  checkForNewVehicles = async () => {
    strings = this.props.strings.helpMessages;

    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ loading: true });

    console.log("checking for new vehicles...");

    // Get today's date (yyyymmdd)
    const date = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "");

    if (date === this.props.newDate) {
      return this.setState({ loading: false });
    } else {
      await this.props.vehiclesOutdated();

      let { data } = await axios.post(URLs.checkNewVehicles, {
        uid: this.props.uid,
        accountSid: ApiKeys.CloudFunctions.accountSid,
        authToken: ApiKeys.CloudFunctions.authToken
      });

      if (!data.newVehicles) {
        return this.setState({ loading: false });
      } else {
        this.props.clearLikesDislikes();
        this.props.resetIndex();
        await this.props.fetchNewVehicles(this.props.uid);
      }

      this.setState({ loading: false });
    }
  };

  checkForNewVehiclesFromSettingsMenu = async () => {
    strings = this.props.strings.helpMessages;

    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ loading: true });

    console.log("checking for new vehicles from Settings menu...");

    let { data } = await axios.post(URLs.checkNewVehicles, {
      uid: this.props.uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken
    });

    if (!data.newVehicles) {
      return this.setState({ loading: false });
    } else {
      this.props.clearLikesDislikes();
      this.props.resetIndex();
      await this.props.fetchNewVehicles(this.props.uid);
    }

    this.setState({ loading: false });
  };

  resetVehicles = async () => {
    strings = this.props.strings.helpMessages;

    // check if user is connected to the internet
    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ resetting: true });

    // Get today's date (yyyymmdd)
    const date = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "");

    // check if today's date equals date stored in props.newDate (= date for latest vehicles batch)
    if (date !== this.props.newDate) {
      this.props.setNewStatusFalse();
      this.setState({ resetting: false });
      return this.checkForNewVehicles();
    }

    this.props.resetIndex();
    this.props.clearLikesDislikes();
    await this.props.fetchNewVehicles(this.props.uid);

    this.setState({ resetting: false });
  };

  submitLikes = async () => {
    strings = this.props.strings.helpMessages;

    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ submittingLikes: true });

    // check if likesSummary is empty
    if (this.props.likesSummary.length === 0) {
      console.log("likesSummary array is empty");

      const likesSummary = {
        error:
          "likesSummary was empty. Possible reason: User did not submit likes for yesterday's vehicles"
      };

      await this.props.submitLikes(this.props.uid, likesSummary);

      this.setState({ submittingLikes: false });
      return;
    }

    //Convert likesSummary array to object
    const likesSummary = Object.assign(
      ...this.props.likesSummary.map(item => ({
        [item.id]: {
          id: item.id,
          auctionSite: item.auctionSite,
          auction: item.auction
        }
      }))
    );

    await this.props.submitLikes(this.props.uid, likesSummary);

    this.setState({ submittingLikes: false });
  };

  onWillFocus = params => {
    //console.log("will focus params: ", params);
    this.translateTabBarLabel();

    if (!params) {
      return;
    }

    if (params.itemID === "resetVehicles") {
      this.resetVehicles();
      this.props.navigation.setParams({ itemID: "none" });
    }

    if (params.itemID === "checkForNewVehicles") {
      this.checkForNewVehiclesFromSettingsMenu();
      this.props.navigation.setParams({ itemID: "none" });
    }

    if (params.itemID === "checkIfTrialReady") {
      this.checkIfTrialReady();
      this.props.navigation.setParams({ itemID: "none" });
    }

    if (params.itemID === "changedLanguage") {
      this.props.navigation.setParams({ itemID: "none" });
      this.props.navigation.navigate("liked", {
        itemID: "changedLanguage"
      });
    }

    return;
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.onWillFocus(payload.state.params)}
        />
        <View style={{ height: STATUSBAR_HEIGHT }}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        {this.renderScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    paddingHorizontal: 0
  },
  viewStyle: {
    paddingHorizontal: 20,
    marginTop: 100
  },
  viewStyleLogo: {
    paddingHorizontal: 10
  },
  viewStyleContent: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10
  },
  textStyleContent: {
    textAlign: "left",
    color: "#fff",
    fontSize: 18,
    marginBottom: 10
  },
  textStyleInfo: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginBottom: 10
  },
  textStyleButton: {
    textAlign: "center",
    color: "#111",
    fontSize: 16
  },
  mwrTextStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18
  },
  spinnerStyle: {
    marginTop: 30
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 11,
    borderRadius: 10,
    marginTop: 40
  },
  mwrButton: {
    alignItems: "center",
    backgroundColor: "#378FDB",
    padding: 11,
    borderRadius: 10,
    marginTop: 30
  },
  logo: {
    textAlign: "center",
    fontSize: 36,
    color: "#fff"
  },
  viewCardHelp: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 101,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#2b2b2b",
    opacity: 0.9
  }
});

function mapStateToProps(state) {
  const { newStatus, noVehicles, newDate } = state.vehicleStatus;
  const { uid } = state.auth;
  const vehicles = state.vehicles;
  const likesSummary = state.likesSummary;
  const { submittedLikes, noLikes } = state.likeStatus;
  const { swipeHelp } = state.onboardingStatus;
  const { showDemo } = state.demo;
  const { isConnected } = state.online;
  const { language, strings } = state.locale;
  const likedVehicles = state.likes;
  return {
    newDate,
    newStatus,
    noVehicles,
    uid,
    vehicles,
    likesSummary,
    submittedLikes,
    noLikes,
    swipeHelp,
    showDemo,
    isConnected,
    language,
    strings,
    likedVehicles
  };
}

export default connect(
  mapStateToProps,
  actions
)(NewVehiclesScreen);
