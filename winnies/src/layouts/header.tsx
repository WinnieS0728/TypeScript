import { useTheme } from "styled-components";

interface propsType {
  title: string;
}
export const Header = ({ title }: propsType) => {
  const color = useTheme();
  return (
    <header
      className='header'
      style={{
        backgroundColor: color?.sectionHeader,
        color: color?.white,
        padding: ".5em",
        fontSize: "1.25rem",
      }}
    >
      {title}
    </header>
  );
};
