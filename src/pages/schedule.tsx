import { useEffect, useLayoutEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton, retrieveLaunchParams } from "@telegram-apps/sdk";
import {
  Accordion,
  Badge,
  Banner,
  Cell,
  IconButton,
  Multiselectable,
  Snackbar,
} from "@telegram-apps/telegram-ui";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";

import {
  GetInfoGroup,
  GetDay,
  getlessoncall,
  ConvertTimeZone,
  GetInfoTeacher,
} from "../utils";

import axios from "axios";

import { Icon } from "../components";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import lang from "../lang";

import { Wait } from "./index";

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
  const lp = useLaunchParams();

  const infoteacher = GetInfoTeacher(activegroup);

  const [info, setinfo] = useState<
    Array<Array<[string, string, string, string]>>
  >([[]]);
  const [infogroup, setinfogroup] = useState<string>("");
  const [timekaliningrad, settimekaliningrad] = useState<Date>(
    ConvertTimeZone(new Date(), "Europe/Kaliningrad")
  );

  const [expand, setexpand] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const lessoncall = [
    [
      "09:20-10:30",
      "10:40-11:50",
      "12:10-13:20",
      "13:30-14:40",
      "15:50-17:00",
      "17:10-18:20",
      "18:40-19:50",
      "20:00-21:10",
    ],
    [
      "08:30-09:50",
      "10:00-11:20",
      "11:40-13:00",
      "13:10-14:30",
      "14:50-16:10",
      "16:20-17:40",
      "18:00-19:20",
      "19:30-20:50",
    ],
    [
      "08:30-09:50",
      "09:55-11:15",
      "11:20-12:40",
      "12:45-14:05",
      "14:10-15:30",
      "15:35-16:55",
    ],
  ];

  useLayoutEffect(() => {
    async function fetchData() {
      const JsonData = await axios.post(import.meta.env.VITE_API_URL, {
        initData: launchParams.initDataRaw,
      });

      const group = await axios.post(`${import.meta.env.VITE_API_URL}/group`, {
        initData: launchParams.initDataRaw,
      });

      setinfogroup(group.data);

      const info = GetInfoGroup(
        currentTab2,
        activegroup,
        activeindex,
        JsonData.data
      );

      if (info) {
        setinfo(info);
      } else {
        setCurrentTab2(currentTab2.split("next")[0]);
        localStorage.setItem("Menu", currentTab2.split("next")[0]);
      }

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

  const today = timekaliningrad.getDay();

  useEffect(() => {
    const intervalId = setInterval(() => {
      settimekaliningrad(ConvertTimeZone(new Date(), "Europe/Kaliningrad"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //{lang.teacher}: {data[2]}

  return info.length != 1 ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Cell
          Component="label"
          before={
            currentTab2 == "groupnext" ? (
              <Multiselectable
                defaultChecked={infogroup == activegroup ? true : false}
                name="multiselect"
                value="1"
                onClick={async () => {
                  await axios.post(`${import.meta.env.VITE_API_URL}/setgroup`, {
                    initData: launchParams.initDataRaw,
                    setgroup: activegroup,
                  });

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
                          before={Icon("check")}
                          style={{ zIndex: "1" }}
                          onClose={() => {
                            //он баганный
                          }}
                          duration={2000}
                          description={`${lang.subscribenotificationoff} ${infogroup}`}
                        >
                          {lang.subscribenotification}
                        </Snackbar>
                      );
                    } else {
                      setsnackbar(
                        <Snackbar
                          before={Icon("check")}
                          style={{ zIndex: "1" }}
                          onClose={() => {
                            //он баганный
                          }}
                          duration={2000}
                          description={`${lang.subscribenotificationon} ${activegroup}`}
                        >
                          {lang.subscribenotification}
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
              /*} else if (currentTab2 == "groupnext") {
              if (!snackbar) {
                setsnackbar(
                  <Snackbar
                    before={Icon("bug")}
                    style={{ zIndex: "1" }}
                    onClose={() => {
                      setsnackbar(null);
                    }}
                    duration={4000}
                    description={"Приносим извинения 🙏"}
                  >
                    Администрация колледжа запретила присылать замены 🔐
                  </Snackbar>
                );
              }*/
            }
          }}
          description={currentTab2 == "groupnext" ? `${lang.subscribe}` : ""}
        >
          {infoteacher ? infoteacher.fullname : activegroup}
        </Cell>
        {info.map(
          (data2: Array<[string, string, string, string]>, index: number) => {
            return (
              <Accordion
                expanded={expand[index]}
                key={index}
                onChange={() => {
                  if (data2.length > 1) {
                    const expandclone = [...expand];
                    expandclone[index] = !expandclone[index];

                    localStorage.setItem("Expand", JSON.stringify(expandclone));
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
                {(lp.platform != "ios" || expand[index]) && (
                  <AccordionContent
                    style={{
                      background: "none",
                      marginBottom: index == info.length - 1 ? "16vh" : "0",
                    }}
                  >
                    {data2.map(
                      (
                        data: [string, string, string, string],
                        index2: number
                      ) => {
                        if (index2 > 0) {
                          const teacherinfo = GetInfoTeacher(data[2]);
                          return (
                            <Banner
                              key={index2}
                              header={
                                data[1] ? `${data[0]}. ${data[1]}` : data[0]
                              }
                              subheader={
                                data[2] ? (
                                  currentTab2 == "groupnext" ? (
                                    data[3] ? (
                                      <span
                                        onClick={() => {
                                          /*setCurrentTab2("teacherinfo");
                                      localStorage.setItem(
                                        "Menu",
                                        "teacherinfo"
                                      );доделать позже*/
                                        }}
                                      >
                                        {lang.teacher}:{" "}
                                        {teacherinfo
                                          ? teacherinfo.fullname
                                          : data[2]}
                                      </span>
                                    ) : (
                                      `${lang.office}: ${data[2]}`
                                    )
                                  ) : currentTab2 == "officenext" ? (
                                    <span
                                      onClick={() => {
                                        /*setCurrentTab2("teacherinfo");
                                        localStorage.setItem(
                                          "Menu",
                                          "teacherinfo"
                                        ); доделать позже*/
                                      }}
                                    >
                                      {lang.teacher}:{" "}
                                      {teacherinfo
                                        ? teacherinfo.fullname
                                        : data[2]}
                                    </span>
                                  ) : (
                                    `${lang.office}: ${data[2]}`
                                  )
                                ) : (
                                  ""
                                )
                              }
                              description={
                                data[3]
                                  ? currentTab2 == "groupnext"
                                    ? `${lang.office}: ${data[3]}`
                                    : `${lang.group2}: ${data[3]}`
                                  : ""
                              }
                              type="inline"
                              /*background={
                              <img
                                style={{ width: "100%" }}
                                src="https://sun9-40.userapi.com/impg/R6XwqoBGYeDf7uYpDOpEU1BXuFri9uTXJ3jClA/_w4Y50ET1Rg.jpg?size=1280x572&quality=95&sign=e6fce4d523ca0fbe9e70e6a984dda4a1&type=album"
                              />
                            }*/
                            >
                              <Badge type="number" mode="primary" large={true}>
                                {Number(data[0])
                                  ? lessoncall[
                                      index == 0 ? 0 : index == 5 ? 2 : 1
                                    ][Number(data[0]) - 1]
                                  : data[0]}
                              </Badge>
                              {today - 1 == index ? (
                                <div className="call">
                                  {Number(data[0])
                                    ? getlessoncall(
                                        lessoncall[
                                          index == 0 ? 0 : index == 5 ? 2 : 1
                                        ][Number(data[0]) - 1],
                                        timekaliningrad
                                      )
                                    : getlessoncall(
                                        data[0],
                                        timekaliningrad,
                                        "."
                                      )}
                                </div>
                              ) : (
                                ""
                              )}
                            </Banner>
                          );
                        }
                      }
                    )}
                  </AccordionContent>
                )}
              </Accordion>
            );
          }
        )}
      </motion.div>
    </AnimatePresence>
  ) : (
    <Wait />
  );
}

export default Schedule;
