import { initUtils } from "@telegram-apps/sdk";

import {
  Placeholder,
  InlineButtons,
  Caption,
  List,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../components";

import lang from "../lang";

import type { Navigator } from "react-router-dom";

function Main({
  reactNavigator,
  infogroup,
}: {
  reactNavigator: Navigator;
  infogroup: string;
}) {
  const utils = initUtils();

  return (
    <List>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Placeholder
            header={lang.schedule}
            description={
              infogroup != "" ? `${lang.subscribe}: ${infogroup}` : ""
            }
            style={{ paddingTop: "0" }}
            action={
              <>
                <InlineButtons style={{ width: "100%" }} mode="bezeled">
                  <InlineButtonsItem
                    onClick={() => {
                      reactNavigator.push("group/group");
                      localStorage.setItem("Menu", "group");
                      localStorage.setItem("Search", "");
                    }}
                    text={lang.group}
                  >
                    {Icon("group")}
                  </InlineButtonsItem>
                  <InlineButtonsItem
                    onClick={() => {
                      reactNavigator.push("group/teacher");
                      localStorage.setItem("Menu", "teacher");
                      localStorage.setItem("Search", "");
                    }}
                    text={lang.teachers}
                  >
                    {Icon("teacher")}
                  </InlineButtonsItem>
                </InlineButtons>
                <InlineButtonsItem
                  onClick={() => {
                    reactNavigator.push("group/office");
                    localStorage.setItem("Menu", "office");
                    localStorage.setItem("Search", "");
                  }}
                  style={{ width: "100%" }}
                  mode="bezeled"
                  text={lang.offices}
                >
                  {Icon("office")}
                </InlineButtonsItem>
              </>
            }
          >
            <img src="logo.png" loading="eager" />
          </Placeholder>
          <div className="author">
            <Caption className="authortext" weight={"1"}>
              Авторы:{" "}
              <ins
                onClick={() =>
                  utils.openTelegramLink("https://t.me/shishkin666")
                }
              >
                Александр Федорович
              </ins>
              ,{" "}
              <ins
                onClick={() =>
                  utils.openTelegramLink("https://t.me/tommyilinykh")
                }
              >
                Антон Ильиных
              </ins>
            </Caption>
          </div>
        </motion.div>
      </AnimatePresence>
    </List>
  );
}

export default Main;
