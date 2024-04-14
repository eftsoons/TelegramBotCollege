module.exports = async (msg, data, chatid, message_id) => {
  const update = msg.message.text;
  const teacherinfo = [];
  const getteacher = data.split("&*")[1];
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
    if (data2[0] == data.split("&*")[2]) {
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

  await bot.editMessageText(
    `Расписание преподователя [${getteacher}]:${
      update.includes("Расписание")
        ? `\nОбновлено: ${
            update.split("\n")[1].split(":")[1]
              ? `${
                  Number(update.split("\n")[1].split(":")[1].split(" ")[1]) + 1
                } раза`
              : "1 раз"
          }`
        : ""
    }\n${teacherinfo
      .map((data) => {
        if (data[1]) {
          return `---------------------------\n| ${
            data[0]
          } 📅 |\n---------------------------${data
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map((data) => {
              if (Array.isArray(data)) {
                return `\n| ${data[0]} | <b>${data[1].toUpperCase()}</b> | ${
                  data[2]
                } | <i>${data[4]}</i>`;
              }
            })
            .join("")}`;
        } else {
          return `---------------------------\n| ${data[0]}  📅 |\n---------------------------`;
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
              callback_data: `teacherday&*${data.split("&*")[1]}&*${
                data.split("&*")[2]
              }`,
            },
          ],
          [
            {
              text: "Назад",
              callback_data: `teacherweek&*${data.split("&*")[1]}`,
            },
          ],
        ],
      },
      parse_mode: "HTML",
    }
  );
};
