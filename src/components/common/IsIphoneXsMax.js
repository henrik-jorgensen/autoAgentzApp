import { Dimensions, Platform } from "react-native";

export const IsIphoneXsMax = () => {
  let d = Dimensions.get("window");
  const { height, width } = d;

  if (Platform.OS === "ios" && (height === 896 || width === 896)) {
    return true;
  }

  return false;
};
