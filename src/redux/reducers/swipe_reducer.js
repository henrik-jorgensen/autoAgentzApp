import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import { INDEX_PLUS_1, RESET_INDEX } from "../actions/types";

const INITIAL_STATE = { index: 0 };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.swipe || { index: 0 };
    case INDEX_PLUS_1:
      return { ...state, index: state.index + 1 };
    case RESET_INDEX:
      return { ...state, index: 0 };
    default:
      return state;
  }
}
