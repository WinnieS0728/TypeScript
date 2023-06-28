import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { setPersonVisitData } from "@/data/actions/visit data/set person visit";
import { GetData } from "./year data";

export const YearTable = () => {
  const color = useTheme();

  const monthAry = [];
  for (let i = 1; i < 13; i++) {
    monthAry.push(`${i}月`);
  }

  const [id, setId] = useState("");

  const dispatch = useAppDispatch();

  const Filter = () => {
    const salesList = useAppSelector((state) => state.member);
    const dataSet = salesList.body;

    function handleChange(id: string) {
      dispatch(setPersonVisitData(id));
      setId(id);
    }

    return (
      <>
        <label style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          業務 :
          <select
            onChange={(e) => handleChange(e.target.value)}
            value={id}
            style={{
              backgroundColor: color?.white,
              color: color?.black,
              borderRadius: ".5rem",
            }}
          >
            <option value="default">請選擇</option>
            {dataSet.map((i) => (
              <option key={i?.EmpId} value={i?.EmpId}>
                {i?.EmpName}
              </option>
            ))}
          </select>
        </label>
      </>
    );
  };

  const dataSet = GetData();

  return (
    <Table title="每月出差申請數比例" filter={<Filter />}>
      <table>
        <thead style={{ color: color?.black }}>
          <tr>
            <td>Type</td>
            {monthAry.map((i) => (
              <td key={i}>{i}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ATU</td>
            {dataSet.atu.map((i, index) => (
              <td key={index}>{i ? i + "%" : ""}</td>
            ))}
          </tr>
          <tr>
            <td>Existing customer</td>
            {dataSet.existCus.map((i, index) => (
              <td key={index}>{i ? i + "%" : ""}</td>
            ))}
          </tr>
          <tr>
            <td>New customer</td>
            {dataSet.newCus.map((i, index) => (
              <td key={index}>{i ? i + "%" : ""}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Table>
  );
};
