import { useState, useEffect } from "react";

import { retrieveLaunchParams } from "@telegram-apps/sdk";

import {
  Placeholder,
  InlineButtons,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import Icons from "../components/icon";

import axios from "axios";

function Main({ setCurrentTab }: { setCurrentTab: Function }) {
  const [selectgroup, setselectgroup] = useState<string>();

  const launchParams = retrieveLaunchParams();

  useEffect(() => {
    async function fetchData() {
      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setselectgroup(group.data);
    }

    fetchData();
  }, []);

  return (
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
        {selectgroup || selectgroup == "" ? (
          <Placeholder
            header="Расписание"
            description={
              selectgroup != "" ? `Подписка на замены: ${selectgroup}` : ""
            }
            style={{ paddingTop: "0", width: "100%" }}
            action={
              <>
                <InlineButtons style={{ width: "100%" }} mode="bezeled">
                  <InlineButtonsItem
                    onClick={() => {
                      setCurrentTab("group");
                      localStorage.setItem("Menu", "group");
                    }}
                    text="Групп"
                  >
                    {Icons("group")}
                  </InlineButtonsItem>
                  <InlineButtonsItem
                    onClick={() => {
                      setCurrentTab("teacher");
                      localStorage.setItem("Menu", "teacher");
                    }}
                    text="Преподователей"
                  >
                    {Icons("teacher")}
                  </InlineButtonsItem>
                </InlineButtons>
                <InlineButtonsItem
                  onClick={() => {
                    setCurrentTab("office");
                    localStorage.setItem("Menu", "office");
                  }}
                  style={{ width: "100%" }}
                  mode="bezeled"
                  text="Кабинетов"
                >
                  {Icons("office")}
                </InlineButtonsItem>
              </>
            }
          >
            <img src="logo.png" />
          </Placeholder>
        ) : (
          <Placeholder style={{ paddingTop: "0", width: "100%" }}>
            <Spinner size="l" />
          </Placeholder>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Main;
