module.exports = async (msg, data, chatid, message_id) => {
  const update = msg.message.text;
  const schedule = [];

  jsonData.map((data3, index) => {
    if (index > 0) {
      Object.entries(data3).forEach(([key, data2]) => {
        if (key.includes("field")) {
          if (key.split("d")[1] == String(Number(data.split("&*")[1]) + 2)) {
            schedule[schedule.length - 1].push(data2);
          } else if (
            key.split("d")[1] == String(Number(data.split("&*")[1]) + 4)
          ) {
            schedule[schedule.length - 1].push(data2);
          } else if (
            key.split("d")[1] == String(Number(data.split("&*")[1]) + 5)
          ) {
            schedule[schedule.length - 1].push(data2);
          } else if (
            key.split("d")[1] == String(Number(data.split("&*")[1]) + 6)
          ) {
            schedule[schedule.length - 1].push(data2);
          }
        } else {
          if (key == data.split("&*")[2]) {
            schedule.push([data2]);
          }
        }
      });
    }
  });

  schedule.map((data2, i) => {
    if (data2[0] == data.split("&*")[3]) {
      if (schedule[i + 8]) {
        schedule.splice(i + 8, schedule.length);
      }

      if (schedule[i - 1]) {
        schedule.splice(0, i);
      }
    }
  });

  await bot.editMessageText(
    `Расписание [${data.split("&*")[2]}]:${
      update.includes("Расписание")
        ? `\nОбновлено: ${
            update.split("\n")[1].split(":")[1]
              ? `${
                  Number(update.split("\n")[1].split(":")[1].split(" ")[1]) + 1
                } раза`
              : "1 раз"
          }`
        : ""
    }\n${schedule
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
              callback_data: `GroupDay&*${data.split("&*")[1]}&*${
                data.split("&*")[2]
              }&*${data.split("&*")[3]}`,
            },
          ],
          [
            {
              text: "Назад",
              callback_data: `GroupWeek&*${data.split("&*")[1]}&*${
                data.split("&*")[2]
              }`,
            },
          ],
        ],
      },
      parse_mode: "HTML",
    }
  );
};
