import { CHANGE_LANGUAGE, UPDATE_STRINGS } from "./types";
import { Translations } from "../../components/common/Translations";

export const saveStringsToState = strings => {
  return {
    type: UPDATE_STRINGS,
    payload: strings
  };
};

export const setLanguage = language => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language
  };
};
