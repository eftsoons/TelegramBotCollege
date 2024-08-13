import { SDKProvider } from "@telegram-apps/sdk-react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./scss/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SDKProvider acceptCustomStyles>
    <App />
  </SDKProvider>
);
