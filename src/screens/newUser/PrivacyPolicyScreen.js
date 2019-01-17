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

class PrivacyPolicyScreen extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <View style={[{ top: this.handleBackButtonTop() }, styles.header]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("terms")}
          >
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={[{ top: this.handleTextTop() }, styles.text]}>
            Privacy Policy Screen
          </Text>
        </View>

        {/* Go Back Button */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("terms")}
            style={styles.goBackButton}
          >
            <Text style={{ fontSize: 28, color: "#fff" }}>
              <Icon
                name="md-arrow-back"
                style={{ color: "#fff", fontSize: 28 }}
              />
              {"  "}
              Go back
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
    flexDirection: "column",
    paddingHorizontal: 0,
    alignItems: "stretch",
    justifyContent: "flex-end",
    flex: 1
  },
  goBackButton: {
    height: 70,
    backgroundColor: "#4BB543",
    alignItems: "center",
    justifyContent: "center"
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
)(PrivacyPolicyScreen);
