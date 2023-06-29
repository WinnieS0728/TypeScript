import { Header } from "@layouts/header";
import { Outlet } from "react-router-dom";
import { Nav } from "@/layouts/edit nav";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setThreshold } from "@/data/actions/kpi threshold/threshold";

const EditPage = () => {
  const timeData = useAppSelector((state) => state.time);
  const salesList = useAppSelector((state) => state.member).body;

  const dispatch = useAppDispatch();
  useEffect(() => {
    for (const item of salesList) {
      dispatch(
        setThreshold({ year: timeData.thisYear, id: item?.EmpId as string })
      );
    }
  }, []);
  return (
    <>
      <Header title='德國業務KPI設定' />
      <Nav />
      <Outlet />
    </>
  );
};

export default EditPage;
