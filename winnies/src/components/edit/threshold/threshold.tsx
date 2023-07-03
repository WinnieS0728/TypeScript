import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { yupResolver } from "@hookform/resolvers/yup";

import { useFieldArray, useForm } from "react-hook-form";
import { TrList } from "./tr";
import * as yup from "yup";
import { GetData } from "./data";
import { useCallback, useEffect, useState } from "react";
import { SubmitBtn } from "@/components/UI/buttons";
import api from "@/lib/api";
import { setThreshold } from "@/data/actions/kpi threshold/threshold";

export const ThresholdSettingTable = () => {
  const salesList = useAppSelector((state) => state.member);
  const timeData = useAppSelector((state) => state.time);
  const nowUser = useAppSelector((state) => state.EmpID);
  const [selected, setSelected] = useState<string>("");
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    for (const item of salesList.body) {
      dispatch(
        setThreshold({ year: timeData.thisYear, id: item?.EmpId as string })
      );
    }
  }, []);

  const monthAry = [
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

  const initData = salesList.body.map((p) => {
    const defaultObject: dataType = {
      existCus: 0,
      newCus: 0,
    };

    const fineObject: {
      [keys: string]: typeof defaultObject;
    } = {};
    for (const m of monthAry) {
      fineObject[`${m}`] = defaultObject;
    }

    return {
      EmpName: p?.EmpName,
      EmpId: p?.EmpId,
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
      threshold: initData as any,
    },
  });

  const { fields, replace } = useFieldArray({
    name: `threshold`,
    control,
  });

  if (Object.keys(errors).length !== 0) {
    console.log(errors);
  }

  const dataSet = GetData().dataSet;
  const status = GetData().status;
  const dataExist = GetData().dataExist;

  useEffect(
    function () {
      if (
        status.filter((i) => i === "succeeded").length === salesList.body.length
      ) {
        replace(dataSet);
      }
    },
    [status]
  );

  const go = useCallback(
    function (type: string) {
      const spreadName = selected.split(".");
      const index = parseInt(spreadName[1]);
      const month = spreadName[2];

      setValue(
        `threshold.${index}.${month}.${type}` as const,
        100 - selectNumber
      );
    },
    [selectNumber, selected, setValue]
  );

  useEffect(() => {
    if (selected.endsWith("existCus")) {
      // console.log("修改既有客戶");
      go("newCus");
    } else if (selected.endsWith("newCus")) {
      // console.log("修改新客戶");
      go("existCus");
    }
  }, [selected, go]);

  async function sendApiRequest(
    index: number,
    id: string,
    data: {
      [keys: string]: number | undefined;
    }
  ) {
    const checkDataIsExist = await dataExist;
    const res = api.thresHold.post(
      timeData.thisYear,
      id,
      data,
      checkDataIsExist[index],
      nowUser
    );
    return res;
  }

  async function onSubmit(d: { threshold: any }) {
    // console.log(d);
    const data = d.threshold;
    // console.log(data);

    const postStatus = Promise.all(
      data.map(async (d: any, index: number) => {
        const monthData: { [keys: string]: number | undefined } = {};
        for (const m of monthAry) {
          monthData[m] = d?.[m]?.newCus;
        }

        return {
          name: d.EmpName,
          status: await sendApiRequest(index, d.EmpId, monthData),
        };
      })
    );

    const p = await postStatus;
    if (p.map((i) => i.status).every((i) => i === "設定新增完成")) {
      alert('設定成功')
    } else {
      alert(
        `${p
          .filter((i) => i.status !== "設定新增完成")
          .map((i) => i.name)
          .join(",")} 設定失敗`
      );
      
    }
  }

  return (
    <>
      <SubmitBtn text='儲存' />
      <Table title='客戶拜訪佔比警示值'>
        <>
          <form
            id='threshold'
            onSubmit={handleSubmit(onSubmit as any)}
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
