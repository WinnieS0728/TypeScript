import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-day-picker/dist/style.css";
import "react-toastify/ReactToastify.css";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "@/data/store";
import { useAppSelector } from "@hooks/redux";
import "@styles/index.scss";
import "./i18n.ts";
// import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

const Theme = ({ children }: { children: JSX.Element }) => {
  const theme = useAppSelector((state) => state.color);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// const LangSetting = () => {
//   const { i18n } = useTranslation();
//   function setLang(lang: string) {
//     i18n.changeLanguage(lang);
//   }
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         right: "1rem",
//         display: "flex",
//         gap: "1rem",
//       }}
//     >
//       <button
//         type='button'
//         onClick={() => {
//           setLang("en");
//           toast.info("changed to EN");
//         }}
//       >
//         en
//       </button>
//       <button
//         type='button'
//         onClick={() => {
//           setLang("tw");
//           toast.info("changed to zh_TW");
//         }}
//       >
//         tw
//       </button>
//     </div>
//   );
// };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Theme>
      <HashRouter>
        {/* <LangSetting /> */}
        <App />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </HashRouter>
    </Theme>
  </Provider>
  // </React.StrictMode>,
);
