import { IS_CUSTOMER_TRUE, IS_CUSTOMER_FALSE } from "./types";

export const setIsCustomerTrue = () => {
  return {
    type: IS_CUSTOMER_TRUE
  };
};

export const setIsCustomerFalse = () => {
  return {
    type: IS_CUSTOMER_FALSE
  };
};
