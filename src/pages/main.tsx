import { initBackButton, initUtils } from "@telegram-apps/sdk";

import {
  Placeholder,
  InlineButtons,
  Caption,
  List,
  Snackbar,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

import { AnimatePresence, motion } from "framer-motion";

import { Icon } from "../components";

import lang from "../lang";

import type { Navigator } from "react-router-dom";

function Main({
  reactNavigator,
  infogroup,
  snackbar,
  setsnackbar,
  favourites,
}: {
  reactNavigator: Navigator;
  infogroup: string;
  snackbar: Element | null;
  setsnackbar: Function;
  favourites: Array<{ name: string; type: string }>;
}) {
  const utils = initUtils();

  return (
    <List style={{ height: "650px" /*marginTop: "70px"*/ }}>
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
                <InlineButtonsItem
                  onClick={() => {
                    if (favourites.length > 0) {
                      reactNavigator.push("/favourites");
                      localStorage.setItem("Menu", "favourites");
                      localStorage.setItem("Search", "");
                    } else {
                      if (!snackbar) {
                        setsnackbar(
                          <Snackbar
                            before={Icon("bug")}
                            style={{ zIndex: "3" }}
                            onClose={() => {
                              //он баганный
                            }}
                            duration={2000}
                          >
                            Избранное пусто
                          </Snackbar>
                        );

                        setTimeout(() => {
                          setsnackbar(null);
                        }, 2150);
                      }
                    }
                  }}
                  style={{ width: "100%" }}
                  mode="bezeled"
                  text="Избранное"
                >
                  {Icon("favourites")}
                </InlineButtonsItem>
                {/*<InlineButtonsItem
                  onClick={() => {
                    reactNavigator.push("group/office");
                    localStorage.setItem("Menu", "office");
                    localStorage.setItem("Search", "");
                  }}
                  style={{ width: "100%" }}
                  mode="bezeled"
                  text="Для старост"
                >
                  {Icon("office")}
                </InlineButtonsItem>*/}
              </>
            }
          >
            <img src="logo.png" loading="eager" />
          </Placeholder>
          <div className="author">
            <Caption className="authortext" weight={"1"}>
              {lang.authors}:
            </Caption>
            <Caption className="authortext" weight={"1"}>
              <ins
                onClick={() =>
                  utils.openTelegramLink("https://t.me/shishkin666")
                }
              >
                Александр Федорович
              </ins>{" "}
              {lang.and}{" "}
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
