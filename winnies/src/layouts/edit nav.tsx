import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";

interface propsType {
  className?: string;
}

const Nav = ({ className }: propsType) => {
  return (
    <>
      <nav className={className}>
        <div className='container-fluid'>
          <ul className='row p-2 gap-2'>
            <NavLink
              end
              to={"tx"}
              className={"col-auto"}
            >
              業務TX目標銷售數量
            </NavLink>
            <NavLink
              end
              to={"threshold"}
              className={"col-auto"}
            >
              客戶拜訪佔比警示值
            </NavLink>
            <NavLink
              end
              to={"store"}
              className={"col-auto"}
            >
              拜訪店家目標設定
            </NavLink>
            <NavLink
              end
              to={"osom"}
              className={"col-auto"}
            >
              OSOM項目目標設定
            </NavLink>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

const styled_nav = styled(Nav)`
    background-color: ${(props) => props.theme.navBgc};

    a {
        border: 1px solid ${(props) => props.theme.white};
        color: ${(props) => props.theme.white};
        border-radius: .5rem;
        padding: .2em .5em;

        &.active {
            background-color: ${(props) => props.theme.navActive};
        }
    }
`;

export { styled_nav as Nav };
