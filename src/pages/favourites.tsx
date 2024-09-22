import { useEffect } from "react";

import { Caption, InlineButtons, List } from "@telegram-apps/telegram-ui";
import { AnimatePresence, motion } from "framer-motion";
import { initBackButton } from "@telegram-apps/sdk";

import { Navigate, type Navigator } from "react-router-dom";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

export default ({
  favourites,
  reactNavigator,
}: {
  favourites: Array<{ name: string; type: string }>;
  reactNavigator: Navigator;
}) => {
  const [backButton] = initBackButton();

  useEffect(() => {
    const handleBackButton = () => {
      backButton.hide();
      reactNavigator.push("/");
      localStorage.setItem("Menu", "main");
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
          style={{ padding: "10px" }}
        >
          {favourites.length > 0 ? (
            favourites.map((_, index) => {
              // прикольная реализация
              return (
                index % 3 == 0 && (
                  <InlineButtons
                    key={index}
                    style={{
                      marginBottom:
                        index != favourites.length - 1 ? "2.5vh" : "20vh",
                    }}
                    mode="bezeled"
                  >
                    <InlineButtonsItem
                      key={index}
                      onClick={() => {
                        reactNavigator.push(
                          `/schedule/${favourites[index].type}/${favourites[index].name}`
                        );
                        localStorage.setItem(
                          "Menu",
                          `${favourites[index].type}next`
                        );
                        localStorage.setItem("Data", favourites[index].name);
                        localStorage.setItem("MenuExit", `/favourites`);
                      }}
                    >
                      <Caption weight={"2"}>{favourites[index].name}</Caption>
                    </InlineButtonsItem>
                    {favourites[index + 1] && (
                      <InlineButtonsItem
                        key={index + 1}
                        onClick={() => {
                          reactNavigator.push(
                            `/schedule/${favourites[index + 1].type}/${
                              favourites[index + 1].name
                            }`
                          );
                          localStorage.setItem(
                            "Menu",
                            `${favourites[index + 1].type}next`
                          );
                          localStorage.setItem(
                            "Data",
                            favourites[index + 1].name
                          );
                          localStorage.setItem("MenuExit", `/favourites`);
                        }}
                      >
                        <Caption weight={"2"}>
                          {favourites[index + 1].name}
                        </Caption>
                      </InlineButtonsItem>
                    )}
                    {favourites[index + 2] && (
                      <InlineButtonsItem
                        key={index + 2}
                        onClick={() => {
                          reactNavigator.push(
                            `/schedule/${favourites[index + 2].type}/${
                              favourites[index + 2].name
                            }`
                          );
                          localStorage.setItem(
                            "Menu",
                            `${favourites[index + 2].type}next`
                          );
                          localStorage.setItem(
                            "Data",
                            favourites[index + 2].name
                          );
                          localStorage.setItem("MenuExit", `/favourites`);
                        }}
                      >
                        <Caption weight={"2"}>
                          {favourites[index + 2].name}
                        </Caption>
                      </InlineButtonsItem>
                    )}
                  </InlineButtons>
                )
              );
            })
          ) : (
            <Navigate to="/" />
          )}
        </motion.div>
      </AnimatePresence>
    </List>
  );
};
