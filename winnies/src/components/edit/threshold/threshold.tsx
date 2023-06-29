import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { yupResolver } from "@hookform/resolvers/yup";

import { useFieldArray, useForm } from "react-hook-form";
import { TrList } from "./tr";
import { useEffect } from "react";
import * as yup from "yup";

export const ThresholdSettingTable = () => {
  const salesList = useAppSelector((state) => state.member);
  const timeData = useAppSelector((state) => state.time);
  const thresholdData = useAppSelector((state) => state.threshold);

  const initData = salesList.body.map((p) => {
    const test = thresholdData.body.find((d) => d?.Empid === p?.EmpId);

    const t = test
      ? test
      : {
          Jan: "0",
          Feb: "0",
          Mar: "0",
          Apr: "0",
          May: "0",
          Jun: "0",
          Jul: "0",
          Aug: "0",
          Sep: "0",
          Oct: "0",
          Nov: "0",
          Dec: "0",
        };

    return {
      ...p,
      ...t,
    };
  });

  const percentSchema = {
    existCus: yup.number().min(0).max(100),
    newCus: yup.number().min(0).max(100),
  };

  const schema: any = yup.object()

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
    resolver: yupResolver(schema),
    defaultValues: {
      threshold: initData,
    },
  });

  console.log(errors);

  // const watchData = watch("threshold");
  // useEffect(() => {
  //   console.log(watchData);
  // }, [watchData]);

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
              {fields.map((field, index) => (
                <TrList
                  field={field}
                  index={index}
                  key={field.id}
                  register={register}
                />
              ))}
            </tbody>
          </table>
          <input
            type='submit'
            value='send'
          />
        </form>
      </>
    </Table>
  );
};
