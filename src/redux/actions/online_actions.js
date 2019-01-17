import { IS_CONNECTED, IS_NOT_CONNECTED } from "./types";

export const setIsConnected = () => {
  return {
    type: IS_CONNECTED
  };
};

export const setIsNotConnected = () => {
  return {
    type: IS_NOT_CONNECTED
  };
};
