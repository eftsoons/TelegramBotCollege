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
//import { TadsWidget } from "react-tads-widget";

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
  const [listgroup, setlistgroup] = useState<
    | Array<{
        name: string;
        user: Array<{ username: string; name: string; status: string }>;
      }>
    | undefined
  >([
    {
      name: "ИСП 23-21",
      user: [
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
        { username: "@shishkin666", name: "Федорович А.А.", status: "asd" },
      ],
    },
    { name: "ИСП 23-22", user: [] },
    { name: "ИСП 23-23", user: [] },
    { name: "ИСП 23-24", user: [] },
  ]);

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
        listgroup={listgroup}
      />
      {snackbar}
      {/*<div className="add">
        <TadsWidget id={"123"} />
      </div>*/}
    </AppRoot>
  );
}

export default App;
