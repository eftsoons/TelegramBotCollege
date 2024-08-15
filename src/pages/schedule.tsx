import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton, retrieveLaunchParams } from "@telegram-apps/sdk";
import {
  Accordion,
  Banner,
  Cell,
  Multiselectable,
  Placeholder,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";

import { GetInfoGroup, GetDay } from "../utils";

import axios from "axios";

function Schedule({
  currentTab,
  setCurrentTab,
  activegroup,
  activeindex,
}: {
  currentTab: string;
  setCurrentTab: Function;
  activegroup: string;
  activeindex: string;
}) {
  const [backButton] = initBackButton();
  const launchParams = retrieveLaunchParams();

  const [info, setinfo] = useState<any>([[]]);
  const [infogroup, setinfogroup] = useState<string>("");

  const [expand, setexpand] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const today = new Date().getDay();

  useEffect(() => {
    backButton.show();
    backButton.on("click", () => {
      backButton.hide();
      setCurrentTab(currentTab.split("next")[0]);
      localStorage.setItem("Menu", currentTab.split("next")[0]);
    });

    async function fetchData() {
      const JsonData = await axios.post(import.meta.env.VITE_API_URL, {
        initData: launchParams.initDataRaw,
      });

      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setinfogroup(group.data);

      setinfo(
        GetInfoGroup(currentTab, activegroup, activeindex, JsonData.data)
      );

      setTimeout(() => {
        // мб немного гавнокод
        const expand = localStorage.getItem("Expand");

        setexpand(
          expand
            ? JSON.parse(expand)
            : [false, false, false, false, false, false]
        );
      }, 0);
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
        style={
          info.length != 1
            ? {}
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh",
              }
        }
      >
        {info.length != 1 && (
          <Cell
            Component="label"
            before={
              currentTab == "groupnext" ? (
                <Multiselectable
                  defaultChecked={infogroup == activegroup ? true : false}
                  name="multiselect"
                  value="1"
                  onClick={async () => {
                    await axios.post(
                      `${import.meta.env.VITE_API_URL}/setgroup`,
                      {
                        initData: launchParams.initDataRaw,
                        setgroup: activegroup,
                      }
                    );
                  }}
                />
              ) : (
                ""
              )
            }
            description={currentTab == "groupnext" ? "Подписка на замены" : ""}
          >
            {activegroup}
          </Cell>
        )}
        {info.length != 1 ? (
          info.map(
            (data2: Array<[string, string, string, string]>, index: number) => {
              return (
                <Accordion
                  expanded={expand[index]}
                  key={index}
                  onChange={() => {
                    if (data2.length > 1) {
                      const expandclone = [...expand];
                      expandclone[index] = !expandclone[index];

                      localStorage.setItem(
                        "Expand",
                        JSON.stringify(expandclone)
                      );
                      setexpand(expandclone);
                    }
                  }}
                >
                  <AccordionSummary
                    style={{ margin: "0" }}
                    interactiveAnimation="opacity"
                    hint={today - 1 == index ? "🌄" : "📅"}
                    hovered={expand[index]}
                    disabled={data2.length > 1 ? false : true}
                  >
                    {GetDay(index)}
                  </AccordionSummary>
                  <AccordionContent
                    style={{
                      background: "none",
                      marginBottom: index == info.length - 1 ? "15vh" : "0",
                    }}
                  >
                    {data2.map(
                      (
                        data: [string, string, string, string],
                        index: number
                      ) => {
                        if (index > 0) {
                          return (
                            <Banner
                              key={index}
                              header={
                                data[1] ? `${data[0]}. ${data[1]}` : data[0]
                              }
                              subheader={
                                data[2]
                                  ? currentTab == "groupnext"
                                    ? `Преподователь: ${data[2]}`
                                    : currentTab == "officenext"
                                    ? `Преподователь: ${data[2]}`
                                    : `Кабинет: ${data[2]}`
                                  : ""
                              }
                              description={
                                data[3]
                                  ? currentTab == "groupnext"
                                    ? `Кабинет: ${data[3]}`
                                    : `Группа: ${data[3]}`
                                  : ""
                              }
                              type="inline"
                              /*background={
                              <img
                                style={{ width: "100%" }}
                                src="https://sun9-40.userapi.com/impg/R6XwqoBGYeDf7uYpDOpEU1BXuFri9uTXJ3jClA/_w4Y50ET1Rg.jpg?size=1280x572&quality=95&sign=e6fce4d523ca0fbe9e70e6a984dda4a1&type=album"
                              />
                            }*/
                            />
                          );
                        }
                      }
                    )}
                  </AccordionContent>
                </Accordion>
              );
            }
          )
        ) : (
          <Placeholder style={{ paddingTop: "0", width: "100%" }}>
            <Spinner size="l" />
          </Placeholder>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Schedule;
