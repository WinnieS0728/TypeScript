import { useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { yupResolver } from "@hookform/resolvers/yup";
import { tr } from "date-fns/locale";
import { useFieldArray, useForm } from "react-hook-form";
import { TrList } from "./tr";
import { responseType } from "@/types/api";

export const ThresholdSettingTable = () => {
  const salesList = useAppSelector((state) => state.member);
  const defaultValue = [];
  for (let m = 0; m < 12; m++) {
    defaultValue.push({
      existCus: 0,
      newCus: 0,
    });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      threshold: defaultValue,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    name: "threshold",
    control,
  });

  function onSubmit(d: unknown) {
    console.log(d);
  }

  return (
    <Table title='客戶拜訪佔比警示值'>
      <>
        <form
          id='threshold'
          onSubmit={handleSubmit(onSubmit)}
        >
          <table>
            <thead>
              <tr>
                <td>NO.</td>
                <td>業務</td>
                <td>客戶類別</td>
                <td>1月</td>
                <td>2月</td>
                <td>3月</td>
                <td>4月</td>
                <td>5月</td>
                <td>6月</td>
                <td>7月</td>
                <td>8月</td>
                <td>9月</td>
                <td>10月</td>
                <td>11月</td>
                <td>12月</td>
              </tr>
            </thead>
            <tbody>
              {salesList.body.map((member, index) => {
                return (
                  <TrList
                    key={member?.EmpId}
                    index={index}
                    member={member as responseType}
                    register={register}
                    fields={fields}
                  />
                );
              })}
            </tbody>
          </table>
        </form>
        <input
          form='threshold'
          type='submit'
          value='send'
        />
      </>
    </Table>
  );
};
