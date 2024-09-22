import { useState, useEffect } from "react";

import {
  initMiniApp,
  postEvent,
  retrieveLaunchParams,
} from "@telegram-apps/sdk";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useLaunchParams,
  useThemeParams,
  useViewport,
  initCloudStorage,
} from "@telegram-apps/sdk-react";

import { AppRoot } from "@telegram-apps/telegram-ui";

import Navigation from "./navigation";

import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

function App() {
  const [snackbar, setsnackbar] = useState(null);
  const [JsonData, setJsonData] = useState<Record<string, string>[]>();
  const [infogroup, setinfogroup] = useState<string>();
  const [favourites, setfavourites] = useState<
    | Array<{
        name: string;
        type: string;
      }>
    | undefined
  >();

  const [miniApp] = initMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const lp = useLaunchParams();
  const launchParams = retrieveLaunchParams();
  const cloudStorage = initCloudStorage();

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

      const favourites = await cloudStorage.get("favourites");

      setfavourites(favourites ? JSON.parse(favourites) : []);
    }

    fetchData();
  }, []);

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
        favourites={favourites}
      />
      {snackbar}
    </AppRoot>
  );
}

export default App;
