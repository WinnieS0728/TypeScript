import { lazy, useEffect } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux";
import { setSalesList } from "@actions/member/setSalesList";

const CustomRatePage = lazy(() => import("@pages/custom rate"));
const EditPage = lazy(() => import("@pages/edit/edit"));
const Coming = lazy(() => import("@layouts/coming"));

const ThresholdPage = lazy(() => import("@pages/edit/threshold"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSalesList());
  }, [dispatch]);

  return (
    <Suspense fallback={<h1>那你網路很慢欸</h1>}>
      <Routes>
        <Route path=''>
          <Route
            index
            element={<CustomRatePage />}
          />
          <Route
            path='edit'
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
