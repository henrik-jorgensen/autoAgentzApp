import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from "react-native";

import * as actions from "../redux/actions";
import { IsIphoneXsMax } from "./common";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_THRESHOLD = 0.3 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: "id"
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right", gesture);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left", gesture);
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position };

    this.rotate = this.interpolate("-10deg", "0deg", "10deg");

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.interpolate(0, 0, 1);
    this.dislikeOpacity = this.interpolate(1, 0, 0);
    this.nextCardOpacity = this.interpolate(1, 0, 1);
    this.nextCardScale = this.interpolate(1, 0.8, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.props.resetIndex();
    }
  }

  forceSwipe(direction, gesture) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    const xSetOff = direction === "right" ? 100 : -100;
    Animated.timing(this.state.position, {
      toValue: { x: x + xSetOff, y: gesture.dy },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.props.index];

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.props.indexPlusOne();
    //if (this.props.index >= this.props.data.length) {
    //this.props.noMoreVehicles();
    //}
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
      friction: 4
    }).start();
  }

  interpolate(outputLeft, outputMiddle, outputRight) {
    return this.state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [outputLeft, outputMiddle, outputRight],
      extrapolate: "clamp"
    });
  }

  renderCards() {
    if (this.props.index >= this.props.data.length) {
      return (
        <View style={styles.cardStyle}>{this.props.renderNoMoreCards()}</View>
      );
    }

    return this.props.data
      .map((item, i) => {
        if (i < this.props.index) {
          return null;
        }

        if (i === this.props.index) {
          return (
            <Animated.View
              key={item[this.props.keyProp]}
              style={[
                this.rotateAndTranslate,
                styles.cardStyle,
                { zIndex: 99 }
              ]}
              {...this.state.panResponder.panHandlers}
            >
              <Animated.View
                style={[
                  { opacity: this.likeOpacity },
                  styles.likeTextAnimatedView
                ]}
              >
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>

              <Animated.View
                style={[
                  { opacity: this.dislikeOpacity },
                  styles.dislikeTextAnimatedView
                ]}
              >
                <Text style={styles.dislikeText}>NOPE</Text>
              </Animated.View>

              {this.props.renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[
              {
                opacity: this.nextCardOpacity,
                zIndex: 5,
                transform: [{ scale: this.nextCardScale }]
              },
              styles.cardStyle
            ]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    console.log("Swipe index #: " + this.props.index);
    return this.renderCards();
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    width: SCREEN_WIDTH,
    padding: 0,
    position: "absolute",
    borderRadius: 10,
    marginTop: 0
  },
  likeText: {
    borderWidth: 1,
    borderColor: "green",
    color: "white",
    backgroundColor: "green",
    overflow: "hidden",
    fontSize: 32,
    fontWeight: "800",
    padding: 10,
    borderRadius: 10
  },
  dislikeText: {
    borderWidth: 1,
    borderColor: "red",
    color: "white",
    backgroundColor: "red",
    overflow: "hidden", //hides overflow from backgroundColor when having rounded borders
    fontSize: 32,
    fontWeight: "800",
    padding: 10,
    borderRadius: 10
  },
  likeTextAnimatedView: {
    transform: [
      {
        rotate: "-30deg"
      }
    ],
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 1000
  },
  dislikeTextAnimatedView: {
    transform: [
      {
        rotate: "30deg"
      }
    ],
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 1000
  }
});

function mapStateToProps(state) {
  const { index } = state.swipe;
  return { index };
}

export default connect(
  mapStateToProps,
  actions
)(Swipe);
