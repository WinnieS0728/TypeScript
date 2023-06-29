import axios from "axios";

export function getThresHold(apiPath: string) {
  return async function (year: string, id: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSalesCom`,
      data: {
        YYYY: year, //西元年
        EmpId: id, //員工
        TYPE: "TripEvent-7", //類型 如即有客戶
      },
    });
    return res.data;
  };
}
