import { SHOW_DEMO, END_DEMO } from "./types";

export const showDemoVehicles = () => {
  return {
    type: SHOW_DEMO
  };
};

export const endDemoVehicles = () => {
  return {
    type: END_DEMO
  };
};
