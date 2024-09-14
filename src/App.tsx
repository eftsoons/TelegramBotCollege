import { useState, useEffect } from "react";

import { initMiniApp, postEvent, initCloudStorage } from "@telegram-apps/sdk";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useLaunchParams,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";

import { AppRoot, List, Tabbar } from "@telegram-apps/telegram-ui";

import { Main, Call, Group, Schedule, Teacher, PixelBattle } from "./pages";

import { Icon } from "./components";

import lang from "./lang";

import axios from "axios";
import axiosRetry from "axios-retry";
import Prefects from "./pages/prefects";
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

  //const cloudStorage = initCloudStorage();

  //cloudStorage.delete("my-key").then(() => console.log("Key was deleted")); для старост

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
        ) : currentTab == "call" ? (
          <Call />
        ) : currentTab == "pixelbattle" ? (
          <PixelBattle />
        ) : (
          <Prefects />
        )}

        <Tabbar
          style={{
            zIndex: "1",
            paddingBottom: ["macos", "ios"].includes(lp.platform)
              ? "1.5rem"
              : "0",
          }}
        >
          <Tabbar.Item
            id="main"
            text={lang.mainmenu}
            selected={"main" === currentTab}
            onClick={() => setCurrentTab("main")}
          >
            {Icon("mainmenu")}
          </Tabbar.Item>
          <Tabbar.Item
            id="call"
            text={lang.call}
            selected={"call" === currentTab}
            onClick={() => setCurrentTab("call")}
          >
            {Icon("call")}
          </Tabbar.Item>
          {/*<Tabbar.Item
            id="prefects"
            text={"Для старост"}
            selected={"prefects" === currentTab}
            onClick={() => setCurrentTab("prefects")}
          >
            {Icon("prefects")}
          </Tabbar.Item>
          <Tabbar.Item
            id="pixel"
            text={"Pixel Battle"}
            selected={"pixel" === currentTab}
            onClick={() => setCurrentTab("pixel")}
          >
            {Icon("bomb")}
          </Tabbar.Item>*/}
        </Tabbar>

        {snackbar}
      </List>
    </AppRoot>
  );
}

export default App;
