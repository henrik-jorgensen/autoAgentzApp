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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIZE_THRESHOLD = 360;

class VehicleCard extends Component {
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
      auctionEndText,
      auctionEndTextSmall,
      auctionSiteText,
      auctionSiteTextSmall
    } = styles;

    return (
      <Content>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: imageUri }}
              style={
                SCREEN_WIDTH < SIZE_THRESHOLD ? imageStyleSmall : imageStyle
              }
            />
          </CardItem>
          <Text
            style={
              SCREEN_WIDTH < SIZE_THRESHOLD
                ? auctionEndTextSmall
                : auctionEndText
            }
          >
            Auction ends {auctionEndDate} at {auctionEndTime}
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
                {kW}kW/{horsePower}HP
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
                {doors} doors
              </Text>
            </Body>
            <Right>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {mileage} km
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {seats} seats
              </Text>
              <Text
                style={
                  SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle
                }
              >
                {transmissionType}, {transmissionGears}g
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
                  Days to sell
                </Text>
                <Text
                  style={
                    SCREEN_WIDTH < SIZE_THRESHOLD
                      ? textStylePerformanceSmall
                      : textStylePerformance
                  }
                >
                  {avgStockDaysSimilar}
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
                Sold 12 mths
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
                On stock
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

export default VehicleCard;
