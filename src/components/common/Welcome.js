import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Welcome extends Component {
  render() {
    return (
      <View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyleWelcome}>Welcome to</Text>
        </View>
        <View style={styles.viewStyleLogo}>
          <Image
            source={require("../../../assets/LogoHorizontalWhite.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.viewStyleContent}>
          <Text style={styles.textStyle}>
            We will contact you shortly to set up your free 2 week trial
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => this.props.showDemo()}
            style={styles.mwrButton}
          >
            <Text
              style={
                SCREEN_WIDTH <= 360
                  ? styles.mwrTextStyleSmall
                  : styles.mwrTextStyle
              }
            >
              Try the app with demo vehicles
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 210,
    height: 38,
    borderRadius: 10
  },
  mwrButton: {
    alignItems: "center",
    backgroundColor: "#378FDB",
    padding: 13,
    borderRadius: 10,
    marginTop: 40
  },
  mwrTextStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20
  },
  mwrTextStyleSmall: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginBottom: 10
  },
  textStyleWelcome: {
    fontSize: 18,
    paddingVertical: 4,
    color: "#6C6C6C"
  },
  viewStyle: {
    paddingHorizontal: 20,
    marginTop: 60,
    alignItems: "center"
  },
  viewStyleContent: {
    paddingHorizontal: 25,
    marginTop: 30,
    alignItems: "center"
  },
  viewStyleLogo: {
    paddingHorizontal: 20,
    alignItems: "center"
  }
});

export default Welcome;
