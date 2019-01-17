import {
  PREFIX_CHANGED,
  PHONE_CHANGED,
  CODE_CHANGED,
  ACTIVATE_LOADING,
  LOGIN_USER_SUCCESS,
  SAVE_UID
} from "../actions/types";

const INITIAL_STATE = {
  prefix: "45",
  phone: "",
  code: "",
  token: null,
  user: {},
  uid: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PREFIX_CHANGED:
      return { ...state, prefix: action.payload };
    case PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case CODE_CHANGED:
      return { ...state, code: action.payload };
    case ACTIVATE_LOADING:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        code: "",
        user: action.payload,
        uid: action.payload.uid
      };
    case SAVE_UID:
      return { ...state, uid: action.payload };
    default:
      return state;
  }
}
