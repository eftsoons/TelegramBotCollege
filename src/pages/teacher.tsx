import { initBackButton } from "@telegram-apps/sdk";
import { Info, Placeholder } from "@telegram-apps/telegram-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

function Teacher({
  setCurrentTab2,
  activegroup,
}: {
  setCurrentTab2: Function;
  activegroup: string;
}) {
  const [backButton] = initBackButton();

  useEffect(() => {
    backButton.show();

    backButton.on("click", () => {
      backButton.hide();
      setCurrentTab2("teachernext");
      localStorage.setItem("Menu", "main");
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Placeholder
          header={"Спарсить данные с"}
          description={
            "https://www.kolledge39.ru/files/polozheniya/employees.pdf"
          }
        >
          <Info
            subtitle="Вот тут типа данные о преподе (сделать норм дизайн и т.д.)"
            type="text"
          >
            {activegroup}
          </Info>
        </Placeholder>
      </motion.div>
    </AnimatePresence>
  );
}

export default Teacher;
