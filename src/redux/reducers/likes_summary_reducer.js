import _ from "lodash";
import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import { LIKE_VEHICLE, CLEAR_LIKES_DISLIKES } from "../actions/types";

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_VEHICLE:
      // _.uniqBy makes sure that we don't save duplicate vehicles
      return _.uniqBy(
        [
          {
            id: action.payload.id,
            auctionSite: action.payload.auctionSite,
            auction: action.payload.auction
          },
          ...state
        ],
        "id"
      );
    case CLEAR_LIKES_DISLIKES:
      return [];
    default:
      return state;
  }
}
