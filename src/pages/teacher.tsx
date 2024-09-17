import { initBackButton } from "@telegram-apps/sdk";
import {
  Accordion,
  Cell,
  Placeholder,
  Section,
  Text,
} from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GetInfoTeacher } from "../utils";

import { Icon } from "../components";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import lang from "../lang";
import { Navigate, useParams } from "react-router-dom";
import type { Navigator } from "react-router-dom";

function Teacher({ reactNavigator }: { reactNavigator: Navigator }) {
  const [opengroup, setopengroup] = useState(false);
  const [opensubjects, setopensubjects] = useState(false);
  const [openeducation, setopeneducation] = useState(false);

  const [backButton] = initBackButton();

  const { nameteacher } = useParams();

  if (!nameteacher) {
    return <Navigate to="/" />;
  }

  const info = GetInfoTeacher(nameteacher);

  const lp = useLaunchParams();

  useEffect(() => {
    backButton.show();

    backButton.on("click", () => {
      backButton.hide();
      reactNavigator.push(`/schedule/teacher/${nameteacher}/0`);
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
              description={`${lang.academidegree}: ${info.degree}`}
              subhead={info.rank}
              subtitle={`${lang.category}: ${info.category}`}
            >
              {info.fullname}
            </Cell>
            <Cell
              subhead={lang.workexperience}
              subtitle={`${lang.pedagogical}: ${info.experiencecollege} ${lang.years}`}
              description={`${lang.profession}: ${info.experiencework} ${lang.years}`}
            >
              {info.experience} {lang.years}
            </Cell>
            <Accordion
              expanded={opengroup}
              onChange={() => setopengroup(!opengroup)}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
              >
                {lang.groups}
              </AccordionSummary>
              {(lp.platform != "ios" || opengroup) && (
                <AccordionContent>
                  <Section style={{ height: "100%" }}>
                    {info.group.map(
                      (data: { code: string; name: string }, index: number) => (
                        <Cell
                          multiline={true}
                          key={index}
                          description={`${lang.codegroup}: ${data.code}`}
                        >
                          {data.name}
                        </Cell>
                      )
                    )}
                  </Section>
                </AccordionContent>
              )}
            </Accordion>
            <Accordion
              expanded={opensubjects}
              onChange={() => setopensubjects(!opensubjects)}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
              >
                {lang.items}
              </AccordionSummary>
              {(lp.platform != "ios" || opensubjects) && (
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
                            data.code ? `${lang.itemcode}: ${data.code}` : ""
                          }
                        >
                          {data.name}
                        </Cell>
                      )
                    )}
                  </Section>
                </AccordionContent>
              )}
            </Accordion>
            <Accordion
              expanded={openeducation}
              onChange={() => setopeneducation(!openeducation)}
            >
              <AccordionSummary
                style={{ margin: "0" }}
                interactiveAnimation="opacity"
              >
                {lang.education}
              </AccordionSummary>
              <AccordionContent
                style={{
                  background: "none",
                  marginBottom: "20vh",
                }}
              >
                <Section style={{ height: "100%" }}>
                  {info.education.map((data: string, index: number) => (
                    <Cell multiline={true} key={index}>
                      {data}
                    </Cell>
                  ))}
                </Section>
              </AccordionContent>
            </Accordion>
          </>
        ) : (
          <Placeholder
            header={Icon("notinfo")}
            style={{ paddingTop: "0", height: "80vh" }}
          >
            <Text weight={"1"}>{lang.notinformation}</Text>
          </Placeholder>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Teacher;
