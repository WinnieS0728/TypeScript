
import { Trans, useTranslation } from "react-i18next";
const TTT = () => {
  const { t, i18n } = useTranslation();
  const changeL = (lng: string) => {
    i18n.changeLanguage(lng)
  };
  return (
    <>
      <h1>{t("hello")}</h1>
      <Trans i18nKey={"en"}>
        <span>
          {t("a")}
          <h2>{t("中文的b")}</h2>
        </span>
      </Trans>

      <button
        type='button'
        onClick={() => {
          changeL("en");
        }}
      >
        en
      </button>
      <button
        type='button'
        onClick={() => {
          changeL("zh_tw");
        }}
      >
        tw
      </button>
    </>
  );
};

export default TTT;
