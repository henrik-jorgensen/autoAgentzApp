import { Dimensions, Platform } from "react-native";

export const IsIphoneX = () => {
  let d = Dimensions.get("window");
  const { height, width } = d;

  if (Platform.OS === "ios" && (height === 812 || width === 812)) {
    return true;
  }

  return false;
};
