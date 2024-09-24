import { initBackButton } from "@telegram-apps/sdk";
import {
  Button,
  Caption,
  Cell,
  InlineButtons,
  Input,
  List,
} from "@telegram-apps/telegram-ui";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect } from "react";

import { Navigate, useParams, type Navigator } from "react-router-dom";

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
  const { group } = useParams();

  if (!group) {
    return <Navigate to="/headman" />;
  }

  const [backButton] = initBackButton();

  useEffect(() => {
    const handleBackButton = () => {
      reactNavigator.push("/headman");
    };

    backButton.show();
    backButton.on("click", handleBackButton);

    return () => backButton.off("click", handleBackButton);
  }, [backButton]);

  return (
    <List>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cell after={"Отредактировать"}>{listgroup[Number(group)].name}</Cell>

          <div style={{ padding: "10px" }}>
            {listgroup[Number(group)].user.length > 0
              ? listgroup[Number(group)].user.map((_, index) => {
                  // прикольная реализация
                  const data = listgroup[Number(group)].user;

                  return (
                    index % 3 == 0 && (
                      <InlineButtons
                        key={index}
                        style={{
                          marginBottom:
                            index !=
                            data.length -
                              (data[index + 2] ? 3 : data[index + 1] ? 2 : 1)
                              ? "2.5vh"
                              : "27.5vh",
                        }}
                        mode="bezeled"
                      >
                        <InlineButtonsItem
                          key={index}
                          onClick={() => {}}
                          text={data[index].username}
                        >
                          <Caption weight={"2"}>{data[index].name}</Caption>
                        </InlineButtonsItem>
                        {data[index + 1] && (
                          <InlineButtonsItem
                            key={index + 1}
                            onClick={() => {}}
                            text={data[index + 1].username}
                          >
                            <Caption weight={"2"}>
                              {data[index + 1].name}
                            </Caption>
                          </InlineButtonsItem>
                        )}
                        {data[index + 2] && (
                          <InlineButtonsItem
                            key={index + 2}
                            onClick={() => {}}
                            text={data[index + 2].username}
                          >
                            <Caption weight={"2"}>
                              {data[index + 2].name}
                            </Caption>
                          </InlineButtonsItem>
                        )}
                      </InlineButtons>
                    )
                  );
                })
              : "dsa"}
          </div>

          <div style={{ padding: "10px" }}>
            <Button
              style={{
                position: "absolute",
                bottom: "95px",
                width: "calc(100% - 20px)",
              }}
              stretched={true}
            >
              Скопировать
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </List>
  );
};
