import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import {
  SUBMITTED_LIKED_VEHICLES,
  FETCHED_NEW_VEHICLES,
  VEHICLES_OUTDATED,
  NO_LIKED_VEHICLES
} from "../actions/types";

const INITIAL_STATE = { submittedLikes: false, noLikes: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return (
        action.payload.likeStatus || { submittedLikes: false, noLikes: false }
      );
    case SUBMITTED_LIKED_VEHICLES:
      return { ...state, submittedLikes: true };
    case NO_LIKED_VEHICLES:
      return { ...state, noLikes: true };
    case FETCHED_NEW_VEHICLES:
      return INITIAL_STATE;
    case VEHICLES_OUTDATED:
      return INITIAL_STATE;
    default:
      return state;
  }
}
