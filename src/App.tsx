import { useState, useEffect } from "react";

import { initMiniApp, postEvent } from "@telegram-apps/sdk";

import { useLaunchParams } from "@telegram-apps/sdk-react";

import { AppRoot, List, Tabbar } from "@telegram-apps/telegram-ui";

import Call from "./pages/call";
import Main from "./pages/main";
import Group from "./pages/group";
import Schedule from "./pages/schedule";

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

  const [miniApp] = initMiniApp();
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

    miniApp.setHeaderColor("secondary_bg_color");
  }, []);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <List>
        {currentTab == "main" ? (
          currentTab2 == "main" ? (
            <Main setCurrentTab={setCurrentTab2} />
          ) : !currentTab2.includes("next") ? (
            <Group
              setactivegroup={setactivegroup}
              currentTab={currentTab2}
              setCurrentTab={setCurrentTab2}
              setactiveindex={setactiveindex}
            />
          ) : (
            <Schedule
              activegroup={activegroup}
              currentTab={currentTab2}
              setCurrentTab={setCurrentTab2}
              activeindex={activeindex}
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
      </List>
    </AppRoot>
  );
}

export default App;
