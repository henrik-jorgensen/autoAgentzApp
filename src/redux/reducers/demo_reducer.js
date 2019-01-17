import { SHOW_DEMO, END_DEMO } from "../actions/types";

const INITIAL_STATE = { showDemo: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_DEMO:
      return { ...state, showDemo: true };
    case END_DEMO:
      return { ...state, showDemo: false };
    default:
      return state;
  }
}
