import { initBackButton } from "@telegram-apps/sdk";
import {
  Accordion,
  Cell,
  Info,
  Placeholder,
  Section,
  Text,
} from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GetInfoTeacher } from "../utils";

import Icons from "../components/icon";

function Teacher({
  setCurrentTab2,
  activegroup,
}: {
  setCurrentTab2: Function;
  activegroup: string;
}) {
  const [opengroup, setopengroup] = useState(false);
  const [opensubjects, setopensubjects] = useState(false);
  const [openeducation, setopeneducation] = useState(false);

  const [backButton] = initBackButton();

  const info = GetInfoTeacher(activegroup);

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
        {info ? (
          <>
            <Cell
              description={`Учённая степень: ${info.degree}`}
              subhead={info.rank}
              subtitle={`Категория: ${info.category}`}
            >
              {activegroup}
            </Cell>
            <Cell
              subhead={"Стаж работы"}
              subtitle={`Педагогический: ${info.experiencecollege} лет`}
              description={`В профессии: ${info.experiencework} лет`}
            >
              {info.experience} лет
            </Cell>
            <Accordion
              expanded={opengroup}
              onChange={() => setopengroup(!opengroup)}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
              >
                Группы
              </AccordionSummary>
              <AccordionContent>
                <Section style={{ height: "100%" }}>
                  {info.group.map(
                    (data: { code: string; name: string }, index: number) => (
                      <Cell
                        multiline={true}
                        key={index}
                        description={`Код группы: ${data.code}`}
                      >
                        {data.name}
                      </Cell>
                    )
                  )}
                </Section>
              </AccordionContent>
            </Accordion>
            <Accordion
              expanded={opensubjects}
              onChange={() => setopensubjects(!opensubjects)}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
              >
                Предметы
              </AccordionSummary>
              <AccordionContent>
                <Section style={{ height: "100%" }}>
                  {info.subjects.map(
                    (
                      data: { code: string | null; name: string },
                      index: number
                    ) => (
                      <Cell
                        multiline={true}
                        key={index}
                        description={
                          data.code ? `Код предмета: ${data.code}` : ""
                        }
                      >
                        {data.name}
                      </Cell>
                    )
                  )}
                </Section>
              </AccordionContent>
            </Accordion>
            <Accordion
              expanded={openeducation}
              onChange={() => setopeneducation(!openeducation)}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
              >
                Образование
              </AccordionSummary>
              <AccordionContent
                style={{
                  background: "none",
                  marginBottom: "16vh",
                }}
              >
                <Section style={{ height: "100%" }}>
                  {info.education.map(
                    (
                      data: { name: string; college: string },
                      index: number
                    ) => (
                      <Cell
                        multiline={true}
                        key={index}
                        description={data.college}
                      >
                        {data.name}
                      </Cell>
                    )
                  )}
                </Section>
              </AccordionContent>
            </Accordion>
          </>
        ) : (
          <Placeholder
            header={Icons("notinfo")}
            style={{ paddingTop: "0", height: "80vh" }}
          >
            <Text weight={"1"}>Информация отсутствует</Text>
          </Placeholder>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Teacher;
