import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

const salesMemberList = [
  // "223001",
  "ER221002",
  "ER221003",
  "ER222003",
  "ER219003",
  "ER222002",
  "ER223002",
];

export const setSalesList = createAsyncThunk(
  "salesList/setSalesList",
  async () => {
    const res: responseType[] = await api.getMember();
    const salesList = salesMemberList.map((id) => {
      const list = res.find((i) => i.EmpId === id);
      return list;
    });
    return salesList;
  }
);
