const { format } = require("date-fns");

module.exports = async (data, chatid, message_id) => {
  const schedule = [];
  const update = Number(data.split("&*")[1]);
  const groupid = Number(data.split("&*")[2]);
  const groupname = data.split("&*")[3];
  const today = format(new Date(), "dd.MM.yyyy");

  jsonData.map((data3, index) => {
    if (index > 0) {
      Object.entries(data3).forEach(([key, data2]) => {
        if (key.includes("field")) {
          if (key.split("d")[1] == String(groupid + 2)) {
            schedule[schedule.length - 1].push(data2);
          } else if (key.split("d")[1] == String(groupid + 4)) {
            schedule[schedule.length - 1].push(data2);
          } else if (key.split("d")[1] == String(groupid + 5)) {
            schedule[schedule.length - 1].push(data2);
          } else if (key.split("d")[1] == String(groupid + 6)) {
            schedule[schedule.length - 1].push(data2);
          }
        } else {
          if (key == groupname) {
            schedule.push([data2]);
          }
        }
      });
    }
  });

  schedule.map((data2, i) => {
    if (data2[0] == data.split("&*")[4]) {
      if (schedule[i + 8]) {
        schedule.splice(i + 8, schedule.length);
      }

      if (schedule[i - 1]) {
        schedule.splice(0, i);
      }
    }
  });

  /*const getlessoncall = (idlesson, monday) => {
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

      const getdata = (monday) => {
        // костыль жесткий
        if (schedule[monday][0] == "") {
          for (let i = monday; i >= 0; i--) {
            if (schedule[i][0] != "") {
              return schedule[i][0];
            }
          }
        } else {
          return schedule[monday][0];
        }
      };

      const dateObject = new Date(
        `${getdata(monday).split(".")[2]}-${getdata(monday).split(".")[1]}-${
          getdata(monday).split(".")[0]
        }`
      );
      const minut =
        lessonid[idlessonnumber - 1][monday == 1 ? 1 : 0] +
        Math.floor((dateObject - startOfYear) / (60 * 1000));

      //console.log(monday);

      return minut - minutes - 120 < 0 ? "❌" : `${minut - minutes - 120}мин`;
    } else {
      return null;
    }
  };

  ${
    getlessoncall(data[1], index)
      ? ` | (⏰${getlessoncall(data[1], index)})`
      : ""
  }*/

  //❌
  try {
    bot
      .editMessageText(
        `Расписание группы: ${
          data.split("&*")[3]
        }\nОбновлено: ${update}\n${schedule
          .map((data, index) => {
            if (data[0] != "") {
              if (data[2] != "") {
                return `---------------------------\n| ${
                  data[0] == today ? `${data[0]} 🌄` : `${data[0]} 📅`
                } |\n---------------------------\n| ${
                  data[1]
                } | <b>${data[2].toUpperCase()}</b> | ${data[4]} ${
                  data[3] != "" ? `| <i>${data[3]}</i>` : ""
                }`;
              } else {
                return `---------------------------\n| ${
                  data[0] == today ? `${data[0]} 🌄` : `${data[0]} 📅`
                } |\n---------------------------`;
              }
            } else if (data[1] != "") {
              return `| ${data[1]} | <b>${data[2].toUpperCase()}</b> | ${
                data[4]
              } ${data[3] != "" ? `| <i>${data[3]}</i>` : ""}`;
            }
            return "";
          })
          .filter((data) => data !== "")
          .join("\n")}`,
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Обновить",
                  callback_data: `GroupDay&*${
                    update + 1
                  }&*${groupid}&*${groupname}&*${data.split("&*")[4]}`,
                },
              ],
              [
                {
                  text: "Назад",
                  callback_data: `GroupWeek&*${groupid}&*${groupname}`,
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
