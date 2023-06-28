import { Header } from "@layouts/header";
import { Outlet } from "react-router-dom";
import { Nav } from "@/layouts/edit nav";

const EditPage = () => {
  return (
    <>
      <Header title='德國業務KPI設定' />
      <Nav />
      <Outlet />
    </>
  );
};

export default EditPage;
