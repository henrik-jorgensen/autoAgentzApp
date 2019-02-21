import da from "../../localization/privacyPolicyDA.json";
import en from "../../localization/privacyPolicyEN.json";
import de from "../../localization/privacyPolicyDE.json";

export const PrivacyPolicy = language => {
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
