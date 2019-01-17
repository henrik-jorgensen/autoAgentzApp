import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import { SHOW_CARD_HELP, HIDE_CARD_HELP } from "../actions/types";

const INITIAL_STATE = { swipeHelp: true };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.onboardingStatus || { swipeHelp: true };
    case SHOW_CARD_HELP:
      return { ...state, swipeHelp: true };
    case HIDE_CARD_HELP:
      return { ...state, swipeHelp: false };
    default:
      return state;
  }
}
