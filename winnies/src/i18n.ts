import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import en from "@locales/en/translate.json";
import tw from "@locales/zh-tw/translate.json";

const resources = {
  en: {
    translation: en,
  },
  zh_tw: {
    translation: tw,
  },
};

i18n
  // .use(Backend)
  .use(initReactI18next)
  .init({
    // backend: {
    //   loadPath: "/locales/{{lng}}/{{ns}}.json",
    // },
    resources,
    lng: "zh_tw",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
