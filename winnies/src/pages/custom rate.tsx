import { WeekTable } from "@/components/business-apply/week table";
import { YearTable } from "@/components/business-apply/year table";
import { Main } from "@/layouts/main";
import { Section } from "@/layouts/section";
import { Header } from "@layouts/header";
import { useTranslation } from "react-i18next";

const CustomRatePage = () => {
  const { t } = useTranslation(["customRatePage"]);
  return (
    <>
      <Header title={t("pageTitle")} />
      <Main>
        <>
          <Section>
            <YearTable />
          </Section>
          <Section>
            <WeekTable />
          </Section>
        </>
      </Main>
    </>
  );
};

export default CustomRatePage;
