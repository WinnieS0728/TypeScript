

interface propsType {
  field: any;
  index: number;
  register: any;
}
export const TrList = ({ field, index, register }: propsType) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  return (
    <>
      <tr>
        <td rowSpan={2}>{index + 1}</td>
        <td rowSpan={2}>{field.EmpName}</td>
        <td>exist</td>
        {months.map((m) => (
          <td key={m}>
            <input
              type='number'
              {...register(`threshold.${index}[${m}].existCus`)}
              placeholder="..."
            />
          </td>
        ))}
      </tr>
      <tr>
        <td>new</td>
        {months.map((m) => (
          <td key={m}>
            <input
              type='number'
              {...register(`threshold.${index}[${m}].newCus`)}
              placeholder="..."
            />
          </td>
        ))}
      </tr>
    </>
  );
};
