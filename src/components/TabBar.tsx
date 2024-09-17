import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Outlet } from "react-router-dom";
import { List, Tabbar } from "@telegram-apps/telegram-ui";

import lang from "../lang";

import { Icon } from ".";

function TabBar({
  pathname,
  reactNavigator,
}: {
  pathname: string;
  reactNavigator: any;
}) {
  const lp = useLaunchParams();

  return (
    <List>
      <Tabbar
        style={{
          zIndex: "2",
          paddingBottom: ["macos", "ios"].includes(lp.platform)
            ? "1.5rem"
            : "0",
          marginBottom: "0",
        }}
      >
        <Tabbar.Item
          id="main"
          text={lang.mainmenu}
          selected={"/call" != pathname}
          onClick={() => reactNavigator.push("/")}
        >
          {Icon("mainmenu")}
        </Tabbar.Item>
        <Tabbar.Item
          id="call"
          text={lang.call}
          selected={"/call" == pathname}
          onClick={() => reactNavigator.push("/call")}
        >
          {Icon("call")}
        </Tabbar.Item>
      </Tabbar>
      <Outlet />
    </List>
  );
}

export default TabBar;
