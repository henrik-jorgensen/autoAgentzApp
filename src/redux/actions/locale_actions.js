import { CHANGE_LANGUAGE, UPDATE_STRINGS } from "./types";
import { Translations } from "../../components/common/Translations";
import axios from "axios";

import URLs from "../../../constants/URLs";
import ApiKeys from "../../../constants/ApiKeys";

export const saveStringsToState = strings => {
  return {
    type: UPDATE_STRINGS,
    payload: strings
  };
};

/*export const setLanguage = language => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language
  };
};*/

export const setLanguage = (language, uid) => async dispatch => {
  try {
    await axios.post(URLs.updateLanguage, {
      uid: uid,
      accountSid: ApiKeys.CloudFunctions.accountSid,
      authToken: ApiKeys.CloudFunctions.authToken,
      payload: {
        language: language
      }
    });

    dispatch({ type: CHANGE_LANGUAGE, payload: language });
  } catch (error) {
    console.error(error);
  }
};
