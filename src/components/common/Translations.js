import da from "../../localization/da.json";
import en from "../../localization/en.json";
import de from "../../localization/de.json";

export const Translations = language => {
  switch (language) {
    case "da":
      return da;
    case "en":
      return en;
    case "de":
      return de;
    default:
      return en;
  }
};
