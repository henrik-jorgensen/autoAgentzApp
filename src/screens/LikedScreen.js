import React, { Component } from "react";
import {
  ScrollView,
  View,
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

class LikedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const tabBarLabel =
      navigation.state.params && navigation.state.params.tabBarLabel
        ? navigation.state.params.tabBarLabel
        : "Like";

    console.log("likedTabBarLabel: ", tabBarLabel);

    return {
      header: null,
      tabBarLabel: tabBarLabel,
      tabBarIcon: ({ tintColor }) => (
        <Icon
          ios="ios-thumbs-up"
          android="md-thumbs-up"
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
      this.props.navigation.navigate("nope", {
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
      tabBarLabel: this.props.strings.mainTabNavigator.like
    });
  };

  renderVehicles = () => {
    if (this.props.likedVehicles.length === 0) {
      return this.renderNoVehicles();
    }

    return this.renderLikedVehicles();
  };

  renderNoVehicles = () => {
    const text =
      this.props.strings && this.props.strings.liked.noVehicles
        ? this.props.strings.liked.noVehicles
        : "No vehicles have been liked";

    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    );
  };

  renderLikedVehicles = () => {
    if (!this.props.showDemo) {
      return this.props.likedVehicles.map(vehicle => {
        return <VehicleCard vehicle={vehicle} key={vehicle.id} />;
      });
    } else {
      return this.props.likedVehicles.map(vehicle => {
        return <VehicleCardDemo vehicle={vehicle} key={vehicle.id} />;
      });
    }
  };

  renderLikesSubmitted = () => {
    if (this.props.submittedLikes) {
      return (
        <View style={styles.viewStyleLikesSubmitted}>
          <Text style={[styles.textStyle, { fontSize: 16 }]}>
            {this.props.strings.liked.likesSubmitted}
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
    backgroundColor: "#2b2b2b",
    flex: 1
  },
  viewStyle: {
    marginTop: 100,
    paddingHorizontal: 10
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
  const likedVehicles = state.likes;
  const { submittedLikes } = state.likeStatus;
  const { showDemo } = state.demo;
  const { strings } = state.locale;
  return { likedVehicles, submittedLikes, showDemo, strings };
}

export default connect(
  mapStateToProps,
  actions
)(LikedScreen);
