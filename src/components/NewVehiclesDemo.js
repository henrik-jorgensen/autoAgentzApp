import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  AsyncStorage,
  Dimensions
} from "react-native";
import { connect } from "react-redux";

import * as actions from "../redux/actions";
import { Spinner } from "../components/common";
import Swipe from "../components/Swipe";
import VehicleCard from "../components/common/VehicleCard";
import CardHelp from "../components/common/CardHelp";

import { Vehicles } from "../../assets/data/vehicles";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class NewVehiclesDemo extends Component {
  state = {
    submittingLikes: false
  };

  renderCard = vehicle => {
    return <VehicleCard vehicle={vehicle} key={vehicle.id} />;
  };

  renderNoMoreCards = () => {
    return (
      <View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>No more vehicles</Text>
          <Text style={styles.textStyleInfo}>
            Click "Submit Likes" to add liked vehicles to your favorites list
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => this.submitLikes()}
            style={styles.mwrButton}
          >
            <Text style={styles.mwrTextStyle}>Submit Likes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  submitLikes = async () => {
    this.setState({ submittingLikes: true });

    //Convert likesSummary array to object
    const likesSummary = Object.assign(
      ...this.props.likesSummary.map(item => ({
        [item.id]: {
          id: item.id,
          auctionSite: item.auctionSite,
          auction: item.auction
        }
      }))
    );

    await this.props.submitLikes(this.props.uid, likesSummary);

    this.setState({ submittingLikes: false });
  };

  renderSwipeHelp = () => {
    if (!this.props.swipeHelp) {
      return;
    }

    return (
      <View style={styles.viewCardHelp}>
        <CardHelp
          onClickButton={() => {
            this.props.hideCardHelp();
          }}
        />
      </View>
    );
  };

  renderScreen = () => {
    if (this.state.submittingLikes) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Submitting your likes</Text>
          </View>
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        </View>
      );
    }

    if (this.props.submittedLikes) {
      return (
        <View>
          <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>All done!</Text>
            <Text style={styles.textStyleInfo}>
              Check out the Like and Nope menus to view your likes and dislikes
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        {this.renderSwipeHelp()}
        <Swipe
          data={Vehicles}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeLeft={vehicle => {
            this.props.dislikeVehicle(vehicle);
          }}
          onSwipeRight={vehicle => {
            this.props.likeVehicle(vehicle);
          }}
          keyProp="id"
        />
      </View>
    );
  };

  render() {
    <View>{this.renderScreen()}</View>;
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    paddingHorizontal: 20,
    marginTop: 100
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10
  },
  textStyleInfo: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginBottom: 10
  },
  textStyleButton: {
    textAlign: "center",
    color: "#111",
    fontSize: 16
  },
  mwrTextStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18
  },
  spinnerStyle: {
    marginTop: 30
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 11,
    borderRadius: 10,
    marginTop: 40
  },
  mwrButton: {
    alignItems: "center",
    backgroundColor: "#378FDB",
    padding: 11,
    borderRadius: 10,
    marginTop: 40
  },
  viewCardHelp: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 101,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#2b2b2b",
    opacity: 0.9
  }
});

function mapStateToProps(state) {
  const { uid } = state.auth;
  const likesSummary = state.likesSummary;
  const { submittedLikes } = state.likeStatus;
  const { swipeHelp } = state.onboardingStatus;
  return {
    uid,
    likesSummary,
    submittedLikes,
    swipeHelp
  };
}

export default connect(
  mapStateToProps,
  actions
)(NewVehiclesDemo);
