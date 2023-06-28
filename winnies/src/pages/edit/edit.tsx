import { LinkBtn } from "@/components/UI/buttons";
import { Header } from "@layouts/header";
import { NavLink } from "react-router-dom";

import * as btn from "@buttons";
import { useTheme } from "styled-components";
import { Nav } from "@/layouts/edit nav";

const EditPage = () => {
  const color = useTheme();
  return (
    <>
      <Header title='德國業務KPI設定' />
      <Nav />
    </>
  );
};

export default EditPage;
