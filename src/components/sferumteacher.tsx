import { initUtils, postEvent } from "@telegram-apps/sdk";
import { Button, IconButton, Snackbar } from "@telegram-apps/telegram-ui";
import { Icon } from ".";

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
                      postEvent("web_app_open_link", {
                        url: `https://web.vk.me/convo/${idteachersferum}`,
                        try_browser: true,
                        try_instant_view: false,
                      })
                    }
                  >
                    Согласен
                  </IconButton>
                }
                style={{ zIndex: "1" }}
                onClose={() => {
                  //он баганный
                }}
                duration={5000}
                description={
                  <>
                    <span>
                      Для доступа вам необходимо иметь сферум и подключиться к
                      нашему колледжу.
                    </span>
                    <br />
                    <br />
                    <span>
                      Совет от нас - пишите преподавателям только в рабочее
                      время.
                    </span>
                  </>
                }
              >
                {"Важно!"}
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
                style={{ zIndex: "1" }}
                onClose={() => {
                  //он баганный
                }}
                duration={2000}
              >
                {"Преподаватель еще не подключен к сферуму"}
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
