import {
  NAME_CHANGED,
  COMPANY_CHANGED,
  WEBSITE_CHANGED,
  EMAIL_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  company: "",
  website: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case COMPANY_CHANGED:
      return { ...state, company: action.payload };
    case WEBSITE_CHANGED:
      return { ...state, website: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}
