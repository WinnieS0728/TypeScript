import { getMemberList } from "@api/member/getMember";
import { getVisitData } from "./visit store/visit store";
import { getTripEvent } from "./trip event/trip event";
import { getThresHold } from "./kpi threshold/threshold";

const apiPath = import.meta.env.VITE_API_PATH;

const api = {
  getMember: getMemberList(apiPath),
  getVisitData: getVisitData(apiPath),
  getTripEvent: getTripEvent(apiPath),
  getThresHold: getThresHold(apiPath),
};

export default api;
