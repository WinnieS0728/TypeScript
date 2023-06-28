import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
const SalesVisit = () => {
  interface SalesVisitInput {
    EmpId: string;
    Startdt: string;
    Enddt?: string;
    type: string;
  }
  type TableData = {
    [propsName: string]: string;
  };
  const [salesVisit, setSalesVisit] = useState<SalesVisitInput>({
    EmpId: "",
    Startdt: new Date().toLocaleDateString(),
    Enddt: "",
    type: "Week",
  });
  const [tableData, setTableData] = useState<TableData[]>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.name, e.target.value);
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
          salesVisit
        );
        const tableData = (await res.data) as TableData[];
        console.log(tableData);
        setTableData(tableData);
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
        value={salesVisit.Startdt}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <span>{salesVisit.Startdt}</span>
      <Table tableData={tableData} />
    </div>
  );
};

export default SalesVisit;
