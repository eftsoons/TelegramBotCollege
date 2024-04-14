module.exports = async (data, chatid, message_id) => {
  const schedule = [];
  const update = Number(data.split("&*")[1]);
  const groupid = Number(data.split("&*")[2]);
  const groupname = data.split("&*")[3];

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

  bot.editMessageText(
    `Расписание [${data.split("&*")[3]}]:\nОбновлено: ${update}\n${schedule
      .map((data) => {
        if (data[0] != "") {
          if (data[2] != "") {
            return `---------------------------\n| ${
              data[0]
            } 📅 |\n---------------------------\n| ${
              data[1]
            } | <b>${data[2].toUpperCase()}</b> | ${data[4]} | <i>${
              data[3]
            }</i>`;
          } else {
            return `---------------------------\n| ${data[0]} 📅 |\n---------------------------`;
          }
        } else if (data[1] != "") {
          return `| ${data[1]} | <b>${data[2].toUpperCase()}</b> | ${
            data[4]
          } | <i>${data[3]}</i>`;
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
  );
};
