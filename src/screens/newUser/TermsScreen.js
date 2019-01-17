import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import { Spinner } from "../../components/common";

const SCREEN_WIDTH = Dimensions.get("window").width;

class TermsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    error: {},
    loading: false
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

  handleSubmit = () => {};

  render() {
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <View style={[{ top: this.handleBackButtonTop() }, styles.header]}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("terms", {
                showKeyboard: true
              })
            }
          >
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={[{ top: this.handleTextTop() }, styles.text]}>
            Do you agree to autoAgentz's Terms of Service and Privacy Policy?
          </Text>
        </View>

        {/* Go Back Button */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              { paddingTop: this.handleButtonsPaddingTop() },
              styles.declineButton
            ]}
          >
            <Icon name="md-close" style={styles.icon} />
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
    height: 65,
    width: 65,
    backgroundColor: "#B33A3A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 33
  },
  agreeButton: {
    height: 65,
    width: 65,
    backgroundColor: "#4BB543",
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
    position: "absolute",
    left: 25
  }
});

export default connect(
  null,
  actions
)(TermsScreen);
