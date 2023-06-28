import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { getWeek, isValid } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useTheme } from "styled-components";
import { timeDay, timeMonday, timeSunday } from "d3-time";
import { timeFormat } from "d3";
import { setWeekVisitData } from "@actions/visit data/set week visit";
import { GetData } from "./week data";

export const WeekTable = () => {
  const salesList = useAppSelector((state) => state.member);
  const timeData = useAppSelector((state) => state.time);
  const color = useTheme();
  const [value, setValue] = useState<string>("");

  const Filter = () => {
    const [selected, setSelected] = useState<Date>(new Date(timeData.today));
    const [month, setMonth] = useState<Date>(new Date(timeData.today));
    const [isShow, setShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const Footer = () => {
      const goToday = () => {
        setMonth(new Date(timeData.today));
        handleSelected(new Date(timeData.today));
      };
      return (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
            select 1 day
          </p>
          <button
            type='button'
            onClick={goToday}
          >
            Today
          </button>
        </span>
      );
    };

    function getTime(inputDate: Date): string {
      return timeFormat("%Y-%m-%d")(inputDate);
    }

    function handleSelected(d: Date | undefined) {
      if (!isValid(d)) return;
      setSelected(d as Date);
      const prevMonday = getTime(timeMonday(d));
      const s = timeSunday(d);
      const nextSunday = getTime(timeDay.offset(s, 7));
      const week = getWeek(d as Date);

      const value = `${prevMonday} - ${nextSunday} (w${week})`;
      setValue(value);

      dispatch(setWeekVisitData(prevMonday));
    }

    return (
      <>
        <label
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            position: "relative",
          }}
        >
          申請出差日期 :
          <input
            name={"week"}
            style={{
              cursor: "pointer",
              minWidth: "30ch",
              backgroundColor: color?.white,
              color: color?.black,
            }}
            autoComplete='off'
            placeholder='請選擇日期'
            value={value}
            onClick={() => {
              setShow((prev) => !prev);
            }}
            readOnly
          />
          <DayPicker
            mode='single'
            footer={<Footer />}
            selected={selected}
            onSelect={handleSelected}
            fromYear={2022}
            toYear={+timeData.thisYear + 1}
            month={month}
            onMonthChange={setMonth}
            captionLayout='dropdown-buttons'
            showWeekNumber
            formatters={{
              formatWeekNumber: (w) => `w${w}`,
            }}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              zIndex: 99,
              display: isShow ? "block" : "none",
            }}
            styles={{
              months: { backgroundColor: "black" },
            }}
          />
        </label>
      </>
    );
  };

  const visitData = GetData();
  console.log(visitData);

  function getNumber(name: string, key: string): number {
    const num = visitData.find((d) => d.name === name)?.visitData[key];

    return num as number;
  }
  function getPercent(d1: number, d2: number): string {
    const percent = d2 ? ((d1 / d2) * 100).toFixed(0) : "0";
    return percent;
  }

  return (
    <Table
      title='業務出差申請比例'
      filter={<Filter />}
    >
      <table>
        <thead>
          <tr>
            <td rowSpan={2}>業務</td>
            <td rowSpan={2}>預計拜訪店家總數</td>
            <td colSpan={3}>既有客戶</td>
            <td colSpan={2}>新客戶</td>
          </tr>
          <tr>
            <td>ATU 店家數</td>
            <td>輪胎店 店家數</td>
            <td>比例 %</td>
            <td>輪胎店店家數</td>
            <td>比例 %</td>
          </tr>
        </thead>
        <tbody>
          {salesList.body.map((i) => (
            <tr
              key={i?.EmpId}
              // style={{ backgroundColor: color?.error_table }}
            >
              <td>{i?.EmpName}</td>
              <td>{getNumber(i?.EmpName as string, "total")}</td>
              <td>{getNumber(i?.EmpName as string, "atu")}</td>
              <td>{getNumber(i?.EmpName as string, "existCus")}</td>
              <td>
                {getPercent(
                  getNumber(i?.EmpName as string, "old"),
                  getNumber(i?.EmpName as string, "total")
                ) + "%"}
              </td>
              <td>{getNumber(i?.EmpName as string, "newCus")}</td>
              <td>
                {getPercent(
                  getNumber(i?.EmpName as string, "newCus"),
                  getNumber(i?.EmpName as string, "total")
                ) + "%"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
};
