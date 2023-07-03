import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Table } from "@components/table/table";
import { getWeek, isSunday, isValid } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [selected, setSelected] = useState<Date>(new Date(timeData.today));
  const [firstTime, setFirstTime] = useState<boolean>(true);

  const Filter = () => {
    const [month, setMonth] = useState<Date>();
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

    interface dateInfo {
      monday: string;
      sunday: string;
      week: number;
    }

    const getDateInfo = useCallback((d: Date): dateInfo => {
      const prevMonday = getTime(timeMonday(d));

      let nextSunday;
      let week;
      if (isSunday(d as Date)) {
        nextSunday = getTime(d as Date);
        week = getWeek(d as Date) - 1;
      } else {
        const s = timeSunday(d);
        nextSunday = getTime(timeDay.offset(s, 7));
        week = getWeek(d as Date);
      }

      return {
        monday: prevMonday,
        sunday: nextSunday,
        week: week,
      };
    }, []);

    useEffect(() => {
      const m = getDateInfo(selected).monday;
      const s = getDateInfo(selected).sunday;
      const w = getDateInfo(selected).week;

      const value = `${m} - ${s} (w${w})`;
      setValue(value);

      if (firstTime === true) {
        dispatch(setWeekVisitData(m));
        setFirstTime(false);
      }
    }, [dispatch, getDateInfo]);

    function handleSelected(d: Date | undefined) {
      if (!isValid(d)) return;
      // console.log(d);
      setSelected(d as Date);
      const m = getDateInfo(d as Date).monday;
      dispatch(setWeekVisitData(m));
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
  // console.log(visitData);

  function getPercent(d1: number, d2: number): number {
    const percent = parseInt(((d1 / d2) * 100).toFixed(0));
    return percent ? percent : 0;
  }

  function getKpiThreshold(d: any) {
    const month = selected.toLocaleString("en", { month: "short" });
    const num = d.threshold?.[month];

    return parseInt(num);
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
            <td>輪胎店 店家數</td>
            <td>比例 %</td>
          </tr>
        </thead>
        <tbody>
          {visitData.map((d, index) => {
            const threshold = getKpiThreshold(d);            
            const isBad = getPercent(d.visitData.newCus, d.visitData.total) > threshold;

            return (
              <tr
                key={index}
                style={{
                  backgroundColor: isBad ? color?.error_table : "transparent",
                }}
              >
                <td>{d.name}</td>
                <td>{d.visitData.total}</td>
                <td>{d.visitData.atu}</td>
                <td>{d.visitData.existCus}</td>
                <td>{getPercent(d.visitData.old, d.visitData.total) + "%"}</td>
                <td>{d.visitData.newCus}</td>
                <td>
                  {getPercent(d.visitData.newCus, d.visitData.total) + "%"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Table>
  );
};
