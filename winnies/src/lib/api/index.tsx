import { getMemberList } from "@api/member/getMember";
import { getVisitData } from "./visit store/visit store";

const apiPath = import.meta.env.VITE_API_PATH;

const api = {
  getMember: getMemberList(apiPath),
  getVisitData: getVisitData(apiPath),
};

export default api;
