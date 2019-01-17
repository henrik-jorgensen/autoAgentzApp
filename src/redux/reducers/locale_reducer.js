import { PERSIST_REHYDRATE } from "redux-persist/lib/constants";
import { CHANGE_LANGUAGE, UPDATE_STRINGS } from "../actions/types";

const INITIAL_STATE = {
  language: "",
  strings: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.locale || { language: "" };
    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    case UPDATE_STRINGS:
      return { ...state, strings: action.payload };
    default:
      return state;
  }
}
