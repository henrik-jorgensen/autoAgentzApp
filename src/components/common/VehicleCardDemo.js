import React, { Component } from "react";
import { Image, View, Text, StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Content,
  Header,
  H2,
  Card,
  CardItem,
  Body,
  Icon,
  Left,
  Right
} from "native-base";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIZE_THRESHOLD = 360;

class VehicleCardDemo extends Component {
  render() {
    const {
      auction,
      auctionEndDate,
      auctionEndTime,
      imageUri,
      auctionSite
    } = this.props.vehicle;

    const {
      make,
      model,
      firstRegistration,
      engineSize,
      engineType,
      emissionStandard,
      horsePower,
      kW,
      fuelType,
      transmissionType,
      transmissionGears,
      mileage,
      trim,
      seats,
      doors,
      location,
      color,
      bodyType,
      taxCategory
    } = this.props.vehicle.vehicleDetails;

    const {
      avgStockDaysSimilar,
      similarSold12Months,
      onStock
    } = this.props.vehicle.dealerVehiclePerformance;

    const {
      textStyle,
      textStyleSmall,
      imageStyle,
      imageStyleSmall,
      textStylePerformance,
      textStylePerformanceSmall,
      textStyleDemo,
      textStyleDemoSmall,
      auctionEndText,
      auctionEndTextSmall,
      auctionSiteText,
      auctionSiteTextSmall
    } = styles;

    const {
      demoVehicle,
      auctionEnds,
      at,
      kwText,
      hpText,
      doorsText,
      km,
      seatsText,
      gearText,
      daysToSell,
      days,
      sold12Months,
      onStockText
    } = this.props.strings.vehicleCardDemo;

    return (
      <Content>
        <Card>
          <CardItem cardBody>
            <Image
              source={imageUri}
              style={
                SCREEN_WIDTH < SIZE_THRESHOLD ? imageStyleSmall : imageStyle
              }
            />
          </CardItem>
          <Text
            style={
              SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleDemoSmall : textStyleDemo
            }
          >
            {demoVehicle}
          </Text>
          <Text
            style={
              SCREEN_WIDTH < SIZE_THRESHOLD
                ? auctionEndTextSmall
                : auctionEndText
            }
          >
            {auctionEnds} {auctionEndDate} {at} {auctionEndTime}
          </Text>
          <Text
            style={
              SCREEN_WIDTH < SIZE_THRESHOLD
                ? auctionSiteTextSmall
                : auctionSiteText
            }
          >
            {auctionSite}
          </Text>
          <CardItem bordered>
            <H2>
              {make} {model} {engineType}
            </H2>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Body style={{ marginLeft: 0 }}>
                <Text
                  style={
                    SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                  }
                >
                  {firstRegistration}
                </Text>
                <Text
                  style={
                    SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                  }
                >
                  {color}
                </Text>
                <Text
                  style={
                    SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                  }
                >
                  {fuelType}
                </Text>
                <Text
                  style={
                    SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                  }
                >
                  {bodyType}
                </Text>
              </Body>
            </Left>
            <Body>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {kW}
                {kwText}
                {horsePower}
                {hpText}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {trim}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {emissionStandard}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {doors} {doorsText}
              </Text>
            </Body>
            <Right>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {mileage} {km}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {seats} {seatsText}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {transmissionType}, {transmissionGears}
                {gearText}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {taxCategory}
              </Text>
            </Right>
          </CardItem>

          <CardItem bordered>
            <Left>
              <Body style={{ marginLeft: 0 }}>
                <Text
                  style={[
                    { alignSelf: "center", color: "#378FDB" },
                    SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                  ]}
                >
                  {daysToSell}
                </Text>
                <Text
                  style={
                    SCREEN_WIDTH < SIZE_THRESHOLD
                      ? textStylePerformanceSmall
                      : textStylePerformance
                  }
                >
                  {avgStockDaysSimilar} {days}
                </Text>
              </Body>
            </Left>
            <Body>
              <Text
                style={[
                  { alignSelf: "center", color: "#378FDB" },
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                ]}
              >
                {sold12Months}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD
                    ? textStylePerformanceSmall
                    : textStylePerformance
                }
              >
                {similarSold12Months}
              </Text>
            </Body>
            <Right>
              <Text
                style={[
                  { alignSelf: "center", color: "#378FDB" },
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                ]}
              >
                {onStockText}
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD
                    ? textStylePerformanceSmall
                    : textStylePerformance
                }
              >
                {onStock}
              </Text>
            </Right>
          </CardItem>

          <CardItem>
            <Left>
              <Icon
                ios="ios-pin"
                android="md-pin"
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD
                    ? { fontSize: 16 }
                    : { fontSize: 18 }
                }
              />
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {"  "}
                {location}
              </Text>
            </Left>
            <Right>
              <Text
                style={[
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle,
                  { color: "#000" }
                ]}
              >
                {auction}
              </Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2B2B2B",
    flex: 1
  },
  textStyle: {
    fontSize: 16,
    paddingVertical: 4
  },
  textStyleSmall: {
    fontSize: 14,
    paddingVertical: 3
  },
  textStylePerformance: {
    fontWeight: "700",
    fontSize: 20,
    alignSelf: "center",
    color: "#378FDB"
  },
  textStylePerformanceSmall: {
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
    color: "#378FDB"
  },
  textStyleDemo: {
    position: "absolute",
    marginTop: 110,
    marginLeft: 5,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    color: "#333",
    opacity: 0.7,
    overflow: "hidden", //hides overflow from backgroundColor when having rounded borders
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  textStyleDemoSmall: {
    position: "absolute",
    marginTop: 85,
    marginLeft: 5,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    color: "#333",
    opacity: 0.7,
    overflow: "hidden", //hides overflow from backgroundColor when having rounded borders
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  imageStyle: {
    height: 250,
    width: null,
    flex: 1,
    resizeMode: "cover"
  },
  imageStyleSmall: {
    height: 200,
    width: null,
    flex: 1,
    resizeMode: "cover"
  },
  auctionEndText: {
    position: "absolute",
    marginTop: 205,
    marginLeft: 5,
    alignSelf: "center",
    padding: 5,
    color: "#fff"
  },
  auctionEndTextSmall: {
    position: "absolute",
    marginTop: 155,
    marginLeft: 5,
    alignSelf: "center",
    padding: 5,
    color: "#fff"
  },
  auctionSiteText: {
    position: "absolute",
    marginTop: 220,
    alignSelf: "center",
    padding: 5,
    color: "#fbfbfb",
    opacity: 0.6
  },
  auctionSiteTextSmall: {
    position: "absolute",
    marginTop: 170,
    alignSelf: "center",
    padding: 5,
    color: "#fbfbfb",
    opacity: 0.6
  }
});

function mapStateToProps(state) {
  const { strings } = state.locale;
  return { strings };
}

export default connect(
  mapStateToProps,
  actions
)(VehicleCardDemo);
