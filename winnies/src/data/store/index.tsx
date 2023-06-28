import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@reducers/color";
import timeReducer from "@reducers/time";
import memberReducer from "@reducers/member/salesList";
import personVisitSlice from "@reducers/visit data/person visit";
import weekVisitSlice from "@reducers/visit data/week visit";

const store = configureStore({
  reducer: {
    color: colorReducer,
    time: timeReducer,
    member: memberReducer,
    personVisit: personVisitSlice,
    weekVisit: weekVisitSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
