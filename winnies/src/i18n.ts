import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import en from "@locales/en/test.json";
import tw from "@locales/zh-tw/test.json";
import LanguageDetector from "i18next-browser-languagedetector";

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
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // backend: {
    //   loadPath: "/locales/{{lng}}/{{ns}}.json",
    // },
    // debug: true,
    resources,
    // lng: "zh_tw",
    fallbackLng: "zh_tw",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
