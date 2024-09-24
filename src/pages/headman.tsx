import { useEffect } from "react";

import {
  Button,
  Caption,
  InlineButtons,
  List,
  Placeholder,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";
import { AnimatePresence, motion } from "framer-motion";

import { type Navigator } from "react-router-dom";

import { initBackButton } from "@telegram-apps/sdk";

export default ({
  listgroup,
  reactNavigator,
}: {
  listgroup: Array<{
    name: string;
    user: Array<{ username: string; name: string; status: string }>;
  }>;
  reactNavigator: Navigator;
}) => {
  const [backButton] = initBackButton();

  useEffect(() => backButton.hide(), []);

  return (
    <List>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ margin: "10px" }}
        >
          {/*<InlineButtonsItem style={{ width: "100%" }} mode="bezeled">
            Для старост
          </InlineButtonsItem>*/}

          {listgroup.length > 0 ? (
            listgroup.map((_, index) => {
              // прикольная реализация
              return (
                index % 3 == 0 && (
                  <InlineButtons
                    key={index}
                    style={{
                      marginBottom:
                        index != listgroup.length - 1 ? "2.5vh" : "20vh",
                    }}
                    mode="bezeled"
                  >
                    <InlineButtonsItem
                      key={index}
                      onClick={() => {
                        reactNavigator.push(`/headman/group/${index}`);
                      }}
                    >
                      <Caption weight={"2"}>{listgroup[index].name}</Caption>
                    </InlineButtonsItem>
                    {listgroup[index + 1] && (
                      <InlineButtonsItem
                        key={index + 1}
                        onClick={() => {
                          reactNavigator.push(`/headman/group/${index + 1}`);
                        }}
                      >
                        <Caption weight={"2"}>
                          {listgroup[index + 1].name}
                        </Caption>
                      </InlineButtonsItem>
                    )}
                    {listgroup[index + 2] && (
                      <InlineButtonsItem
                        key={index + 2}
                        onClick={() => {
                          reactNavigator.push(`/headman/group/${index + 2}`);
                        }}
                      >
                        <Caption weight={"2"}>
                          {listgroup[index + 2].name}
                        </Caption>
                      </InlineButtonsItem>
                    )}
                  </InlineButtons>
                )
              );
            })
          ) : (
            <Placeholder>asd</Placeholder>
          )}

          <Button
            style={{
              position: "absolute",
              bottom: "95px",
              width: "calc(100% - 20px)",
            }}
          >
            Добавить группу
          </Button>
        </motion.div>
      </AnimatePresence>
    </List>
  );
};
