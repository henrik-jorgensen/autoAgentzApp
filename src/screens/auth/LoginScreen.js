import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  AsyncStorage,
  NetInfo
} from "react-native";
import { Icon } from "native-base";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import * as firebase from "firebase";
import { Spinner } from "../../components/common";
import URLs from "../../../constants/URLs";
import ApiKeys from "../../../constants/ApiKeys";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    code: "",
    error: "",
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

  handleCode = text => {
    let formattedText = text.split("  ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,1}", "g")).join("  ");
    }
    this.setState({ code: formattedText });
    return formattedText;
  };

  handleSubmit = async () => {
    const { phone, prefix } = this.props;

    // remove spaces from code
    let code = this.state.code.split("  ").join("");

    // check if code length is valid
    if (code.length < 6) {
      return Alert.alert(
        "Help Message",
        "You must provide a six digit code to continue"
      );
    }

    // check if phone is connected to the Internet
    if (!this.props.isConnected) {
      return Alert.alert(
        "Help Message",
        "Your internet connection is offline. You must be online to continue."
      );
    }

    this.setState({ error: "", loading: true });

    try {
      let { data } = await axios.post(URLs.verifyPassword, {
        prefix: prefix,
        phone: phone,
        code: code,
        accountSid: ApiKeys.CloudFunctions.accountSid,
        authToken: ApiKeys.CloudFunctions.authToken
      });
      await AsyncStorage.setItem("sms_token", data.token);
      let { user } = await firebase.auth().signInWithCustomToken(data.token);
      this.props.loginUserSuccess(user);
      this.props.phoneChanged("");
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: error.response.data.error.message
      });
      return Alert.alert("Help Message", this.state.error);
    }
  };

  renderNextButton = () => {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <TouchableOpacity
        style={styles.nextButtonTouch}
        onPress={this.handleSubmit}
      >
        <Icon name="md-arrow-forward" style={{ color: "white" }} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("authHome", {
                fromScreen: "login"
              })
            }
          >
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          <Text style={styles.text}>
            Enter the six digit code that was sent to your mobile phone.
          </Text>

          <View style={styles.textInputView}>
            <TextInput
              ref="input1"
              keyboardType="numeric"
              style={styles.textInput}
              value={this.state.code}
              autoFocus={true}
              onChangeText={this.handleCode}
              placeholder="0  0  0  0  0  0"
              maxLength={16}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
        </View>

        {/* Next Button */}
        <View style={styles.nextButton}>{this.renderNextButton()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    height: 60,
    width: 60,
    top: 60,
    left: 25,
    zIndex: 100
  },
  content: {
    position: "absolute",
    top: 120,
    paddingHorizontal: 25
  },
  text: {
    fontSize: 20,
    color: "#fff"
  },
  textInputView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    height: 56,
    width: 222,
    fontSize: 30,
    backgroundColor: "white",
    color: "black",
    borderColor: "#54575e",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    textAlign: "left",
    includeFontPadding: false //Android specific
  },
  nextButtonTouch: {
    position: "absolute",
    height: 60,
    width: 60,
    top: 0,
    backgroundColor: "#378FDB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  nextButton: {
    position: "absolute",
    top: 266,
    height: 60,
    width: 60,
    right: 10,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  }
});

const mapStateToProps = state => {
  const { prefix, phone } = state.auth;
  const { isConnected } = state.online;

  return { prefix, phone, isConnected };
};

export default connect(
  mapStateToProps,
  actions
)(LoginScreen);
