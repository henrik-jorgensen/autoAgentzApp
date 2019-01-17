import { INDEX_PLUS_1, RESET_INDEX } from "./types";

export const indexPlusOne = () => {
  return {
    type: INDEX_PLUS_1
  };
};

export const resetIndex = () => {
  return {
    type: RESET_INDEX
  };
};
