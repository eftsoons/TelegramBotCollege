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

function Group({
  JsonDataResponse,
  infogroup,
  reactNavigator,
}: {
  JsonDataResponse: Record<string, string>[];
  infogroup: string;
  reactNavigator: any;
}) {
  const [JsonData, setJsonData] =
    useState<Array<Array<{ name: string; key: number }>>>();
  const [searchgroup, setsearchgroup] = useState("");

  const [backButton] = initBackButton();

  const { grouptype } = useParams();

  if (!grouptype) {
    return <Navigate to="/" />;
  }

  useLayoutEffect(() => {
    const search = localStorage.getItem("Search");

    setsearchgroup(search ? search : "");

    setJsonData(GetGroup(grouptype, JsonDataResponse));
  }, []);

  useEffect(() => {
    backButton.show();

    backButton.on("click", () => {
      backButton.hide();
      reactNavigator.push("/");
      localStorage.setItem("Menu", "main");
    });
  }, []);

  return JsonData ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: "10px" }}
      >
        <Input
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
                  marginBottom: index != alldata.length - 1 ? "2.5vh" : "20vh",
                }}
                mode="bezeled"
              >
                {datasearch.map((data, index) => {
                  return (
                    <InlineButtonsItem
                      key={index}
                      onClick={() => {
                        reactNavigator.push(
                          `/schedule/${grouptype}/${data.name}/${String(
                            data.key
                          )}`
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
                      index != alldata.length - 1 ? "2.5vh" : "20vh",
                  }}
                  onClick={() => {
                    reactNavigator.push(
                      `/schedule/${grouptype}/${datasearch.name}/${String(
                        datasearch.key
                      )}`
                    );
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
