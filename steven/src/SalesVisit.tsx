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
  function toInputString(date: string): string {
    return `${new Date(date).getFullYear().toString()}-${(
      new Date(date).getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${new Date(date)
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
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
        value={toInputString(salesVisit.Startdt)}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      &emsp;~&emsp;
      <input
        type="date"
        name="Enddt"
        id="Enddt"
        readOnly
        value={toInputString(
          getFriday(
            getMonday(new Date(salesVisit.Startdt))
          ).toLocaleDateString()
        )}
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
      <table>
        <thead>
          <th>form</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <form action="">
                <table>
                  <thead>
                    <tr>
                      <th>QQ</th>
                      <th>aa</th>
                      <th>bb</th>
                      <th>ss</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesVisit;
