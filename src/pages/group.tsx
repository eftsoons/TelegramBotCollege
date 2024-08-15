import { useEffect, useLayoutEffect, useState } from "react";

import {
  InlineButtons,
  Caption,
  Placeholder,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton, retrieveLaunchParams } from "@telegram-apps/sdk";

import { GetGroup } from "../utils";

import Icons from "../components/icon";

import axios from "axios";

function Group({
  currentTab,
  setCurrentTab,
  setactivegroup,
  setactiveindex,
}: {
  currentTab: string;
  setCurrentTab: Function;
  setactivegroup: Function;
  setactiveindex: Function;
}) {
  const [JsonData, setJsonData] = useState<{ name: string; key: number }[][]>([
    [],
  ]);
  const [infogroup, setinfogroup] = useState<string>("");

  const [backButton] = initBackButton();
  const launchParams = retrieveLaunchParams();

  useLayoutEffect(() => {
    async function fetchData() {
      const JsonData = await axios.post(import.meta.env.VITE_API_URL, {
        initData: launchParams.initDataRaw,
      });

      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setinfogroup(group.data);

      setJsonData(GetGroup(currentTab, JsonData.data));
    }

    fetchData();
  }, []);

  useEffect(() => {
    backButton.show();

    backButton.on("click", () => {
      backButton.hide();
      setCurrentTab("main");
      localStorage.setItem("Menu", "main");
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={
          JsonData[0].length
            ? { padding: "10px" }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh",
              }
        }
      >
        {JsonData[0].length ? (
          JsonData.map((data: Array<{ name: string; key: number }>, index) => (
            <InlineButtons
              key={index}
              style={{
                width: "100%",
                marginBottom: index != JsonData.length - 1 ? "2.5vh" : "15vh",
              }}
              mode="bezeled"
            >
              {data.map((data, index) => (
                <InlineButtonsItem
                  key={index}
                  onClick={() => {
                    setCurrentTab(`${currentTab}next`);
                    setactivegroup(data.name);
                    setactiveindex(data.key);
                    localStorage.setItem("Menu", `${currentTab}next`);
                    localStorage.setItem("Data", data.name);
                    localStorage.setItem("DataIndex", String(data.key));
                    localStorage.setItem(
                      "Expand",
                      JSON.stringify([false, false, false, false, false, false])
                    );
                  }}
                  text={
                    data.name == "ИСП 23-21" || infogroup == data.name
                      ? data.name
                      : ""
                  }
                >
                  {data.name != "ИСП 23-21" ? (
                    infogroup == data.name ? (
                      Icons("check", "1")
                    ) : (
                      <Caption weight={"2"}>{data.name}</Caption>
                    )
                  ) : (
                    "🏆"
                  )}
                </InlineButtonsItem>
              ))}
            </InlineButtons>
          ))
        ) : (
          <Placeholder style={{ paddingTop: "0", width: "100%" }}>
            <Spinner size="l" />
          </Placeholder>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Group;
