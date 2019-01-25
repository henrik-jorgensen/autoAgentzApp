import axios from "axios";
import { AsyncStorage } from "react-native";

import {
  LIKE_VEHICLE,
  DISLIKE_VEHICLE,
  FETCHED_NEW_VEHICLES,
  NEW_STATUS_FALSE,
  NO_MORE_VEHICLES,
  CLEAR_LIKES_DISLIKES,
  SUBMITTED_LIKED_VEHICLES,
  VEHICLES_OUTDATED,
  NO_LIKED_VEHICLES
} from "./types";
import URLs from "../../../constants/URLs";
import ApiKeys from "../../../constants/ApiKeys";

export const likeVehicle = vehicle => {
  return {
    payload: vehicle,
    type: LIKE_VEHICLE
  };
};

export const dislikeVehicle = vehicle => {
  return {
    payload: vehicle,
    type: DISLIKE_VEHICLE
  };
};

export const clearLikesDislikes = () => {
  return {
    type: CLEAR_LIKES_DISLIKES
  };
};

export const setNewStatusFalse = () => {
  return {
    type: NEW_STATUS_FALSE
  };
};

export const noMoreVehicles = () => {
  return {
    type: NO_MORE_VEHICLES
  };
};

export const vehiclesOutdated = () => {
  return {
    type: VEHICLES_OUTDATED
  };
};

export const noLikedVehicles = () => {
  return {
    type: NO_LIKED_VEHICLES
  };
};

export const fetchNewVehicles = uid => async dispatch => {
  try {
    console.log("trying to fetch new vehicles");
    let { data } = await axios.post(URLs.getNewVehicles, {
      uid: uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken
    });

    // Convert fetched object to array
    const newVehicles = dataToArray(data.newVehicles);

    dispatch({ type: FETCHED_NEW_VEHICLES, payload: newVehicles });
  } catch (error) {
    console.error(error);
  }
};

export const submitLikes = (uid, likesSummary) => async dispatch => {
  try {
    console.log("submitting likes");

    // Get today's date
    const date = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "");

    let { data } = await axios.post(URLs.addLikedVehicles, {
      uid: uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken,
      payload: { [date]: likesSummary }
    });

    dispatch({ type: SUBMITTED_LIKED_VEHICLES });
  } catch (error) {
    console.error(error);
  }
};

// Convert object to array
const dataToArray = data =>
  Object.entries(data).map(e => Object.assign(e[1], { key: e[0] }));
