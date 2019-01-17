import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import Welcome from "../../components/common/Welcome";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Welcome />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WelcomeScreen;
