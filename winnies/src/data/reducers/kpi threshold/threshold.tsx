import { createSlice } from "@reduxjs/toolkit";
import { setThreshold } from "@actions/kpi threshold/threshold";
import { responseType, statusType } from "types/api";

const data: {
  [key: string]: responseType;
} = {};

const statusArray: statusType[] = [];

const thresholdSlice = createSlice({
  name: "threshold",
  initialState: {
    body: data,
    status: statusArray,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setThreshold.fulfilled, (state, action) => {
        state.status.push(statusType.succeeded);
        if (action.payload) {
          state.body[action.payload[0]?.EmpName] = action.payload[0];
        }
      })
      .addCase(setThreshold.pending, (state) => {
        state.status.push(statusType.loading);
      })
      .addCase(setThreshold.rejected, (state) => {
        state.status.push(statusType.failed);
        state.body = data;
      });
  },
});

export default thresholdSlice.reducer;
