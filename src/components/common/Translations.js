import da from "../../localization/da.json";
import en from "../../localization/en.json";

export const Translations = language => {
  switch (language) {
    case "da":
      return da;
    case "en":
      return en;
    default:
      return en;
  }
};
