import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  StatusBar,
  Platform,
  TouchableOpacity,
  Picker,
  Modal,
  Dimensions
} from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { NavigationEvents } from "react-navigation";

import { Translations } from "../components/common/Translations";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;
const SCREEN_WIDTH = Dimensions.get("window").width;

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = { modalVisible: false };

  _toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  renderScreen = () => {
    if (this.props.isCustomer) {
      return (
        <View style={{ paddingHorizontal: 10 }}>
          {this.signOutButton()}
          {this.checkForNewVehiclesButton()}
          {this.resetVehiclesButton()}
          {this.showSwipeHelp()}
          {this.languageButton()}
        </View>
      );
    }

    return (
      <View style={{ paddingHorizontal: 10 }}>
        {this.signOutButton()}
        {this.checkIfTrialReadyButton()}
        {this.languageButton()}
      </View>
    );
  };

  onSignOut = async () => {
    await AsyncStorage.removeItem("sms_token");
    await firebase.auth().signOut();
  };

  signOutButton = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={this.onSignOut} style={styles.mwrButton}>
          <Text style={styles.mwrTextStyle}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  checkForNewVehiclesButton = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.newStatus) {
              this.props.navigation.navigate("newVehicles", {
                itemID: "checkForNewVehicles"
              });
            }

            return;
          }}
          style={this.props.newStatus ? styles.inactiveButton : styles.button}
        >
          <Text
            style={
              this.props.newStatus
                ? styles.textStyleInactiveButton
                : styles.textStyleButton
            }
          >
            Check for new vehicles
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  checkIfTrialReadyButton = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (!this.props.newStatus) {
              this.props.navigation.navigate("newVehicles", {
                itemID: "checkIfTrialReady"
              });
            }

            return;
          }}
          style={this.props.newStatus ? styles.inactiveButton : styles.button}
        >
          <Text
            style={
              this.props.newStatus
                ? styles.textStyleInactiveButton
                : styles.textStyleButton
            }
          >
            Check if free trial is ready
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  resetVehiclesButton = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (this.props.newStatus) {
              this.props.navigation.navigate("newVehicles", {
                itemID: "resetVehicles"
              });
            }
            return;
          }}
          style={this.props.newStatus ? styles.button : styles.inactiveButton}
        >
          <Text
            style={
              this.props.newStatus
                ? styles.textStyleButton
                : styles.textStyleInactiveButton
            }
          >
            Reset vehicles
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  showSwipeHelp = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => this.props.showCardHelp()}
          style={!this.props.swipeHelp ? styles.button : styles.inactiveButton}
        >
          <Text
            style={
              !this.props.swipeHelp
                ? styles.textStyleButton
                : styles.textStyleInactiveButton
            }
          >
            Activate help screens
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  languageButton = () => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._toggleModal()}
        >
          <Text style={styles.textStyleButton}>Select language</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          animationType="none"
          onRequestClose={() => this._toggleModal()}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: "#2b2b2b",
              justifyContent: "center",
              marginTop: -100
            }}
          >
            <Picker
              selectedValue={this.props.language}
              style={{ height: 130, width: SCREEN_WIDTH - 40, color: "#fff" }}
              onValueChange={(itemValue, itemIndex) => {
                this.props.setLanguage(itemValue);
                this.handleStrings(itemValue);
              }}
              itemStyle={{ color: "#fff" }}
            >
              <Picker.Item label="Dansk" value="da" />
              <Picker.Item label="Deutsch" value="de" />
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Espanol" value="es" />
            </Picker>
            <TouchableOpacity
              style={[styles.button, { marginTop: 80 }]}
              onPress={this._toggleModal}
            >
              <Text style={styles.textStyleButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  handleStrings = language => {
    // get strings in correct language
    const strings = Translations(language);

    // Save content strings to redux state
    this.props.saveStringsToState(strings);
  };

  render() {
    const utc = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => {}} />
        <View style={{ height: STATUSBAR_HEIGHT }}>
          <StatusBar translucent barStyle="light-content" />
        </View>

        {this.renderScreen()}

        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>User id: {this.props.uid}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2b2b2b",
    flex: 1
    //paddingHorizontal: 10
  },
  H1: {
    marginTop: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 24
  },
  viewStyle: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  textStyle: {
    textAlign: "center",
    color: "#bdbdbd",
    fontSize: 16
  },
  textStyleButton: {
    textAlign: "center",
    color: "#111",
    fontSize: 16
  },
  textStyleInactiveButton: {
    textAlign: "center",
    color: "#777",
    fontSize: 16
  },
  mwrTextStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 11,
    borderRadius: 10,
    marginTop: 20
  },
  inactiveButton: {
    alignItems: "center",
    backgroundColor: "#555",
    padding: 11,
    borderRadius: 10,
    marginTop: 20
  },
  mwrButton: {
    alignItems: "center",
    backgroundColor: "#378FDB",
    padding: 11,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  const { newStatus } = state.vehicleStatus;
  const { submittedLikes } = state.likeStatus;
  const { swipeHelp } = state.onboardingStatus;
  const { isCustomer } = state.customer;
  const { language, strings } = state.locale;
  return {
    uid,
    newStatus,
    submittedLikes,
    swipeHelp,
    isCustomer,
    language,
    strings
  };
};

export default connect(
  mapStateToProps,
  actions
)(SettingsScreen);