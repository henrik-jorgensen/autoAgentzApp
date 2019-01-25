import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import {
  FETCHED_NEW_VEHICLES,
  NO_NEW_VEHICLES,
  NO_MORE_VEHICLES,
  SUBMITTED_LIKED_VEHICLES,
  VEHICLES_OUTDATED,
  NO_LIKED_VEHICLES
} from "../actions/types";

const INITIAL_STATE = {
  newDate: "",
  newStatus: false,
  noVehicles: true
};

// Get today's date
const date = new Date()
  .toJSON()
  .slice(0, 10)
  .replace(/-/g, "");

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.vehicleStatus || INITIAL_STATE;
    case NO_NEW_VEHICLES:
      return { ...state, newStatus: false };
    case FETCHED_NEW_VEHICLES:
      return {
        ...state,
        newDate: date,
        newStatus: true,
        noVehicles: false
      };
    case NO_MORE_VEHICLES:
      return { ...state, noVehicles: true };
    case SUBMITTED_LIKED_VEHICLES:
      return { ...state, newStatus: false };
    case NO_LIKED_VEHICLES:
      return { ...state, newStatus: false };
    case VEHICLES_OUTDATED:
      return { ...state, noVehicles: true };
    default:
      return state;
  }
}
