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
import { Permissions, Notifications } from "expo";
import { Localization } from "expo-localization";

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

  static navigationOptions = {
    header: null
  };

  state = {
    loading: false,
    resetting: false,
    submittingLikes: false,
    customer: false,
    strings: {}
  };

  async componentDidMount() {
    // Check if language is set. If not, set language to device language
    /*if (!this.props.language) {
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
    }*/
    console.log("Props language: ", this.props.language);
    console.log("Props strings: ", this.props.strings);

    // get uid from AsyncStorage and save it to redux state
    let uid = await AsyncStorage.getItem("uid");
    this.props.saveUidToState(uid);

    // check if user is registered as a customer
    this.checkIfCustomer();

    // register device for push notifications
    this.registerForPushNotificationsAsync(uid);

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

    //this.setState({ strings });
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

  renderScreen = () => {
    const strings = this.props.strings.newVehicles;

    if (this.state.loading) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Checking for new vehicles</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    if (this.state.resetting) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Resetting vehicles</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    if (this.state.submittingLikes) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Submitting your likes</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    if (
      !this.state.customer &&
      this.props.showDemo &&
      this.props.submittedLikes
    ) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>All done!</Text>
            <Text style={styles.textStyleInfo}>
              If you had submitted real vehicles they would have been added to
              your favorites list on the relevant auction sites.
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.endNewVehiclesDemo()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>Go back to Welcome screen</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (!this.state.customer && this.props.showDemo) {
      return (
        <View>
          {this.renderSwipeHelp()}
          <Swipe
            data={Vehicles}
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

    if (!this.state.customer) {
      return <Welcome showDemo={this.showNewVehiclesDemo} />;
    }

    if (this.props.submittedLikes) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>All done!</Text>
            <Text style={styles.textStyleInfo}>
              Come back tomorrow for more
            </Text>
          </View>
        </View>
      );
    }

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
    if (!this.props.showDemo) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>No more vehicles</Text>
            <Text style={styles.textStyleInfo}>
              Click "Submit Likes" to add liked vehicles to your favorites list
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.submitLikes()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>Submit Likes</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>No more vehicles</Text>
            <Text style={styles.textStyleInfo}>
              In the "Like" and "Nope" menus below you can review the vehicles
              you liked and disliked.
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => this.submitLikes()}
              style={styles.mwrButton}
            >
              <Text style={styles.mwrTextStyle}>Submit Likes to continue</Text>
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

    //let uid = await AsyncStorage.getItem("uid");
    //this.props.saveUidToState(uid);

    let { data } = await axios.post(URLs.checkIfCustomer, {
      uid: this.props.uid,
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
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(
        "Oops, something went wrong",
        "Looks like you lost your internet connection. Please reconnect and try again."
      );
    }

    this.setState({ loading: true });

    console.log("checking if trial ready...");

    //let uid = await AsyncStorage.getItem("uid");
    //this.props.saveUidToState(uid);

    let { data } = await axios.post(URLs.checkIfCustomer, {
      uid: this.props.uid,
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
      return Alert.alert("Free Trial", "Your free trial is not ready yet");
    }
  };

  checkForNewVehicles = async () => {
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(
        "Oops, something went wrong",
        "Looks like you lost your internet connection. Please reconnect and try again."
      );
    }

    this.setState({ loading: true });

    console.log("checking for new vehicles...");

    // Get today's date
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
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(
        "Oops, something went wrong",
        "Looks like you lost your internet connection. Please reconnect and try again."
      );
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
    if (!this.props.isConnected) {
      return Alert.alert(
        "Oops, something went wrong",
        "Looks like you lost your internet connection. Please reconnect and try again."
      );
    }

    this.setState({ resetting: true });

    this.props.resetIndex();
    this.props.clearLikesDislikes();
    await this.props.fetchNewVehicles(this.props.uid);

    this.setState({ resetting: false });
  };

  submitLikes = async () => {
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(
        "Oops, something went wrong",
        "Looks like you lost your internet connection. Please reconnect and try again."
      );
    }

    this.setState({ submittingLikes: true });

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
  const { submittedLikes } = state.likeStatus;
  const { swipeHelp } = state.onboardingStatus;
  const { showDemo } = state.demo;
  const { isConnected } = state.online;
  const { language, strings } = state.locale;
  return {
    newDate,
    newStatus,
    noVehicles,
    uid,
    vehicles,
    likesSummary,
    submittedLikes,
    swipeHelp,
    showDemo,
    isConnected,
    language,
    strings
  };
}

export default connect(
  mapStateToProps,
  actions
)(NewVehiclesScreen);
