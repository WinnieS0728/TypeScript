import { responseType } from "@/types/api";
import { useAppSelector } from "@hooks/redux";

export function GetData() {
  const visitData = useAppSelector((state) => state.weekVisit);
  const salesData = useAppSelector((state) => state.member);

  function getStorNumber(data: responseType[], key: string): number {
    if (!data) return 0;
    const num = data
      .filter((i) => i.ResourcesName === key)
      .map((i) => +i.Vqty)
      .reduce((a, b) => a + b, 0);
    return num;
  }

  function getSalesVisitData(name: string): {
    [key: string]: number;
  } {
    const data = visitData.body?.filter((i) => i.empname === name);

    const atu = getStorNumber(data, "拜訪A.T.U.") || 0;
    const existCus = getStorNumber(data, "拜訪現有客戶") || 0;
    const newCus = getStorNumber(data, "拜訪新客戶") || 0;
    const old = atu + existCus;
    const total = atu + existCus + newCus;

    return {
      atu,
      existCus,
      newCus,
      old,
      total,
    };
  }

  const salesDataList = salesData.body.map((i) => {
    const name = i ? i.EmpName : "";
    return {
      name: name,
      visitData: getSalesVisitData(name),
      threshold: 75,
    };
  });

  return salesDataList;
}
