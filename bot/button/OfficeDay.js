const { format } = require("date-fns");

module.exports = async (chat_id, message_id, data) => {
  const update = Number(data.split("&*")[1]);
  const officeinfo = [];
  const getoffice = data.split("&*")[2];
  const today = format(new Date(), "dd.MM.yyyy");

  jsonData.map((data2, index2) => {
    Object.entries(data2).forEach(([key, data], index) => {
      if (index2 > 0) {
        //console.log(data2);

        if (key.includes("field")) {
          if (data == getoffice) {
            const numberlesson =
              data2["field" + String(Number(key.split("field")[1]) - 4)];
            const namelesson =
              data2["field" + String(Number(key.split("field")[1]) - 2)];
            const nameteacher =
              data2["field" + String(Number(key.split("field")[1]) - 1)];

            officeinfo[officeinfo.length - 1].push([
              numberlesson,
              namelesson,
              nameteacher,
              index,
            ]);
          }
        } else {
          if (data != "" && !officeinfo.find((data2) => data2[0] == data)) {
            officeinfo.push([data]);
          }
        }
      }
    });
  });

  officeinfo.map((data2, i) => {
    if (data2[0] == data.split("&*")[3]) {
      if (officeinfo[i] + 1) {
        officeinfo.splice(i + 1, officeinfo.length);
      }

      if (officeinfo[i - 1]) {
        officeinfo.splice(0, i);
      }
    }
  });

  jsonData.map((data2) => {
    Object.entries(data2).forEach(([key], index) => {
      officeinfo.map((data) => {
        data.map((data4, index3) => {
          if (index3 > 0) {
            if (data4[3] - 5 == index && !data4[4]) {
              data4.push(key);
            }
          }
        });
      });
    });
  });

  try {
    await bot
      .editMessageText(
        `Расписание кабинета: ${getoffice}\nОбновлено: ${update}\n${officeinfo
          .map((data) => {
            if (data[1]) {
              return `---------------------------\n| ${
                data[0] == today ? `${data[0]} 🌄` : `${data[0]} 📅`
              } |\n---------------------------${data
                .map((data) => {
                  if (Array.isArray(data)) {
                    return `\n| ${data[0]} | <b>${data[1].toUpperCase()}</b> ${
                      data[2] ? `| ${data[2]}` : ""
                    } | <i>${data[4]}</i>`;
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
          chat_id: chat_id,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Обновить",
                  callback_data: `officeday&*${update + 1}&*${getoffice}&*${
                    data.split("&*")[3]
                  }`,
                },
              ],
              [
                {
                  text: "Назад",
                  callback_data: `officeweek&*${getoffice}`,
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
