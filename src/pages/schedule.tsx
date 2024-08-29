import { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom"; // Импортируем ReactDOM

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton, retrieveLaunchParams } from "@telegram-apps/sdk";
import {
  Accordion,
  Banner,
  Cell,
  Multiselectable,
  Placeholder,
  Snackbar,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";

import { GetInfoGroup, GetDay } from "../utils";

import axios from "axios";
import React from "react";

import Icons from "../components/icon";

function Schedule({
  activegroup,
  currentTab2,
  setCurrentTab2,
  activeindex,
  snackbar,
  setsnackbar,
}: {
  activegroup: string;
  currentTab2: string;
  setCurrentTab2: Function;
  activeindex: string;
  snackbar: null | Element;
  setsnackbar: Function;
}) {
  const [backButton] = initBackButton();
  const launchParams = retrieveLaunchParams();

  const [info, setinfo] = useState<
    Array<Array<[string, string, string, string]>>
  >([[]]);
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

  useLayoutEffect(() => {
    async function fetchData() {
      const JsonData = await axios.post(import.meta.env.VITE_API_URL, {
        initData: launchParams.initDataRaw,
      });

      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setinfogroup(group.data);

      setinfo(
        GetInfoGroup(currentTab2, activegroup, activeindex, JsonData.data)
      );

      const expand = localStorage.getItem("Expand");

      setexpand(
        expand ? JSON.parse(expand) : [false, false, false, false, false, false]
      );
    }

    fetchData();
  }, []);

  useEffect(() => {
    backButton.show();
    backButton.on("click", () => {
      backButton.hide();
      setCurrentTab2(currentTab2.split("next")[0]);
      localStorage.setItem("Menu", currentTab2.split("next")[0]);
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
              currentTab2 == "groupnext" ? (
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

                    const group = await axios.post(
                      `${import.meta.env.VITE_API_URL}/group`,
                      {
                        initData: launchParams.initDataRaw,
                      }
                    );

                    setinfogroup(group.data);

                    if (!snackbar) {
                      if (infogroup == activegroup) {
                        setsnackbar(
                          <Snackbar
                            before={Icons("check")}
                            style={{ zIndex: "1" }}
                            onClose={() => {
                              //он баганный
                            }}
                            duration={2000}
                            description={`Отписались от ${infogroup}`}
                          >
                            Вы успешно изменили подписку на замены
                          </Snackbar>
                        );
                      } else {
                        setsnackbar(
                          <Snackbar
                            before={Icons("check")}
                            style={{ zIndex: "1" }}
                            onClose={() => {
                              //он баганный
                            }}
                            duration={2000}
                            description={`Подписались на ${activegroup}`}
                          >
                            Вы успешно изменили подписку на замены
                          </Snackbar>
                        );
                      }

                      setTimeout(() => {
                        setsnackbar(null);
                      }, 2150); // так по правде лучше
                    }
                  }}
                />
              ) : (
                ""
              )
            }
            onClick={() => {
              if (currentTab2 == "teachernext") {
                setCurrentTab2("teacherinfo");
                localStorage.setItem("Menu", "teacherinfo");
              }
            }}
            description={currentTab2 == "groupnext" ? "Подписка на замены" : ""}
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
                      marginBottom: index == info.length - 1 ? "16vh" : "0",
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
                                  ? currentTab2 == "groupnext"
                                    ? `Преподователь: ${data[2]}`
                                    : currentTab2 == "officenext"
                                    ? `Преподователь: ${data[2]}`
                                    : `Кабинет: ${data[2]}`
                                  : ""
                              }
                              description={
                                data[3]
                                  ? currentTab2 == "groupnext"
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
