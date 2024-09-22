import { initUtils } from "@telegram-apps/sdk";
import { Button, IconButton, Snackbar } from "@telegram-apps/telegram-ui";
import { Icon } from ".";
import lang from "../lang";

export default ({
  idteachersferum,
  snackbar,
  setsnackbar,
  text,
  margin,
}: {
  idteachersferum: number;
  snackbar: null | Element;
  setsnackbar: Function;
  text: string;
  margin?: boolean;
}) => {
  const utils = initUtils();

  return (
    <Button
      size="s"
      onClick={(e) => {
        if (idteachersferum != 0) {
          if (!snackbar) {
            setsnackbar(
              <Snackbar
                after={
                  <IconButton
                    onClick={() =>
                      utils.openLink(
                        `https://web.vk.me/convo/${idteachersferum}`,
                        { tryBrowser: true }
                      )
                    }
                  >
                    {lang.agree}
                  </IconButton>
                }
                style={{ zIndex: "3" }}
                onClose={() => {
                  //он баганный
                }}
                duration={5000}
                description={
                  <>
                    <span>{lang.access}</span>
                    <br />
                    <br />
                    <span>{lang.advice}</span>
                  </>
                }
              >
                {lang.important}!
              </Snackbar>
            );

            setTimeout(() => {
              setsnackbar(null);
            }, 5150); // так по правде лучше
          }
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
                {lang.nowriteteacher}
              </Snackbar>
            );

            setTimeout(() => {
              setsnackbar(null);
            }, 2150); // так по правде лучше
          }
        }
        e.stopPropagation();
      }}
      style={{
        marginTop: margin ? "1rem" : "0",
        opacity: idteachersferum != 0 ? "1" : "0.35",
      }}
    >
      {text}
    </Button>
  );
};
