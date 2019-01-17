import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import {
  SUBMITTED_LIKED_VEHICLES,
  FETCHED_NEW_VEHICLES,
  VEHICLES_OUTDATED
} from "../actions/types";

const INITIAL_STATE = { submittedLikes: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.likeStatus || { submittedLikes: false };
    case SUBMITTED_LIKED_VEHICLES:
      return { ...state, submittedLikes: true };
    case FETCHED_NEW_VEHICLES:
      return { ...state, submittedLikes: false };
    case VEHICLES_OUTDATED:
      return { ...state, submittedLikes: false };
    default:
      return state;
  }
}
