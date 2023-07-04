import { Trans, useTranslation } from "react-i18next";
const TTT = () => {
  const { t, i18n } = useTranslation();
  const changeL = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const time = Date.now();

  const name = "AAA";
  const count = 1;
  const message = ["m1"];
  return (
    <>
      <h1>{t("hello")}</h1>
      <Trans
        i18nKey={"en"}
        count={2}
      >
        <h2>
          {t("a")}
          <span>{t("b")}</span>
        </h2>
      </Trans>
      <h1>{t("time", { time: time })}</h1>
      <div style={{ marginLeft: "1rem" }}>
        {t("apple", { count: 1 })}
      </div>

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
