import { useState, useEffect, useLayoutEffect, useMemo } from "react";

import {
  initMiniApp,
  postEvent,
  initCloudStorage,
  retrieveLaunchParams,
  initNavigator,
  BrowserNavigator,
} from "@telegram-apps/sdk";

import { useIntegration } from "@telegram-apps/react-router-integration";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useLaunchParams,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";

import {
  Link,
  Navigate,
  Outlet,
  Route,
  Router,
  Routes,
} from "react-router-dom";

import { AppRoot, List, Tabbar } from "@telegram-apps/telegram-ui";

import {
  Main,
  Call,
  Group,
  Schedule,
  Teacher,
  PixelBattle,
  Wait,
} from "./pages";

import { Icon, TabBar } from "./components";

import Navigation from "./navigation";

import lang from "./lang";

import axios from "axios";
import axiosRetry from "axios-retry";
import Prefects from "./pages/prefects";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

function App() {
  const [snackbar, setsnackbar] = useState(null);
  const [JsonData, setJsonData] = useState<Record<string, string>[]>();
  const [infogroup, setinfogroup] = useState<string>();

  const [miniApp] = initMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const lp = useLaunchParams();
  const launchParams = retrieveLaunchParams();

  useEffect(() => {
    miniApp.ready();

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

  useEffect(() => {
    async function fetchData() {
      const JsonData = await axios.post(import.meta.env.VITE_API_URL, {
        initData: launchParams.initDataRaw,
      });

      setJsonData(JsonData.data);

      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setinfogroup(group.data);
    }

    fetchData();
  }, []);

  //const cloudStorage = initCloudStorage();

  //cloudStorage.delete("my-key").then(() => console.log("Key was deleted")); для старост

  //reactNavigator.push("main");
  //console.log(location);
  //reactNavigator.push("/");

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <Navigation
        JsonData={JsonData}
        infogroup={infogroup}
        setinfogroup={setinfogroup}
        snackbar={snackbar}
        setsnackbar={setsnackbar}
      />
      {snackbar}
      {/*<List>
        {currentTab == "main" ? (
          currentTab2 == "main" ? (
            infogroup || infogroup == "" ? (
              <Main setCurrentTab2={setCurrentTab2} infogroup={infogroup} />
            ) : (
              <Wait />
            )
          ) : !currentTab2.includes("next") ? (
            currentTab2 == "teacherinfo" ? (
              <Teacher
                setCurrentTab2={setCurrentTab2}
                activegroup={activegroup}
              />
            ) : JsonData && (infogroup || infogroup == "") ? (
              <Group
                setactivegroup={setactivegroup}
                currentTab2={currentTab2}
                setCurrentTab2={setCurrentTab2}
                setactiveindex={setactiveindex}
                JsonDataResponse={JsonData}
                infogroup={infogroup}
              />
            ) : (
              <Wait />
            )
          ) : JsonData && (infogroup || infogroup == "") ? (
            <Schedule
              activegroup={activegroup}
              currentTab2={currentTab2}
              setCurrentTab2={setCurrentTab2}
              activeindex={activeindex}
              snackbar={snackbar}
              setsnackbar={setsnackbar}
              JsonData={JsonData}
              infogroup={infogroup}
              setinfogroup={setinfogroup}
            />
          ) : (
            <Wait />
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
          </Tabbar.Item>*/}
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
      {/*</Tabbar>

        {snackbar}
      </List>*/}
    </AppRoot>
  );
}

export default App;
