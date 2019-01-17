import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import { FETCHED_NEW_VEHICLES, VEHICLES_OUTDATED } from "../actions/types";

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.vehicles || [];
    case FETCHED_NEW_VEHICLES:
      return action.payload;
    case VEHICLES_OUTDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}
