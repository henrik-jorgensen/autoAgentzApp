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
const SCREEN_HEIGHT = Dimensions.get("window").height;

class CardHelp extends Component {
  render() {
    return (
      <View>
        {/* SWIPE RIGHT HELP */}
        <View
          style={[styles.viewStyleGraphic, { marginTop: 25, paddingLeft: 71 }]}
        >
          <Image
            source={require("../../../assets/swipeRightIcon.png")}
            style={SCREEN_HEIGHT <= 568 ? styles.graphicSmall : styles.graphic}
          />
        </View>
        <View style={styles.viewStyle}>
          <Text
            style={
              SCREEN_HEIGHT <= 568
                ? [styles.textStyleSmall, { fontFamily: "OpenSans_bold" }]
                : [styles.textStyle, { fontFamily: "OpenSans_bold" }]
            }
          >
            SWIPE RIGHT
          </Text>
          <Text
            style={
              SCREEN_HEIGHT <= 568 ? styles.textStyleSmall : styles.textStyle
            }
          >
            to{" "}
            <Text
              style={
                SCREEN_HEIGHT <= 568
                  ? [styles.textStyleGreen, { fontSize: 22 }]
                  : styles.textStyleGreen
              }
            >
              like a vehicle
            </Text>
          </Text>
        </View>

        {/* SWIPE LEFT HELP */}
        <View
          style={[styles.viewStyleGraphic, { marginTop: 40, paddingRight: 71 }]}
        >
          <Image
            source={require("../../../assets/swipeLeftIcon.png")}
            style={SCREEN_HEIGHT <= 568 ? styles.graphicSmall : styles.graphic}
          />
        </View>
        <View style={styles.viewStyle}>
          <Text
            style={
              SCREEN_HEIGHT <= 568
                ? [styles.textStyleSmall, { fontFamily: "OpenSans_bold" }]
                : [styles.textStyle, { fontFamily: "OpenSans_bold" }]
            }
          >
            SWIPE LEFT
          </Text>
          <Text
            style={
              SCREEN_HEIGHT <= 568 ? styles.textStyleSmall : styles.textStyle
            }
          >
            to{" "}
            <Text
              style={
                SCREEN_HEIGHT <= 568
                  ? [styles.textStyleRed, { fontSize: 22 }]
                  : styles.textStyleRed
              }
            >
              dismiss a vehicle
            </Text>
          </Text>
        </View>

        {/* BUTTON */}
        <View
          style={
            SCREEN_HEIGHT <= 568
              ? [styles.viewStyle, { marginTop: 10 }]
              : [styles.viewStyle, { marginTop: 35 }]
          }
        >
          <TouchableOpacity
            onPress={() => this.props.onClickButton()}
            style={styles.mwrButton}
          >
            <Text
              style={
                SCREEN_HEIGHT <= 568
                  ? styles.mwrTextStyleSmall
                  : styles.mwrTextStyle
              }
            >
              Got it!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  graphic: {
    width: 142,
    height: 77,
    borderRadius: 10
  },
  graphicSmall: {
    width: 120,
    height: 65,
    borderRadius: 10
  },
  mwrButton: {
    alignItems: "center",
    backgroundColor: "#378FDB",
    padding: 13,
    borderRadius: 10,
    marginTop: 40,
    width: 160
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
    fontFamily: "OpenSans_semiBold",
    fontSize: 24
  },
  textStyleSmall: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "OpenSans_semiBold",
    fontSize: 22
  },
  textStyleGreen: {
    fontFamily: "OpenSans_semiBold",
    fontSize: 24,
    color: "#61d836"
  },
  textStyleRed: {
    fontFamily: "OpenSans_semiBold",
    fontSize: 24,
    color: "#ee220c"
  },
  viewStyle: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center"
  },
  viewStyleSmall: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center"
  },
  viewStyleGraphic: {
    paddingHorizontal: 10,
    alignItems: "center"
  }
});

export default CardHelp;
