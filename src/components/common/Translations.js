import da from "../../localization/da.json";
import en from "../../localization/en.json";
import de from "../../localization/de.json";
import termsDA from "../../localization/termsDA.json";
import termsDE from "../../localization/termsDE.json";
import termsEN from "../../localization/termsEN.json";
import privacyPolicyDA from "../../localization/privacyPolicyDA.json";
import privacyPolicyDE from "../../localization/privacyPolicyDE.json";
import privacyPolicyEN from "../../localization/privacyPolicyEN.json";

export const Translations = language => {
  switch (language) {
    case "da":
      return da;
    case "en":
      return en;
    /*case "de":
      return de;*/
    default:
      return en;
  }
};

export const Terms = language => {
  switch (language) {
    case "da":
      return termsDA;
    case "en":
      return termsEN;
    /*case "de":
      return termsDE;*/
    default:
      return termsEN;
  }
};

export const PrivacyPolicy = language => {
  switch (language) {
    case "da":
      return privacyPolicyDA;
    case "en":
      return privacyPolicyEN;
    /*case "de":
      return privacyPolicyDE;*/
    default:
      return privacyPolicyEN;
  }
};
