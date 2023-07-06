import { useTheme } from "styled-components";

interface propsType {
  title: string;
}
export const Header = ({ title }: propsType) => {
  const color = useTheme()?.color;
  
  return (
    <header
      className={`p-2 text-xl`}
      style={{
        backgroundColor: color?.sectionHeader,
        color: color?.white,
      }}
    >
      {title}
    </header>
  );
};
