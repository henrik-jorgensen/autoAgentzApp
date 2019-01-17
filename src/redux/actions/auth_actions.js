import { AsyncStorage } from "react-native";

import {
  PREFIX_CHANGED,
  PHONE_CHANGED,
  CODE_CHANGED,
  LOGIN_USER_SUCCESS,
  SAVE_UID
} from "./types";

export const prefixChanged = prefix => {
  return {
    payload: prefix,
    type: PREFIX_CHANGED
  };
};

export const phoneChanged = number => {
  let formattedText = number.split(" ").join("");

  if (formattedText.length > 0) {
    formattedText = formattedText.match(new RegExp(".{1,2}", "g")).join(" ");
  }

  return {
    type: PHONE_CHANGED,
    payload: formattedText
  };
};

export const codeChanged = number => {
  let formattedText = number.split("  ").join("");

  if (formattedText.length > 0) {
    formattedText = formattedText.match(new RegExp(".{1,1}", "g")).join("  ");
  }

  return {
    type: CODE_CHANGED,
    payload: formattedText
  };
};

export const loginUserSuccess = user => async dispatch => {
  await AsyncStorage.setItem("uid", user.uid);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const saveUidToState = uid => {
  return {
    type: SAVE_UID,
    payload: uid
  };
};
