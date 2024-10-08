import { useState, useEffect, ReactNode, ReactElement } from "react";

import { initMiniApp, postEvent } from "@telegram-apps/sdk";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useLaunchParams,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";

import { AppRoot, List, Snackbar, Tabbar } from "@telegram-apps/telegram-ui";

import { Main, Call, Group, Schedule, Teacher } from "./pages";

import Icons from "./components/icon";

import axios from "axios";
import axiosRetry from "axios-retry";
axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

function App() {
  const [currentTab, setCurrentTab] = useState("main");
  const [currentTab2, setCurrentTab2] = useState("main");
  const [activegroup, setactivegroup] = useState("");
  const [activeindex, setactiveindex] = useState("");
  const [snackbar, setsnackbar] = useState(null);

  const [miniApp] = initMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const lp = useLaunchParams();

  useEffect(() => {
    miniApp.ready();

    const currentTab2 = localStorage.getItem("Menu");
    const activegroup = localStorage.getItem("Data");
    const activeindex = localStorage.getItem("DataIndex");

    setCurrentTab2(currentTab2 ? currentTab2 : "main");
    setactivegroup(activegroup ? activegroup : "");
    setactiveindex(activeindex ? activeindex : "");

    postEvent("web_app_expand");

    miniApp.setHeaderColor("bg_color");
  }, []);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <List>
        {currentTab == "main" ? (
          currentTab2 == "main" ? (
            <Main setCurrentTab2={setCurrentTab2} />
          ) : !currentTab2.includes("next") ? (
            currentTab2 == "teacherinfo" ? (
              <Teacher
                setCurrentTab2={setCurrentTab2}
                activegroup={activegroup}
              />
            ) : (
              <Group
                setactivegroup={setactivegroup}
                currentTab2={currentTab2}
                setCurrentTab2={setCurrentTab2}
                setactiveindex={setactiveindex}
              />
            )
          ) : (
            <Schedule
              activegroup={activegroup}
              currentTab2={currentTab2}
              setCurrentTab2={setCurrentTab2}
              activeindex={activeindex}
              snackbar={snackbar}
              setsnackbar={setsnackbar}
            />
          )
        ) : (
          <Call />
        )}

        <Tabbar style={{ zIndex: "1" }}>
          <Tabbar.Item
            id="main"
            text={"Главное меню"}
            selected={"main" === currentTab}
            onClick={() => setCurrentTab("main")}
          >
            {Icons("mainmenu")}
          </Tabbar.Item>
          <Tabbar.Item
            id="call"
            text={"Звонки"}
            selected={"call" === currentTab}
            onClick={() => setCurrentTab("call")}
          >
            {Icons("call")}
          </Tabbar.Item>
        </Tabbar>

        {snackbar}
      </List>
    </AppRoot>
  );
}

export default App;
