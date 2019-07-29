import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  Platform
} from "react-native";
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
  Right,
  Button
} from "native-base";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIZE_THRESHOLD = 360;
const BUTTON_WIDTH =
  Platform.OS === "ios" ? SCREEN_WIDTH - 36 : SCREEN_WIDTH - 40;

class VehicleCard extends Component {
  render() {
    const {
      auction,
      auctionEndDate,
      auctionEndTime,
      imageUri,
      auctionSite,
      url
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
      auctionSiteTextSmall,
      button
    } = styles;

    const {
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
    } = this.props.strings.vehicleCard;

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

          <CardItem>
            <Body>
              <TouchableOpacity
                style={button}
                onPress={() => {
                  if (url) {
                    Linking.openURL(url);
                  }
                  return;
                }}
              >
                <Text
                  style={[
                    SCREEN_WIDTH < SIZE_THRESHOLD ? textStyleSmall : textStyle,
                    { color: "#777" }
                  ]}
                >
                  Se flere detaljer på {auctionSite}
                </Text>
              </TouchableOpacity>
            </Body>
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
    fontSize: 14,
    paddingVertical: 4
  },
  textStyleSmall: {
    fontSize: 13,
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
  button: {
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 10,
    width: BUTTON_WIDTH,
    marginTop: -10
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
)(VehicleCard);
