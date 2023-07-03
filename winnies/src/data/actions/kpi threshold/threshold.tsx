import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

export const setThreshold = createAsyncThunk(
  "threshold/setThreshold",
  async (d: { year: string; id: string }) => {
    const res: responseType[] = await api.thresHold.fetch(d.year, d.id);
    return res;
  }
);
