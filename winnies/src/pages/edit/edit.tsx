import { Header } from "@layouts/header";
import { Outlet } from "react-router-dom";
import { Nav } from "@/layouts/edit nav";
import { useTranslation } from "react-i18next";

const EditPage = () => {
  const { t } = useTranslation(["settingPage"]);
  return (
    <>
      <Header title={t("title")} />
      <Nav />
      <Outlet />
    </>
  );
};

export default EditPage;
