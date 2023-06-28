import { styled, useTheme } from "styled-components";

interface propsType {
  text: string;
  className?: string;
}

const LinkBtn = ({ text, className }: propsType) => {
  return <button className={className}>{text}</button>;
};

const styled_linkBtn = styled(LinkBtn)`
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.white};
`;
export { styled_linkBtn as LinkBtn };
