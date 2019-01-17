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

import { IsIphoneXsMax } from "../components/common";
import VehicleCard from "../components/common/VehicleCard";
import VehicleCardDemo from "../components/common/VehicleCardDemo";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;

class LikedScreen extends Component {
  static navigationOptions = {
    header: null
  };

  renderVehicles = () => {
    if (this.props.likedVehicles.length === 0) {
      return this.renderNoVehicles();
    }

    return this.renderLikedVehicles();
  };

  renderNoVehicles = () => {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>No vehicles have been liked</Text>
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
            Your likes have been submitted!
          </Text>
        </View>
      );
    }
    return;
  };

  render() {
    return (
      <View style={styles.container}>
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
  return { likedVehicles, submittedLikes, showDemo };
}

export default connect(mapStateToProps)(LikedScreen);
