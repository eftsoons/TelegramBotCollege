import { useState, useLayoutEffect, useEffect } from "react";

import { Cell, Section, Accordion, List } from "@telegram-apps/telegram-ui";
import { ConvertTimeZone, GetHeight, getlessoncall } from "../utils";

import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";

import { AnimatePresence, motion } from "framer-motion";

import { initBackButton } from "@telegram-apps/sdk";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import lang from "../lang";

import type { FC } from "react";

const Call: FC = () => {
  const [expand, setexpand] = useState([false, false, false]);
  const [timekaliningrad, settimekaliningrad] = useState<Date>(
    ConvertTimeZone(new Date(), "Europe/Kaliningrad")
  );

  const [backButton] = initBackButton();
  backButton.hide();

  const lp = useLaunchParams();

  useLayoutEffect(() => {
    const expand = localStorage.getItem("ExpandCall");

    setexpand(expand ? JSON.parse(expand) : [false, false, false]);
  }, []);

  const today = timekaliningrad.getDay();

  useEffect(() => {
    const intervalId = setInterval(() => {
      settimekaliningrad(ConvertTimeZone(new Date(), "Europe/Kaliningrad"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const lessoncall = {
    [today == 1 ? `${lang.monday} 🌄` : `${lang.monday} 📅`]: {
      "Разговоры о важном": "08:30-09:10",
      "1 пара": "09:20-10:30",
      "2 пара": "10:40-11:50",
      "Большая переменна": "11:50-12:10",
      "3 пара": "12:10-13:20",
      "4 пара": "13:30-14:40",
      "Большая перемена": "14:40-15:00",
      "Разговоры о важном 2": "15:00-15:40",
      "5 пара": "15:50-17:00",
      "6 пара": "17:10-18:20",
      "7 пара": "18:40-19:50",
      "8 пара": "20:00-21:10",
    },
    /*[today != 1 && today != 0 && today != 6
      ? `${lang.tuesday}-${lang.friday} 🌄`
      : `${lang.tuesday}-${lang.friday} 📅`]: {
      "1 пара": "08:30-09:50",
      "2 пара": "10:00-11:20",
      "Большая переменна": "11:20-11:40",
      "3 пара": "11:40-13:00",
      "4 пара": "13:10-14:30",
      "Большая переменна 2": "14:30-14:50",
      "5 пара": "14:50-16:10",
      "6 пара": "16:20-17:40",
      "Большая переменна 3": "17:40-18:00",
      "7 пара": "18:00-19:20",
      "8 пара": "19:30-20:50",
    },*/
    [today != 1 && today != 0 && today != 6
      ? `${lang.friday} 🌄`
      : `${lang.friday} 📅`]: {
      "1 пара": "08:30-09:10",
      "2 пара": "09:15-09:55",
      "3 пара": "10:00-10:40",
      "4 пара": "10:45-11:25",
      "Большая переменна": "11:25-11:40",
      "5 пара": "11:40-12:20",
      "6 пара": "12:25-13:05",
      "7 пара": "13:10-13:50",
      "8 пара": "13:55-14:35",
    },
    [today == 6 ? `${lang.saturday} 🌄` : `${lang.saturday} 📅`]: {
      "1 пара": "08:30-09:50",
      "2 пара": "09:55-11:15",
      "3 пара": "11:20-12:40",
      "4 пара": "12:45-14:05",
      "5 пара": "14:10-15:30",
      "6 пара": "15:35-16:55",
    },
  } as { [key: string]: { [key: string]: string } };

  return (
    <List>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            height: `${
              GetHeight({ tabl: lessoncall, expand: expand }) + 250
            }px`,
          }}
        >
          {Object.entries(lessoncall).map((data, index) => (
            <Accordion
              expanded={expand[index]}
              key={index}
              onChange={() => {
                const expandclone = [...expand];
                expandclone[index] = !expandclone[index];

                localStorage.setItem("ExpandCall", JSON.stringify(expandclone));
                setexpand(expandclone);
              }}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
                hovered={expand[index]}
              >
                {data[0]}
              </AccordionSummary>
              {(lp.platform != "ios" || expand[index]) && (
                <AccordionContent>
                  <Section>
                    {Object.entries(data[1]).map((data, index) => {
                      const time = getlessoncall(data[1], timekaliningrad);

                      return (
                        <Cell key={index} after={time} description={data[1]}>
                          {data[0]}
                        </Cell>
                      );
                    })}
                  </Section>
                </AccordionContent>
              )}
            </Accordion>
          ))}
        </motion.div>
      </AnimatePresence>
    </List>
  );
};

export default Call;
