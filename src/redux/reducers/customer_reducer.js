import { IS_CUSTOMER_TRUE, IS_CUSTOMER_FALSE } from "../actions/types";

const INITIAL_STATE = { isCustomer: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_CUSTOMER_TRUE:
      return { ...state, isCustomer: true };
    case IS_CUSTOMER_FALSE:
      return { ...state, isCustomer: false };
    default:
      return state;
  }
}
