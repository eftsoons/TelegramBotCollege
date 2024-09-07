import { useState, useLayoutEffect } from "react";

import { retrieveLaunchParams } from "@telegram-apps/sdk";

import { Placeholder, InlineButtons } from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import Icons from "../components/icon";

import axios from "axios";

import lang from "../lang";

import { Wait } from "./index";

function Main({ setCurrentTab2 }: { setCurrentTab2: Function }) {
  const [selectgroup, setselectgroup] = useState<string>();

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
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Placeholder
          header={lang.schedule}
          description={
            selectgroup != "" ? `${lang.subscribe}: ${selectgroup}` : ""
          }
          style={{ paddingTop: "0", width: "100%" }}
          action={
            <>
              <InlineButtons style={{ width: "100%" }} mode="bezeled">
                <InlineButtonsItem
                  onClick={() => {
                    setCurrentTab2("group");
                    localStorage.setItem("Menu", "group");
                  }}
                  text={lang.group}
                >
                  {Icons("group")}
                </InlineButtonsItem>
                <InlineButtonsItem
                  onClick={() => {
                    setCurrentTab2("teacher");
                    localStorage.setItem("Menu", "teacher");
                  }}
                  text={lang.teachers}
                >
                  {Icons("teacher")}
                </InlineButtonsItem>
              </InlineButtons>
              <InlineButtonsItem
                onClick={() => {
                  setCurrentTab2("office");
                  localStorage.setItem("Menu", "office");
                }}
                style={{ width: "100%" }}
                mode="bezeled"
                text={lang.offices}
              >
                {Icons("office")}
              </InlineButtonsItem>
            </>
          }
        >
          <img src="logo.png" loading="eager" />
        </Placeholder>
      </motion.div>
    </AnimatePresence>
  ) : (
    <Wait />
  );
}

export default Main;
