import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { NavigationEvents } from "react-navigation";

import * as actions from "../redux/actions";
import { IsIphoneXsMax } from "../components/common";
import VehicleCard from "../components/common/VehicleCard";
import VehicleCardDemo from "../components/common/VehicleCardDemo";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;

class NopeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const tabBarLabel =
      navigation.state.params && navigation.state.params.tabBarLabel
        ? navigation.state.params.tabBarLabel
        : "Nope";

    return {
      header: null,
      tabBarLabel: tabBarLabel,
      tabBarIcon: ({ tintColor }) => (
        <Icon
          ios="ios-thumbs-down"
          android="md-thumbs-down"
          style={{ color: tintColor, fontSize: 30 }}
        />
      )
    };
  };

  componentDidMount() {
    // update tabBarLabel translation
    this.translateTabBarLabel();
  }

  onWillFocus = params => {
    //console.log("will focus params: ", params);
    this.translateTabBarLabel();

    if (!params) {
      return;
    }

    if (params.itemID === "changedLanguage") {
      this.props.navigation.setParams({ itemID: "none" });
      this.props.navigation.navigate("settings", {
        itemID: "changedLanguage"
      });
    }
  };

  translateTabBarLabel = () => {
    // get react-navigation's setParams function from props
    const {
      navigation: { setParams }
    } = this.props;

    // update react-navigation tabBarLabel params dynamically from redux store
    setParams({
      tabBarLabel: this.props.strings.mainTabNavigator.nope
    });
  };

  renderVehicles = () => {
    if (this.props.dislikedVehicles.length === 0) {
      return this.renderNoVehicles();
    }

    return this.renderDislikedVehicles();
  };

  renderNoVehicles = () => {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>
          {this.props.strings.nope.noVehicles}
        </Text>
      </View>
    );
  };

  renderDislikedVehicles = () => {
    if (!this.props.showDemo) {
      return this.props.dislikedVehicles.map(vehicle => {
        return <VehicleCard vehicle={vehicle} key={vehicle.id} />;
      });
    } else {
      return this.props.dislikedVehicles.map(vehicle => {
        return <VehicleCardDemo vehicle={vehicle} key={vehicle.id} />;
      });
    }
  };

  renderLikesSubmitted = () => {
    if (this.props.submittedLikes) {
      return (
        <View style={styles.viewStyleLikesSubmitted}>
          <Text style={[styles.textStyle, { fontSize: 16 }]}>
            {this.props.strings.nope.likesSubmitted}
          </Text>
        </View>
      );
    }
    return;
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.onWillFocus(payload.state.params)}
        />
        <View
          style={{
            height: STATUSBAR_HEIGHT
          }}
        >
          <StatusBar translucent barStyle="light-content" />
        </View>

        <View>{this.renderLikesSubmitted()}</View>
        <ScrollView style={styles.container}>
          {this.renderVehicles()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b"
  },
  viewStyle: {
    paddingHorizontal: 10,
    marginTop: 100
  },
  viewStyleLikesSubmitted: {
    padding: 10,
    backgroundColor: "#4BB543"
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20
  }
});

function mapStateToProps(state) {
  const dislikedVehicles = state.dislikes;
  const { submittedLikes } = state.likeStatus;
  const { showDemo } = state.demo;
  const { strings } = state.locale;
  return { dislikedVehicles, submittedLikes, showDemo, strings };
}

export default connect(
  mapStateToProps,
  actions
)(NopeScreen);
