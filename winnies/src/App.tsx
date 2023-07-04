import { lazy, useEffect } from "react";
import { Suspense } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setSalesList } from "@actions/member/setSalesList";
import store from "./data/store";
import { setUser } from "@actions/member/setUser";
import { useTranslation } from "react-i18next";

const CustomRatePage = lazy(() => import("@pages/custom rate"));
const EditPage = lazy(() => import("@pages/edit/edit"));
const Coming = lazy(() => import("@layouts/coming"));

const ThresholdPage = lazy(() => import("@pages/edit/threshold"));

function App() {
  const dispatch = useAppDispatch();
  const nowUser = useAppSelector((state) => state.nowUser);
  const { i18n } = useTranslation();

  const [search] = useSearchParams();

  const EmpID = store.getState().nowUser.body.EmpId || search.get("userID");

  const usingLanguage = nowUser.body.Language;

  useEffect(() => {
    dispatch(setSalesList());
    dispatch(setUser(EmpID as string));
    i18n.changeLanguage(usingLanguage);
  }, [dispatch, EmpID, i18n, usingLanguage]);  

  return (
    <Suspense fallback={<h1>那你網路很慢欸</h1>}>
      <Routes>
        <Route path=''>
          <Route
            index
            element={<CustomRatePage />}
          />
          <Route
            path='setting'
            element={<EditPage />}
          >
            <Route
              path='tx'
              element={<Coming />}
            />
            <Route
              path='threshold'
              element={<ThresholdPage />}
            />
            <Route
              path='store'
              element={<Coming />}
            />
            <Route
              path='osom'
              element={<Coming />}
            />
          </Route>
        </Route>
        <Route
          path='*'
          element={<h1>欸不是啊怎麼沒有這頁R</h1>}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
