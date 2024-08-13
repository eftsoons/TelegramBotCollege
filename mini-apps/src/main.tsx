import ReactDOM from "react-dom/client";
import { AppRoot } from "@telegram-apps/telegram-ui";
import App from "./App.tsx";
import "@telegram-apps/telegram-ui/dist/styles.css";

import "./scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppRoot>
    <App />
  </AppRoot>
);
