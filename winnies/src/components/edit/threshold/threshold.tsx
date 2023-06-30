import { useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { yupResolver } from "@hookform/resolvers/yup";

import { useFieldArray, useForm } from "react-hook-form";
import { TrList } from "./tr";
import * as yup from "yup";
import { GetData } from "./data";
import { useCallback, useEffect, useState } from "react";
import { monthType } from "@/types";
import { SubmitBtn } from "@/components/UI/buttons";

export const ThresholdSettingTable = () => {
  const salesList = useAppSelector((state) => state.member);
  const [selected, setSelected] = useState<string>("");
  const [selectNumber, setSelectNumber] = useState<number>(0);
  const monthAry: monthType[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  interface dataType {
    existCus: number;
    newCus: number;
  }

  type dataInMonthType = {
    [key in monthType]?: dataType;
  };

  const initData = salesList.body.map((p) => {
    const defaultObject: dataType = {
      existCus: 0,
      newCus: 0,
    };

    const fineObject: dataInMonthType = {};
    for (const m of monthAry) {
      fineObject[`${m}`] = defaultObject;
    }

    return {
      EmpName: p?.EmpName,
      ...fineObject,
    };
  });

  const percentSchema = yup.object({
    existCus: yup
      .number()
      .min(0, "百分比不可小於0")
      .max(100, "百分比不可大於100"),
    newCus: yup
      .number()
      .min(0, "百分比不可小於0")
      .max(100, "百分比不可大於100"),
  });

  const monthSchema = yup.object({
    Jan: percentSchema,
    Feb: percentSchema,
    Mar: percentSchema,
    Apr: percentSchema,
    May: percentSchema,
    Jun: percentSchema,
    Jul: percentSchema,
    Aug: percentSchema,
    Sep: percentSchema,
    Oct: percentSchema,
    Nov: percentSchema,
    Dec: percentSchema,
  });

  const schema = yup.object({
    threshold: yup.array().of(monthSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      threshold: initData,
    },
  });

  const { fields, replace } = useFieldArray({
    name: "threshold",
    control,
  });

  function onSubmit(d: unknown) {
    console.log(d);
  }

  if (Object.keys(errors).length !== 0) {
    console.log(errors);
  }

  const dataSet = GetData().dataSet;
  const status = GetData().status;

  const setData = useCallback(
    function () {
      replace(dataSet);
    },
    [dataSet, replace]
  );

  useEffect(() => {
    if (status === "succeeded") {
      setData();
    }
  }, [status]);

  const go = useCallback(
    function (type: string) {
      if (selectNumber === 0) {
        return;
      }

      const spreadName = selected.split(".");
      const index = parseInt(spreadName[1]);
      const month = spreadName[2];

      setValue(`threshold.${index}.${month}.${type}`, 100 - selectNumber);

      setSelectNumber(0);
    },
    [selectNumber, selected, setValue]
  );

  useEffect(() => {
    if (selected.endsWith("existCus")) {
      console.log("修改既有客戶");
      go("newCus");
    } else if (selected.endsWith("newCus")) {
      console.log("修改新客戶");
      go("existCus");
    }
  }, [selected, go]);

  return (
    <>
      <SubmitBtn text="儲存" />
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
                    setSelected={setSelected}
                    setSelectNumber={setSelectNumber}
                  />
                ))}
              </tbody>
            </table>
          </form>
        </>
      </Table>
    </>
  );
};
