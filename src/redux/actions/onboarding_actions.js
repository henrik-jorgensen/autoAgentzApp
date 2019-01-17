import { SHOW_CARD_HELP, HIDE_CARD_HELP } from "./types";

export const showCardHelp = () => {
  return {
    type: SHOW_CARD_HELP
  };
};

export const hideCardHelp = () => {
  return {
    type: HIDE_CARD_HELP
  };
};
