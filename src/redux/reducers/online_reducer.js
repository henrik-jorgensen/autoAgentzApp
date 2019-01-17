import { IS_CONNECTED, IS_NOT_CONNECTED } from "../actions/types";

const INITIAL_STATE = { isConnected: true };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_CONNECTED:
      return { ...state, isConnected: true };
    case IS_NOT_CONNECTED:
      return { ...state, isConnected: false };
    default:
      return state;
  }
}
