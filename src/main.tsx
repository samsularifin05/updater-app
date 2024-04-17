import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HookProvider } from "./hook/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/update-app">
    <HookProvider>
      <App />
    </HookProvider>
  </BrowserRouter>
);
