import { responseType } from "@/types/api";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

interface propsType {
  member: responseType;
  index: number;
  register: UseFormRegister<{
    threshold: {
      existCus: number;
      newCus: number;
    }[];
  }>;
  fields: FieldArrayWithId<
    {
      threshold: {
        existCus: number;
        newCus: number;
      }[];
    },
    "threshold",
    "id"
  >[];
}
export const TrList = ({ member, index, register, fields }: propsType) => {
  return (
    <>
      <tr key={`${member?.EmpId} existCus`}>
        <td rowSpan={2}>{index + 1}</td>
        <td rowSpan={2}>{member?.EmpName}</td>
        <td>ATU & 既有客戶</td>
        {fields.map((field, index) => (
          <td key={field.id}>
            <input
              type='number'
              {...register(`threshold.${index}.existCus`, {
                valueAsNumber: true,
              })}
            />
          </td>
        ))}
      </tr>
      <tr key={`${member?.EmpId} newCus`}>
        <td>新客戶</td>
        {fields.map((field, index) => (
          <td key={field.id}>
            <input
              type='number'
              {...register(`threshold.${index}.newCus`, {
                valueAsNumber: true,
              })}
            />
          </td>
        ))}
      </tr>
    </>
  );
};
