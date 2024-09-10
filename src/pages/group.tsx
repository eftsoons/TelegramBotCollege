import { useEffect, useLayoutEffect, useState } from "react";

import {
  InlineButtons,
  Caption,
  Input,
  IconButton,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton, retrieveLaunchParams } from "@telegram-apps/sdk";

import { GetGroup } from "../utils";

import { Icon } from "../components";

import axios from "axios";

import { Wait } from "./index";

function Group({
  currentTab2,
  setCurrentTab2,
  setactivegroup,
  setactiveindex,
}: {
  currentTab2: string;
  setCurrentTab2: Function;
  setactivegroup: Function;
  setactiveindex: Function;
}) {
  const [JsonData, setJsonData] = useState<{ name: string; key: number }[][]>([
    [],
  ]);
  const [infogroup, setinfogroup] = useState<string>("");
  const [searchgroup, setsearchgroup] = useState("");

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

      setJsonData(GetGroup(currentTab2, JsonData.data));

      const search = localStorage.getItem("Search");

      setsearchgroup(search ? search : "");
    }

    fetchData();
  }, []);

  useEffect(() => {
    backButton.show();

    backButton.on("click", () => {
      backButton.hide();
      setCurrentTab2("main");
      localStorage.setItem("Menu", "main");
    });
  }, []);

  return JsonData[0].length ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "10px" }}
      >
        <Input
          header="Поиск"
          onChange={(e) => {
            setsearchgroup(e.target.value);
            localStorage.setItem("Search", e.target.value);
          }}
          after={
            <IconButton
              onClick={() => {
                setsearchgroup("");
                localStorage.setItem("Search", "");
              }}
              size="s"
              mode="plain"
              disabled={searchgroup.length > 0 ? false : true}
            >
              {Icon("cross")}
            </IconButton>
          }
          value={searchgroup}
        />
        {JsonData.filter((data) =>
          data.some((data) =>
            data.name
              .toLocaleUpperCase()
              .includes(searchgroup.toLocaleUpperCase())
          )
        ).map((data: Array<{ name: string; key: number }>, index) => {
          const datasearch = data.filter((data) =>
            data.name
              .toLocaleUpperCase()
              .includes(searchgroup.toLocaleUpperCase())
          );

          const alldata = JsonData.filter((data) =>
            data.some((data) =>
              data.name
                .toLocaleUpperCase()
                .includes(searchgroup.toLocaleUpperCase())
            )
          );

          if (datasearch.length > 1) {
            return (
              <InlineButtons
                key={index}
                style={{
                  width: "100%",
                  marginBottom: index != alldata.length - 1 ? "2.5vh" : "15vh",
                }}
                mode="bezeled"
              >
                {datasearch.map((data, index) => {
                  return (
                    <InlineButtonsItem
                      key={index}
                      onClick={() => {
                        setCurrentTab2(`${currentTab2}next`);
                        setactivegroup(data.name);
                        setactiveindex(data.key);
                        localStorage.setItem("Menu", `${currentTab2}next`);
                        localStorage.setItem("Data", data.name);
                        localStorage.setItem("DataIndex", String(data.key));
                        localStorage.setItem(
                          "Expand",
                          JSON.stringify([
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                          ])
                        );
                      }}
                      text={
                        data.name == "ИСП 23-21" || infogroup == data.name
                          ? data.name
                          : ""
                      }
                    >
                      {data.name == "ИСП 23-21" ? (
                        infogroup == data.name ? (
                          Icon("check", "1")
                        ) : (
                          "🏆"
                        )
                      ) : infogroup == data.name ? (
                        Icon("check", "1")
                      ) : (
                        <Caption weight={"2"}>{data.name}</Caption>
                      )}
                    </InlineButtonsItem>
                  );
                })}
              </InlineButtons>
            );
          } else {
            const datasearch = data.find((data) =>
              data.name
                .toLocaleUpperCase()
                .includes(searchgroup.toLocaleUpperCase())
            );

            return (
              datasearch && (
                <InlineButtonsItem
                  key={index}
                  mode="bezeled"
                  style={{
                    width: "100%",
                    marginBottom:
                      index != alldata.length - 1 ? "2.5vh" : "15vh",
                  }}
                  onClick={() => {
                    setCurrentTab2(`${currentTab2}next`);
                    setactivegroup(datasearch.name);
                    setactiveindex(datasearch.key);
                    localStorage.setItem("Menu", `${currentTab2}next`);
                    localStorage.setItem("Data", datasearch.name);
                    localStorage.setItem("DataIndex", String(datasearch.key));
                    localStorage.setItem(
                      "Expand",
                      JSON.stringify([false, false, false, false, false, false])
                    );
                  }}
                  text={
                    datasearch.name == "ИСП 23-21" ||
                    infogroup == datasearch.name
                      ? datasearch.name
                      : ""
                  }
                >
                  {datasearch.name == "ИСП 23-21" ? (
                    infogroup == datasearch.name ? (
                      Icon("check", "1")
                    ) : (
                      "🏆"
                    )
                  ) : infogroup == datasearch.name ? (
                    Icon("check", "1")
                  ) : (
                    <Caption weight={"2"}>{datasearch.name}</Caption>
                  )}
                </InlineButtonsItem>
              )
            );
          }
        })}
      </motion.div>
    </AnimatePresence>
  ) : (
    <Wait />
  );
}

export default Group;
