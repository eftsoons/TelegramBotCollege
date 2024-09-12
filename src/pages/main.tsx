import { useState, useLayoutEffect } from "react";

import {
  retrieveLaunchParams,
  initUtils,
  initMiniApp,
} from "@telegram-apps/sdk";

import {
  Placeholder,
  InlineButtons,
  Caption,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../components";

import axios from "axios";

import lang from "../lang";

import { Wait } from "./index";

function Main({ setCurrentTab2 }: { setCurrentTab2: Function }) {
  const [selectgroup, setselectgroup] = useState<string>();

  const [miniApp] = initMiniApp();
  const utils = initUtils();
  const launchParams = retrieveLaunchParams();

  useLayoutEffect(() => {
    async function fetchData() {
      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setselectgroup(group.data);
    }

    fetchData();
  }, []);

  return selectgroup || selectgroup == "" ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Placeholder
          header={lang.schedule}
          description={
            selectgroup != "" ? `${lang.subscribe}: ${selectgroup}` : ""
          }
          style={{ paddingTop: "0" }}
          action={
            <>
              <InlineButtons style={{ width: "100%" }} mode="bezeled">
                <InlineButtonsItem
                  onClick={() => {
                    setCurrentTab2("group");
                    localStorage.setItem("Menu", "group");
                    localStorage.setItem("Search", "");
                  }}
                  text={lang.group}
                >
                  {Icon("group")}
                </InlineButtonsItem>
                <InlineButtonsItem
                  onClick={() => {
                    setCurrentTab2("teacher");
                    localStorage.setItem("Menu", "teacher");
                    localStorage.setItem("Search", "");
                  }}
                  text={lang.teachers}
                >
                  {Icon("teacher")}
                </InlineButtonsItem>
              </InlineButtons>
              <InlineButtonsItem
                onClick={() => {
                  setCurrentTab2("office");
                  localStorage.setItem("Menu", "office");
                  localStorage.setItem("Search", "");
                }}
                style={{ width: "100%" }}
                mode="bezeled"
                text={lang.offices}
              >
                {Icon("office")}
              </InlineButtonsItem>
            </>
          }
        >
          <img src="logo.png" loading="eager" />
        </Placeholder>
        <div className="author">
          <Caption className="authortext">
            Авторы:{" "}
            <ins
              onClick={() => {
                utils.openTelegramLink("https://t.me/shishkin666");
                miniApp.close();
              }}
            >
              Александр Федорович
            </ins>
            ,{" "}
            <ins
              onClick={() => utils.openTelegramLink("https://t.me/shishkin666")}
            >
              Антон Ильиних
            </ins>
          </Caption>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <Wait />
  );
}

export default Main;
