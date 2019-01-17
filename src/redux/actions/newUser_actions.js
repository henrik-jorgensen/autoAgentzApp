import {
  NAME_CHANGED,
  COMPANY_CHANGED,
  WEBSITE_CHANGED,
  EMAIL_CHANGED
} from "./types";

export const nameChanged = text => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const companyChanged = text => {
  return {
    type: COMPANY_CHANGED,
    payload: text
  };
};

export const websiteChanged = text => {
  return {
    type: WEBSITE_CHANGED,
    payload: text
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
