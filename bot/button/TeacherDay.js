const { format } = require("date-fns");

module.exports = async (data, chatid, message_id) => {
  const update = Number(data.split("&*")[1]);
  const teacherinfo = [];
  const getteacher = data.split("&*")[2];
  const today = format(new Date(), "dd.MM.yyyy");

  jsonData.map((data2, index2) => {
    Object.entries(data2).forEach(([key, data], index) => {
      if (index2 > 0) {
        if (key.includes("field")) {
          if (data == getteacher) {
            const numberlesson =
              data2["field" + String(Number(key.split("field")[1]) - 3)];
            const namelesson =
              data2["field" + String(Number(key.split("field")[1]) - 1)];
            const officelesson =
              data2["field" + String(Number(key.split("field")[1]) + 1)];

            teacherinfo[teacherinfo.length - 1].push([
              numberlesson,
              namelesson,
              officelesson,
              index,
            ]);
          }
        } else {
          if (data != "" && !teacherinfo.find((data2) => data2[0] == data)) {
            teacherinfo.push([data]);
          }
        }
      }
    });
  });

  teacherinfo.map((data2, i) => {
    if (data2[0] == data.split("&*")[3]) {
      if (teacherinfo[i] + 1) {
        teacherinfo.splice(i + 1, teacherinfo.length);
      }

      if (teacherinfo[i - 1]) {
        teacherinfo.splice(0, i);
      }
    }
  });

  jsonData.map((data2) => {
    Object.entries(data2).forEach(([key], index) => {
      teacherinfo.map((data) => {
        data.map((data4, index3) => {
          if (index3 > 0) {
            if (data4[3] - 4 == index && !data4[4]) {
              data4.push(key);
            }
          }
        });
      });
    });
  });

  /*const getlessoncall = (idlesson, monday, data) => {
    const idlessonnumber = Number(idlesson);
    if (idlessonnumber) {
      const day = new Date();
      const lessonid = [
        [510, 560],
        [600, 640],
        [700, 730],
        [790, 810],
        [890, 950],
        [980, 1030],
        [1080, 1120],
        [1170, 1200],
      ];

      const startOfYear = new Date(day.getFullYear(), 0, 1);
      const minutes = Math.floor((day - startOfYear) / (60 * 1000));

      const dateObject = new Date(
        `${data.split(".")[2]}-${data.split(".")[1]}-${data.split(".")[0]}`
      );
      const minut =
        lessonid[idlessonnumber - 1][monday == "0" ? 1 : 0] +
        Math.floor((dateObject - startOfYear) / (60 * 1000));

      return minut - minutes - 120 < 0 ? "❌" : `${minut - minutes - 120}мин`;
    } else {
      return null;
    }
  };

  ${getlessoncall(
    data[0],
    index,
    teacherinfo[index][0]
  )}*/

  try {
    bot
      .editMessageText(
        `Расписание преподователя: ${getteacher}\nОбновлено: ${update}\n${teacherinfo
          .map((data) => {
            if (data[1]) {
              return `---------------------------\n| ${
                data[0] == today ? `${data[0]} 🌄` : `${data[0]} 📅`
              } |\n---------------------------${data
                .map((data) => {
                  if (Array.isArray(data)) {
                    return `\n| ${
                      data[0]
                    } | <b>${data[1].toUpperCase()}</b> | ${data[2]} | <i>${
                      data[4]
                    }</i>`;
                  }
                })
                .sort((a, b) => {
                  return Number(a.split("|")[1]) - Number(b.split("|")[1]);
                })
                .join("")}`;
            } else {
              return `---------------------------\n| ${
                data[0] == today ? `${data[0]} 🌄` : `${data[0]} 📅`
              } |\n---------------------------`;
            }
          })
          .join("\n")}`,
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Обновить",
                  callback_data: `teacherday&*${update + 1}&*${
                    data.split("&*")[2]
                  }&*${data.split("&*")[3]}`,
                },
              ],
              [
                {
                  text: "Назад",
                  callback_data: `teacherweek&*${data.split("&*")[2]}`,
                },
              ],
            ],
          },
          parse_mode: "HTML",
        }
      )
      .catch(() => {});
  } catch {}
};
