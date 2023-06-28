import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-day-picker/dist/style.css"
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "@/data/store";
import { useAppSelector } from "@hooks/redux";
import "@styles/index.scss";

const Theme = ({ children }: { children: JSX.Element }) => {
  const theme = useAppSelector((state) => state.color);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Theme>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Theme>
  </Provider>
  // </React.StrictMode>,
);
