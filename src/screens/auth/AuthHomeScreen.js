import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  Alert,
  AsyncStorage,
  NetInfo
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "native-base";
import axios from "axios";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { Localization } from "expo-localization";

import { Spinner } from "../../components/common";
import * as actions from "../../redux/actions";
import URLs from "../../../constants/URLs";
import ApiKeys from "../../../constants/ApiKeys";
import { Translations } from "../../components/common/Translations";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class AuthHomeScreen extends Component {
  constructor(props) {
    super(props);
    if (!this.props.language) {
      // Get device language and remove region identifier (the '-' and everything following)
      const deviceLocale = Localization.locale.split("-")[0];
      console.log("Device language: ", deviceLocale);

      // Set device language as user's preferred language in redux state
      this.props.saveLanguageToState(deviceLocale);

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
    textInputBorderBottomWidth: 0,
    startButtonOpacity: 1,
    error: {},
    loading: false
  };

  componentWillMount() {
    this.loginHeight = new Animated.Value(100);

    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );

    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );

    //code for Android:
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);
  }

  componentDidMount() {
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

  onWillFocus = params => {
    //console.log("will focus params: ", params);
    if (!params) {
      return;
    }

    if (params.showKeyboard) {
      this.refs.textInputMobile.focus();
    }

    return;
  };

  handleStrings = language => {
    // get strings in correct language
    const strings = Translations(language);

    // Save content strings to redux state
    this.props.saveStringsToState(strings);
  };

  keyboardWillShow = event => {
    if (Platform.OS === "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10
      }),
      /*Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1
      }),*/
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 1
      })
    ]).start();
  };

  keyboardWillHide = event => {
    if (Platform.OS === "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 0
      })
    ]).start();
  };

  increaseHeightOfLogin = () => {
    this.setState({ startButtonOpacity: 0 });

    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500
    }).start(() => {
      this.setState({
        textInputBorderBottomWidth: 1
      });
    });
    this.refs.textInputMobile.focus();
  };

  decreaseHeightOfLogin = () => {
    Keyboard.dismiss();

    Animated.timing(this.loginHeight, {
      toValue: 100,
      duration: 500
    }).start(() => {
      this.setState({
        textInputBorderBottomWidth: 0,
        startButtonOpacity: 1
      });
    });
  };

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.setIsConnected();
    } else {
      this.props.setIsNotConnected();
    }
  };

  handlePhoneNumber = number => {
    this.props.phoneChanged(number);
  };

  handleSubmit = async () => {
    // remove spaces from phoneNumber
    let phone = this.props.phone.split(" ").join("");
    const strings = this.props.strings.helpMessages;

    if (phone.length < 8) {
      return Alert.alert(strings.oopsHeader, strings.phoneLengthHelp);
    }

    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ error: "", loading: true });

    try {
      await axios.post(URLs.createUser, {
        prefix: this.props.prefix,
        phone: phone,
        accountSid: ApiKeys.CloudFunctions.accountSid,
        authToken: ApiKeys.CloudFunctions.authToken
      });
      this.checkIfAcceptedTerms(this.props.prefix, phone);
    } catch (error) {
      console.log(error);
      if (error.response.data.error.code === "auth/uid-already-exists") {
        this.checkIfAcceptedTerms(this.props.prefix, phone);
      } else {
        this.setState({
          error: error.response.data.error.message,
          loading: false
        });
        return Alert.alert(strings.oopsHeader, this.state.error);
      }
    }
  };

  checkIfAcceptedTerms = async (prefix, phone) => {
    let uid = "+" + prefix + phone;

    await AsyncStorage.setItem("uid", uid);

    let { data } = await axios.post(URLs.checkIfAcceptedTerms, {
      uid: uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken
    });

    if (data.acceptedTerms) {
      this.requestCode(prefix, phone);
    } else {
      this.setState({ loading: false, error: "" });
      this.props.navigation.navigate("name");
    }
  };

  requestCode = async (prefix, phone) => {
    console.log("this.props.language: ", this.props.language);

    try {
      await axios.post(URLs.requestPassword, {
        prefix: prefix,
        phone: phone,
        accountSid: ApiKeys.CloudFunctions.accountSid,
        authToken: ApiKeys.CloudFunctions.authToken,
        language: this.props.language
      });
      this.setState({ loading: false, error: "" });
      this.props.navigation.navigate("login");
    } catch (error) {
      this.setState({
        error: error.response.data.error.message,
        loading: false
      });
      return Alert.alert(
        this.props.strings.helpMessages.helpHeader,
        this.state.error
      );
    }
  };

  handleVehicleCardImage = () => {
    if (!this.props.language) {
      return require("../../../assets/vehicleCardEN.png");
    }
    if (this.props.language === "da") {
      return require("../../../assets/vehicleCardDA.png");
    }
    if (this.props.language === "de") {
      return require("../../../assets/vehicleCardDE.png");
    }
    return require("../../../assets/vehicleCardEN.png");
  };

  handleVehicleCardStyle = () => {
    if (SCREEN_HEIGHT <= 667) {
      return styles.vehicleCardSmall;
    } else {
      return styles.vehicleCard;
    }
  };

  handleBackButtonTop = () => {
    if (Platform.OS === "ios") {
      return 20;
    } else {
      return 45;
    }
  };

  handleLoginTeaserMarginTop = () => {
    if (Platform.OS === "ios") {
      return 80;
    } else {
      return 71;
    }
  };

  handleTitleTextTop = () => {
    if (Platform.OS === "ios") {
      return 100;
    } else {
      return 91;
    }
  };

  handleForwardArrowTop = () => {
    if (Platform.OS === "ios") {
      return 230;
    } else {
      return 250;
    }
  };

  renderNextButton = () => {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <TouchableOpacity
        onPress={this.handleSubmit}
        style={styles.forwardArrowTouch}
      >
        <Icon name="md-arrow-forward" style={{ color: "white" }} />
      </TouchableOpacity>
    );
  };

  render() {
    const loginOpacity = this.loginHeight.interpolate({
      inputRange: [100, SCREEN_HEIGHT],
      outputRange: [0, 1]
    });

    const loginTeaserMarginTop = this.loginHeight.interpolate({
      inputRange: [100, SCREEN_HEIGHT],
      outputRange: [45, this.handleLoginTeaserMarginTop()]
    });

    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [100, SCREEN_HEIGHT],
      outputRange: [100, 25]
    });

    const titleTextTop = this.loginHeight.interpolate({
      inputRange: [100, 400, SCREEN_HEIGHT],
      outputRange: [0, 0, this.handleTitleTextTop()]
    });

    const forwardArrowRight = this.loginHeight.interpolate({
      inputRange: [100, SCREEN_HEIGHT],
      outputRange: [100, 25]
    });

    const forwardArrowTop = this.loginHeight.interpolate({
      inputRange: [100, 400, SCREEN_HEIGHT],
      outputRange: [500, 375, this.handleForwardArrowTop()]
    });

    // get strings in preferred language from redux. If not available yet
    // get strings from Translations component based on device language
    const strings =
      this.props.strings && this.props.strings.authHome
        ? this.props.strings.authHome
        : Translations(Localization.locale.split("-")[0]).authHome;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.onWillFocus(payload.state.params)}
        />

        {/* Back Button */}
        <Animated.View
          style={[
            { opacity: loginOpacity, top: this.handleBackButtonTop() },
            styles.header
          ]}
        >
          <TouchableOpacity onPress={() => this.decreaseHeightOfLogin()}>
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </Animated.View>

        {/* Next Button */}
        <Animated.View
          style={[
            {
              opacity: loginOpacity,
              top: forwardArrowTop,
              right: forwardArrowRight
            },
            styles.forwardArrow
          ]}
        >
          {this.renderNextButton()}
        </Animated.View>

        <View style={styles.background}>
          <Animatable.View
            animation="zoomIn"
            iterationCount={1}
            style={styles.cardSection}
          >
            {/* autoAgentz logo */}
            <View
              style={
                SCREEN_HEIGHT <= 667
                  ? styles.logoSectionSmall
                  : styles.logoSection
              }
            >
              <Image
                source={require("../../../assets/LogoHorizontalWhite.png")}
                style={SCREEN_HEIGHT <= 667 ? styles.logoSmall : styles.logo}
              />
            </View>

            {/* Vehicle card */}
            <Image
              source={this.handleVehicleCardImage()}
              style={this.handleVehicleCardStyle()}
            />
          </Animatable.View>

          {/* BOTTOM HALF */}
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{ height: this.loginHeight, backgroundColor: "#2b2b2b" }}
            >
              {/* Continue button */}
              <Animated.View
                style={{
                  paddingHorizontal: 10,
                  opacity: this.state.startButtonOpacity
                }}
              >
                <TouchableOpacity
                  onPress={() => this.increaseHeightOfLogin()}
                  style={styles.mwrButton}
                >
                  <Text style={styles.mwrTextStyle}>{strings.continue}</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.Text
                style={{
                  fontSize: 24,
                  color: "#fff",
                  position: "absolute",
                  top: titleTextTop,
                  left: titleTextLeft,
                  opacity: loginOpacity
                }}
              >
                {strings.enterMobileNo}
              </Animated.Text>

              <Animated.View
                style={[
                  {
                    marginTop: loginTeaserMarginTop,
                    opacity: loginOpacity
                  },
                  styles.loginInput
                ]}
              >
                <Image
                  source={require("../../../assets/dk_flag.png")}
                  style={{
                    height: 24,
                    width: 28,
                    resizeMode: "contain"
                  }}
                />
                <Icon
                  type="FontAwesome"
                  name="caret-down"
                  style={{
                    paddingLeft: 7,
                    fontSize: 18,
                    color: "#fff",
                    marginTop: 2
                  }}
                />
                <View
                  pointerEvents="none"
                  style={
                    ({
                      borderBottomWidth: this.borderBottomWidth
                    },
                    [styles.textInputView])
                  }
                >
                  <Text
                    style={{
                      paddingHorizontal: 8,
                      fontSize: 20,
                      color: "#fff"
                    }}
                  >
                    +{this.props.prefix}
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    ref="textInputMobile"
                    value={this.props.phone}
                    onChangeText={this.handlePhoneNumber}
                    style={[
                      {
                        borderBottomWidth: this.state.textInputBorderBottomWidth
                      },
                      styles.textInput
                    ]}
                    placeholder="22 34 56 78"
                    placeholderTextColor="#666"
                    underlineColorAndroid="transparent"
                    maxLength={11}
                    onSubmitEditing={this.handleSubmit}
                    returnKeyType="next"
                  />
                </View>
              </Animated.View>
            </Animated.View>
          </Animatable.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b"
  },
  background: {
    flex: 1
  },
  logoSection: {
    height: 80,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  logoSectionSmall: {
    height: 60,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  cardSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    height: 60,
    width: 60,
    //top: 40,
    left: 25,
    zIndex: 100
  },
  logo: {
    width: 261,
    height: 54
  },
  logoSmall: {
    width: 217.5,
    height: 45
  },
  vehicleCard: {
    width: SCREEN_WIDTH - 20,
    height: (SCREEN_WIDTH - 20) * 1.47191,
    borderRadius: 15
  },
  vehicleCardSmall: {
    width: (SCREEN_HEIGHT - 180) / 1.47191,
    height: SCREEN_HEIGHT - 180,
    borderRadius: 15
  },
  vehicleCardMedium: {
    width: 274,
    height: 450,
    borderRadius: 10
  },
  forwardArrow: {
    position: "absolute",
    height: 60,
    width: 60,

    zIndex: 100,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  forwardArrowTouch: {
    position: "absolute",
    height: 60,
    width: 60,
    top: 0,
    backgroundColor: "#378FDB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  loginInput: {
    paddingHorizontal: 25,
    flexDirection: "row"
  },
  textInputView: {
    flexDirection: "row",
    flex: 1
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    borderBottomColor: "#378FDB",
    paddingBottom: 6,
    paddingTop: 0,
    color: "#fff",
    textAlignVertical: "top" //Android specific
  },
  mwrButton: {
    alignItems: "center",
    backgroundColor: "#378FDB",
    padding: 20,
    borderRadius: 10,
    marginTop: 20
  },
  mwrTextStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20
  }
});

const mapStateToProps = state => {
  const { prefix, phone } = state.auth;
  const { isConnected } = state.online;
  const { language, strings } = state.locale;

  return { prefix, phone, isConnected, strings, language };
};

export default connect(
  mapStateToProps,
  actions
)(AuthHomeScreen);
