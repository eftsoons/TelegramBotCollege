import { useEffect, useLayoutEffect, useState } from "react";

import {
  InlineButtons,
  Caption,
  Input,
  IconButton,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton } from "@telegram-apps/sdk";

import { Icon } from "../components";

import { Wait } from "./index";

import lang from "../lang";

import { GetGroup } from "../utils";
import { Navigate, useParams } from "react-router-dom";
import type { Navigator } from "react-router-dom";

function Group({
  JsonDataResponse,
  infogroup,
  reactNavigator,
  favourites,
}: {
  JsonDataResponse: Record<string, string>[];
  infogroup: string;
  reactNavigator: Navigator;
  favourites: Array<{ name: string; type: string }>;
}) {
  const [searchgroup, setsearchgroup] = useState("");

  const [backButton] = initBackButton();

  const { grouptype } = useParams();

  if (!grouptype) {
    return <Navigate to="/" />;
  }

  const JsonData = GetGroup(grouptype, JsonDataResponse);

  useLayoutEffect(() => {
    const search = localStorage.getItem("Search");

    setsearchgroup(search ? search : "");
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      console.log(123);
      backButton.hide();
      reactNavigator.push("/");
      localStorage.setItem("Menu", "main");
    };

    backButton.show();

    backButton.on("click", handleBackButton);

    return () => backButton.off("click", handleBackButton);
  }, [backButton]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "10px" }}
      >
        <Input
          id="input-group"
          header={lang.search}
          onChange={(e) => {
            setsearchgroup(e.target.value);
            localStorage.setItem("Search", e.target.value);
          }}
          placeholder={lang.entername}
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
            data.toLocaleUpperCase().includes(searchgroup.toLocaleUpperCase())
          )
        ).map((data: Array<string>, index) => {
          const datasearch = data.filter((data) =>
            data.toLocaleUpperCase().includes(searchgroup.toLocaleUpperCase())
          );

          const alldata = JsonData.filter((data) =>
            data.some((data) =>
              data.toLocaleUpperCase().includes(searchgroup.toLocaleUpperCase())
            )
          );

          if (datasearch.length > 1) {
            return (
              <InlineButtons
                key={index}
                style={{
                  width: "100%",
                  marginBottom: index != alldata.length - 1 ? "2.5vh" : "20vh",
                }}
                mode="bezeled"
              >
                {datasearch.map((data, index) => {
                  const yesfavourites = favourites.some(
                    (data2) => data2.name == data
                  );

                  return (
                    <InlineButtonsItem
                      key={index}
                      onClick={() => {
                        reactNavigator.push(`/schedule/${grouptype}/${data}`);
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
                        localStorage.setItem("Menu", `${grouptype}next`);
                        localStorage.setItem("Data", data);
                        localStorage.setItem("MenuExit", `/group/${grouptype}`);
                      }}
                      text={
                        data == "ИСП 23-21" ||
                        infogroup == data ||
                        yesfavourites
                          ? data
                          : ""
                      }
                    >
                      {data == "ИСП 23-21" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          🏆 {infogroup == data && Icon("check", "1")}{" "}
                          {yesfavourites && Icon("favourites", "1")}
                        </div>
                      ) : infogroup == data || yesfavourites ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          {infogroup == data && Icon("check", "1")}{" "}
                          {yesfavourites && Icon("favourites", "1")}
                        </div>
                      ) : (
                        <Caption weight={"2"}>{data}</Caption>
                      )}
                    </InlineButtonsItem>
                  );
                })}
              </InlineButtons>
            );
          } else {
            const datasearch = data.find((data) =>
              data.toLocaleUpperCase().includes(searchgroup.toLocaleUpperCase())
            );

            const yesfavourites = favourites.some(
              (data2) => data2.name == datasearch
            );

            return (
              datasearch && (
                <InlineButtonsItem
                  key={index}
                  mode="bezeled"
                  style={{
                    width: "100%",
                    marginBottom:
                      index != alldata.length - 1 ? "2.5vh" : "20vh",
                  }}
                  onClick={() => {
                    reactNavigator.push(`/schedule/${grouptype}/${datasearch}`);
                    localStorage.setItem(
                      "Expand",
                      JSON.stringify([false, false, false, false, false, false])
                    );
                    localStorage.setItem("Menu", `${grouptype}next`);
                    localStorage.setItem("Data", datasearch);
                    localStorage.setItem("MenuExit", `/group/${grouptype}`);
                  }}
                  text={
                    datasearch == "ИСП 23-21" ||
                    infogroup == datasearch ||
                    yesfavourites
                      ? datasearch
                      : ""
                  }
                >
                  {datasearch == "ИСП 23-21" ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      🏆 {infogroup == datasearch && Icon("check", "1")}{" "}
                      {yesfavourites && Icon("favourites", "1")}
                    </div>
                  ) : infogroup == datasearch || yesfavourites ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      {infogroup == datasearch && Icon("check", "1")}{" "}
                      {yesfavourites && Icon("favourites", "1")}
                    </div>
                  ) : (
                    <Caption weight={"2"}>{datasearch}</Caption>
                  )}
                </InlineButtonsItem>
              )
            );
          }
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default Group;
