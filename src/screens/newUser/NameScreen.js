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
import { NavigationEvents } from "react-navigation";

import * as actions from "../../redux/actions";

const SCREEN_WIDTH = Dimensions.get("window").width;

class NameScreen extends Component {
  static navigationOptions = {
    header: null
  };

  onWillFocus = params => {
    //console.log("will focus params: ", params);
    if (!params) {
      return;
    }

    if (params.showKeyboard) {
      this.refs.textInputName.focus();
    }

    return;
  };

  handleNameInput = text => {
    this.props.nameChanged(text);
  };

  handleBackButtonTop = () => {
    if (Platform.OS === "ios") {
      return 20;
    } else {
      return 45;
    }
  };

  handleInputViewTop = () => {
    if (Platform.OS === "ios") {
      return 165;
    } else {
      return 191;
    }
  };

  handleTextTop = () => {
    if (Platform.OS === "ios") {
      return 100;
    } else {
      return 120;
    }
  };

  handleForwardArrowTop = () => {
    if (Platform.OS === "ios") {
      return 230;
    } else {
      return 250;
    }
  };

  handleSubmit = () => {
    const strings = this.props.strings.helpMessages;

    if (this.props.name.length < 5 || !this.props.name.includes(" ")) {
      return Alert.alert(strings.oopsHeader, strings.enterNameHelp);
    }

    this.props.navigation.navigate("company");
  };

  renderNextButton = () => {
    //if (this.state.loading) {
    //  return <Spinner />;
    //}

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
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.onWillFocus(payload.state.params)}
        />

        {/* Back Button */}
        <View style={[{ top: this.handleBackButtonTop() }, styles.header]}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("authHome", {
                showKeyboard: true
              })
            }
          >
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text style={[{ top: this.handleTextTop() }, styles.text]}>
          {this.props.strings.nameScreen.enterName}
        </Text>
        <View style={[{ top: this.handleInputViewTop() }, styles.inputView]}>
          <TextInput
            keyboardType="default"
            ref="textInputName"
            value={this.props.name}
            onChangeText={this.handleNameInput}
            style={styles.textInput}
            placeholder="David Hansen"
            placeholderTextColor="#666"
            underlineColorAndroid="transparent"
            maxLength={50}
            onSubmitEditing={this.handleSubmit}
            autoFocus={true}
            returnKeyType="next"
          />
        </View>

        {/* Next Button */}
        <View
          style={[{ top: this.handleForwardArrowTop() }, styles.forwardArrow]}
        >
          {this.renderNextButton()}
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
  forwardArrow: {
    position: "absolute",
    height: 60,
    width: 60,
    right: 25,
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
  header: {
    position: "absolute",
    height: 60,
    width: 60,
    //top: 20,
    left: 25,
    zIndex: 100
  },
  inputView: {
    position: "absolute",
    paddingHorizontal: 25,
    //top: 190,
    height: 30,
    width: SCREEN_WIDTH
  },
  text: {
    fontSize: 24,
    color: "#fff",
    position: "absolute",
    left: 25
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    borderBottomColor: "#378FDB",
    paddingBottom: 6,
    paddingTop: 0,
    color: "#fff",
    borderBottomWidth: 1,
    textAlignVertical: "top" //Android specific
  }
});

const mapStateToProps = state => {
  const { name } = state.newUser;
  const { strings } = state.locale;

  return { name, strings };
};

export default connect(
  mapStateToProps,
  actions
)(NameScreen);
