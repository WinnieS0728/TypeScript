import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
const SalesVisit = () => {
  interface SalesVisitInput {
    EmpId: string;
    Startdt: string;
    Enddt: string;
    type: string;
  }
  type TableData = {
    [propsName: string]: string;
  };
  const [salesVisit, setSalesVisit] = useState<SalesVisitInput>({
    EmpId: "",
    Startdt: new Date().toLocaleDateString(),
    Enddt: getFriday(new Date()).toLocaleDateString(),
    type: "Week",
  });
  const [tableData, setTableData] = useState<TableData[]>();
  //to count monday's date
  function getMonday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  function getFriday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -2 : 5); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSalesVisit((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  useEffect(() => {
    async function getSalesVisitData(data: SalesVisitInput) {
      try {
        const res = await axios.post(
          "https://orangeapi.orange-electronic.com/api/GetSalesVisit",
          {
            ...salesVisit,
            Startdt: getMonday(
              new Date(salesVisit.Startdt)
            ).toLocaleDateString(),
            Enddt: getFriday(
              getMonday(new Date(salesVisit.Startdt))
            ).toLocaleDateString(),
          }
        );
        setTableData((await res.data) as TableData[]);
      } catch (e) {
        console.log(e);
      }
    }
    getSalesVisitData(salesVisit);
  }, [salesVisit]);
  return (
    <div>
      <input
        type="date"
        name="Startdt"
        id="Startdt"
        value={`${new Date(salesVisit.Startdt).getFullYear().toString()}-${(
          new Date(salesVisit.Startdt).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${new Date(salesVisit.Startdt)
          .getDate()
          .toString()
          .padStart(2, "0")}`}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        type="date"
        name="Enddt"
        id="Enddt"
        readOnly
        value={`${getFriday(new Date(salesVisit.Startdt))
          .getFullYear()
          .toString()}-${(
          getFriday(new Date(salesVisit.Startdt)).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${getFriday(new Date(salesVisit.Startdt))
          .getDate()
          .toString()
          .padStart(2, "0")}`}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      <span>
        {"搜尋區間: " +
          getMonday(new Date(salesVisit.Startdt)).toLocaleDateString() +
          "~" +
          getFriday(
            getMonday(new Date(salesVisit.Startdt))
          ).toLocaleDateString()}
      </span>
      <Table tableData={tableData} />
    </div>
  );
};

export default SalesVisit;
