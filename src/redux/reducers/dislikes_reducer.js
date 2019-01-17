import _ from "lodash";
import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import {
  DISLIKE_VEHICLE,
  CLEAR_LIKES_DISLIKES,
  VEHICLES_OUTDATED
} from "../actions/types";

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.dislikes || [];
    case DISLIKE_VEHICLE:
      // _.uniqBy makes sure that we don't save duplicate vehicles
      return _.uniqBy([action.payload, ...state], "id");
    case CLEAR_LIKES_DISLIKES:
      return [];
    case VEHICLES_OUTDATED:
      return [];
    default:
      return state;
  }
}
