import { useEffect, useLayoutEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton, retrieveLaunchParams } from "@telegram-apps/sdk";
import {
  Accordion,
  Badge,
  Banner,
  Cell,
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
  GetSferum,
} from "../utils";

import axios from "axios";

import { Icon, SferumTeacher } from "../components";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import lang from "../lang";
import { Navigate, useParams } from "react-router-dom";

import type { Navigator } from "react-router-dom";

function Schedule({
  snackbar,
  setsnackbar,
  JsonData,
  infogroup,
  setinfogroup,
  reactNavigator,
}: {
  snackbar: null | Element;
  setsnackbar: Function;
  JsonData: Record<string, string>[];
  infogroup: string;
  setinfogroup: Function;
  reactNavigator: Navigator;
}) {
  const [backButton] = initBackButton();
  const launchParams = retrieveLaunchParams();
  const lp = useLaunchParams();

  const { nameparams, key, grouptype } = useParams();

  if (!nameparams || !key || !grouptype) {
    return <Navigate to="/" />;
  }

  const name = decodeURIComponent(nameparams);

  const infoteacher = GetInfoTeacher(name);
  const idinfosferum = GetSferum(name);

  const [info, setinfo] = useState<
    Array<Array<[string, string, string, string]>>
  >([[]]);
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
    const info = GetInfoGroup(grouptype, name, key, JsonData);

    if (info) {
      setinfo(info);
    } else {
      reactNavigator.push(`/group/${grouptype}`);
    }

    const expand = localStorage.getItem("Expand");

    setexpand(
      expand ? JSON.parse(expand) : [false, false, false, false, false, false]
    );
  }, []);

  useEffect(() => {
    backButton.show();
    backButton.on("click", () => {
      backButton.hide();
      reactNavigator.push(`/group/${grouptype}`);
      localStorage.setItem("Menu", grouptype);
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

  /*<div className="sferum">
    
    <IconButton
      size="s"
      onClick={() =>
        utils.openLink(
          "https://web.vk.me/convo/818778625"
        )
      }
    >
      {Icon("bomb")}
    </IconButton>
  </div>*/

  return (
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
            grouptype == "group" ? (
              <Multiselectable
                defaultChecked={infogroup == name ? true : false}
                name="multiselect"
                value="1"
                onClick={async () => {
                  await axios.post(`${import.meta.env.VITE_API_URL}/setgroup`, {
                    initData: launchParams.initDataRaw,
                    setgroup: name,
                  });

                  const group = await axios.post(
                    `${import.meta.env.VITE_API_URL}/group`,
                    {
                      initData: launchParams.initDataRaw,
                    }
                  );

                  setinfogroup(group.data);

                  if (!snackbar) {
                    if (infogroup == name) {
                      setsnackbar(
                        <Snackbar
                          before={Icon("check")}
                          style={{ zIndex: "3" }}
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
                          style={{ zIndex: "3" }}
                          onClose={() => {
                            //он баганный
                          }}
                          duration={2000}
                          description={`${lang.subscribenotificationon} ${name}`}
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
            if (grouptype == "teacher") {
              reactNavigator.push(`/teacherinfo/${name}`);
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
          description={grouptype == "group" ? `${lang.subscribe}` : ""}
          after={
            grouptype == "teacher" && (
              <SferumTeacher
                idteachersferum={idinfosferum}
                snackbar={snackbar}
                setsnackbar={setsnackbar}
                text="Написать"
              />
            )
          }
        >
          {infoteacher ? infoteacher.fullname : name}
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
                      marginBottom: index == info.length - 1 ? "20vh" : "0",
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
                                  grouptype == "group" ? (
                                    data[3] ? (
                                      <span>
                                        {lang.teacher}:{" "}
                                        <ins
                                          onClick={() => {
                                            reactNavigator.push(
                                              `/teacherinfo/${data[2]}`
                                            );
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
                                            localStorage.setItem("Search", "");
                                            localStorage.setItem(
                                              "Menu",
                                              "teacherinfo"
                                            );
                                            localStorage.setItem(
                                              "Data",
                                              data[2]
                                            );
                                          }}
                                          className="teachera"
                                        >
                                          {teacherinfo
                                            ? teacherinfo.fullname
                                            : data[2]}
                                        </ins>
                                      </span>
                                    ) : (
                                      `${lang.office}: ${data[2]}`
                                    )
                                  ) : grouptype == "office" ? (
                                    <span>
                                      {lang.teacher}:{" "}
                                      <ins
                                        onClick={() => {
                                          reactNavigator.push(
                                            `/teacherinfo/${data[2]}`
                                          );
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
                                          localStorage.setItem("Search", "");
                                          localStorage.setItem(
                                            "Menu",
                                            "teacherinfo"
                                          );
                                          localStorage.setItem("Data", data[2]);
                                        }}
                                        className="teachera"
                                      >
                                        {teacherinfo
                                          ? teacherinfo.fullname
                                          : data[2]}
                                      </ins>
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
                                  ? grouptype == "group"
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
                              <div className="infolesson">
                                <div className="callmain">
                                  <Badge
                                    type="number"
                                    mode="primary"
                                    large={true}
                                  >
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
                                              index == 0
                                                ? 0
                                                : index == 5
                                                ? 2
                                                : 1
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
                                </div>
                                {/*grouptype == "group"
                                  ? data[3] && (
                                      <SferumTeacher
                                        idteachersferum={idteachersferum}
                                        snackbar={snackbar}
                                        setsnackbar={setsnackbar}
                                        text="Написать преподавателю"
                                        margin={true}
                                      />
                                    )
                                  : grouptype == "office"
                                  ? data[2] && (
                                      <SferumTeacher
                                        idteachersferum={idteachersferum}
                                        snackbar={snackbar}
                                        setsnackbar={setsnackbar}
                                        text="Написать преподавателю"
                                        margin={true}
                                      />
                                    )
                                  : ""*/}
                              </div>
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
  );
}

export default Schedule;
