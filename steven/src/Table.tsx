interface tableDataProps {
  children?: React.ReactNode;
  tableData?: {
    [propsName: string]: string;
  }[];
}
const Table = ({ tableData }: tableDataProps) => {
  return (
    <table>
      <tbody>
        {tableData &&
          tableData.map(
            (item: { [propsName: string]: string }, index: number) => {
              return (
                <tr key={index}>
                  {Object.keys(item).map((key: string, index: number) => {
                    return <td key={index}>{item[key]}</td>;
                  })}
                </tr>
              );
            }
          )}
      </tbody>
    </table>
  );
};
export default Table;
