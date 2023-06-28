import { WeekTable } from "@/components/business-apply/week table";
import { YearTable } from "@/components/business-apply/year table";
import { Header } from "@layouts/header";
import { useTheme } from "styled-components";

const CustomRatePage = () => {
  return (
    <>
      <Header title='業務出差申請佔比' />
      <div className='container-fluid'>
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
