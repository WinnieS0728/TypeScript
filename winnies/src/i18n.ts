import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import common_tw from "@locales/zh-TW/common.json";
import customRatePage_tw from "@locales/zh-TW/custom rate page.json";
import settingPage_tw from "@locales/zh-TW/setting/settingPage.json";
import threshold_tw from "@locales/zh-TW/setting/threshold.json";
import validation_tw from "@locales/zh-TW/validation.json";

import common_en from "@locales/en/common.json";
import customRatePage_en from "@locales/en/custom rate page.json";
import settingPage_en from "@locales/en/setting/settingPage.json";
import threshold_en from "@locales/en/setting/threshold.json";

import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    common: common_en,
    customRatePage: customRatePage_en,
    settingPage: settingPage_en,
    threshold: threshold_en,
  },
  zh_tw: {
    common: common_tw,
    validation: validation_tw,
    customRatePage: customRatePage_tw,
    settingPage: settingPage_tw,
    threshold: threshold_tw,
  },
};

i18n
  .use(Backend)
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
