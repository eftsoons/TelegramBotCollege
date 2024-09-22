import { useEffect } from "react";

import { InlineButtons, List, Placeholder } from "@telegram-apps/telegram-ui";
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
    backButton.show();

    backButton.on("click", () => {
      backButton.hide();
      reactNavigator.push("/");
      localStorage.setItem("Menu", "main");
    });
  }, []);

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
                      text={favourites[index].name}
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
                    />
                    {favourites[index + 1] && (
                      <InlineButtonsItem
                        key={index + 1}
                        text={favourites[index + 1].name}
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
                      />
                    )}
                    {favourites[index + 2] && (
                      <InlineButtonsItem
                        key={index + 2}
                        text={favourites[index + 2].name}
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
                      />
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
