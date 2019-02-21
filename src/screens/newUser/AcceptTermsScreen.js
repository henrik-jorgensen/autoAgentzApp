import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  NetInfo
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import axios from "axios";

import * as actions from "../../redux/actions";
import { Spinner } from "../../components/common";
import URLs from "../../../constants/URLs";
import ApiKeys from "../../../constants/ApiKeys";

const SCREEN_WIDTH = Dimensions.get("window").width;

class AcceptTermsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    error: {},
    loading: false
  };

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

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.setIsConnected();
    } else {
      this.props.setIsNotConnected();
    }
  };

  handleBackButtonTop = () => {
    if (Platform.OS === "ios") {
      return 20;
    } else {
      return 45;
    }
  };

  handleTextTop = () => {
    if (Platform.OS === "ios") {
      return 100;
    } else {
      return 120;
    }
  };

  handleButtonsPaddingTop = () => {
    if (Platform.OS === "ios") {
      return 5;
    } else {
      return 0;
    }
  };

  handleButtonsViewTop = () => {
    if (Platform.OS === "ios" && SCREEN_WIDTH > 320) {
      return 230;
    } else if (Platform.OS === "ios" && SCREEN_WIDTH <= 320) {
      return 250;
    } else if (Platform.OS === "android" && SCREEN_WIDTH <= 320) {
      return 275;
    } else {
      return 255;
    }
  };

  handleDeclineTerms = () => {
    const strings = this.props.strings.helpMessages;

    return Alert.alert(strings.helpHeader, strings.declineTermsHelp);
  };

  handleSubmit = async () => {
    const strings = this.props.strings.helpMessages;
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

    this.setState({ error: "", loading: true });

    const { prefix, phone, name, company, website, email } = this.props;

    const uid =
      "+" + prefix.replace(/[^\d]/g, "") + phone.replace(/[^\d]/g, "");

    try {
      await axios.post(URLs.addCustomerData, {
        uid: uid,
        accountSid: ApiKeys.CloudFunctions.accountSid,
        authToken: ApiKeys.CloudFunctions.authToken,
        payload: {
          name: name,
          companyName: company,
          website: website,
          email: email,
          mobile: uid,
          language: this.props.language
        }
      });
    } catch (error) {
      console.log(error.response);
      this.setState({
        error: error.response.data.message,
        loading: false
      });
      return Alert.alert(strings.oopsHeader, this.state.error);
    }

    this.requestCode(prefix, phone);
  };

  requestCode = async (prefix, phone) => {
    const strings = this.props.strings.helpMessages;
    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      this.setState({ loading: false });
      return Alert.alert(strings.oopsHeader, strings.isConnectedHelp);
    }

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
        this.props.strings.helpMessages.oopsHeader,
        this.state.error
      );
    }
  };

  renderAgreeButton = () => {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <TouchableOpacity
        onPress={this.handleSubmit}
        style={[
          { paddingTop: this.handleButtonsPaddingTop() },
          styles.agreeButton
        ]}
      >
        {/*<Icon name="md-checkmark" style={styles.icon} />*/}
        <Text style={{ color: "#fff", fontSize: 22 }}>
          {this.props.strings.acceptTermsScreen.yes}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    strings = this.props.strings.acceptTermsScreen;
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <View style={[{ top: this.handleBackButtonTop() }, styles.header]}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("email", {
                showKeyboard: true
              })
            }
          >
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={[{ top: this.handleTextTop() }, styles.viewContentStyle]}>
          <Text style={styles.text}>
            {strings.doYouAgreeTo}{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => this.props.navigation.navigate("showTerms")}
            >
              {strings.termsOfService}
            </Text>{" "}
            {strings.and}{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => this.props.navigation.navigate("privacyPolicy")}
            >
              {strings.privacyPolicy}
            </Text>
            ?
          </Text>
        </View>

        {/* Buttons */}
        <View style={[{ top: this.handleButtonsViewTop() }, styles.buttonRow]}>
          {/* Agree button */}
          <View style={styles.agreeButtonView}>{this.renderAgreeButton()}</View>

          {/* Decline button */}
          <TouchableOpacity
            onPress={this.handleDeclineTerms}
            style={[
              { paddingTop: this.handleButtonsPaddingTop() },
              styles.declineButton
            ]}
          >
            {/*<Icon name="md-close" style={styles.icon} />*/}
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {this.props.strings.acceptTermsScreen.no}
            </Text>
          </TouchableOpacity>
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
  buttonRow: {
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  declineButton: {
    height: 70,
    width: 70,
    backgroundColor: "#B33A3A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 38
  },
  agreeButton: {
    height: 70,
    width: 70,
    backgroundColor: "#4BB543",
    paddingLeft: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 38
  },
  agreeButtonView: {
    height: 70,
    width: 70,
    backgroundColor: "#222",
    paddingLeft: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 33
  },
  header: {
    position: "absolute",
    height: 60,
    width: 60,
    left: 25,
    zIndex: 100
  },
  icon: {
    color: "#fff",
    fontSize: 34
  },
  text: {
    fontSize: 24,
    color: "#fff",
    lineHeight: 34
  },
  viewContentStyle: {
    paddingHorizontal: 25,
    position: "absolute"
    //flexDirection: "row"
  }
});

const mapStateToProps = state => {
  const { prefix, phone } = state.auth;
  const { name, company, website, email } = state.newUser;
  const { isConnected } = state.online;
  const { strings, language } = state.locale;

  return {
    prefix,
    phone,
    name,
    company,
    website,
    email,
    isConnected,
    strings,
    language
  };
};

export default connect(
  mapStateToProps,
  actions
)(AcceptTermsScreen);
