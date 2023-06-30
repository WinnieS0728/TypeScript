import { useAppSelector } from "@/hooks/redux";
import { log } from "console";
import { useEffect } from "react";

export function GetData() {
  const salesList = useAppSelector((state) => state.member);
  const threshold = useAppSelector((state) => state.threshold);

  const data = salesList.body.map((p) => {
    function value2Object(value: string) {
      return {
        existCus: (100 - parseInt(value)) | 0,
        newCus: parseInt(value) | 0,
      };
    }

    const targetObject = threshold.body[p?.EmpName as string];

    return {
      EmpName: p?.EmpName,
      Jan: value2Object(targetObject?.Jan),
      Feb: value2Object(targetObject?.Feb),
      Mar: value2Object(targetObject?.Mar),
      Apr: value2Object(targetObject?.Apr),
      May: value2Object(targetObject?.May),
      Jun: value2Object(targetObject?.Jun),
      Jul: value2Object(targetObject?.Jul),
      Aug: value2Object(targetObject?.Aug),
      Sep: value2Object(targetObject?.Sep),
      Oct: value2Object(targetObject?.Oct),
      Nov: value2Object(targetObject?.Nov),
      Dec: value2Object(targetObject?.Dec),
    };
  });

  const status = threshold.status;
  //   console.log({ data });
  return {
    dataSet: data,
    status: status,
  };
}
