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

import { IsIphoneXsMax } from "../components/common";
import VehicleCard from "../components/common/VehicleCard";
import VehicleCardDemo from "../components/common/VehicleCardDemo";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;

class NopeScreen extends Component {
  static navigationOptions = {
    header: null
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
        <Text style={styles.textStyle}>No vehicles have been disliked</Text>
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
  return { dislikedVehicles, submittedLikes, showDemo };
}

export default connect(mapStateToProps)(NopeScreen);
