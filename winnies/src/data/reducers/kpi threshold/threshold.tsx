import { createSlice } from "@reduxjs/toolkit";
import { setThreshold } from "@actions/kpi threshold/threshold";
import { stateType, statusType } from "types/api";

const data: stateType = [];

const thresholdSlice = createSlice({
  name: "threshold",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setThreshold.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        if (action.payload) {
          state.body.push(...action.payload);
        }
      })
      .addCase(setThreshold.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setThreshold.rejected, (state) => {
        state.status = statusType.failed;
        state.body = data;
      });
  },
});

export default thresholdSlice.reducer;
