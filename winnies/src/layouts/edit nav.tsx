import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

interface propsType {
  className?: string;
}

const Nav = ({ className }: propsType) => {
  const {t} = useTranslation(['settingPage'])
  return (
    <>
      <nav className={className}>
        <div className='container-fluid'>
          <ul className='row p-2 gap-2 m-0'>
            <NavLink
              end
              to={"tx"}
              className={"col-auto"}
            >
              {t('nav.tx')}
            </NavLink>
            <NavLink
              end
              to={"threshold"}
              className={"col-auto"}
            >
              {t('nav.threshold')}
            </NavLink>
            <NavLink
              end
              to={"store"}
              className={"col-auto"}
            >
              {t('nav.store achieve')}
            </NavLink>
            <NavLink
              end
              to={"osom"}
              className={"col-auto"}
            >
              {t('nav.osom achieve')}
            </NavLink>
          </ul>
        </div>
      </nav>
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
