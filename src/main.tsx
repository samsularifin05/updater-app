import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HookProvider } from "./hook/index.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/updater-app">
    <HookProvider>
      <App />
    </HookProvider>
  </BrowserRouter>
);
