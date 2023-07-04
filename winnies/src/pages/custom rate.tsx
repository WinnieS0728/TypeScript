import { WeekTable } from "@/components/business-apply/week table";
import { YearTable } from "@/components/business-apply/year table";
import { Header } from "@layouts/header";
import { useTranslation } from "react-i18next";

const CustomRatePage = () => {
  const { t } = useTranslation(["customRatePage"]);
  return (
    <>
      <Header title={t("pageTitle")} />
      <div className='container-fluid py-3'>
        <div className='row mb-3'>
          <YearTable />
        </div>
        <div className='row mb-3'>
          <WeekTable />
        </div>
      </div>
    </>
  );
};

export default CustomRatePage;
