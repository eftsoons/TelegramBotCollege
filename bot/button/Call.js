module.exports = async (chatid, message_id) => {
  const today = new Date().getDay();

  const getlessoncall = (timelesson) => {
    const m = Number(timelesson.split("-")[0].split(":")[1]);
    const h = Number(timelesson.split("-")[0].split(":")[0]);
    const minut = m + h * 60;
    const m2 = Number(timelesson.split("-")[1].split(":")[1]);
    const h2 = Number(timelesson.split("-")[1].split(":")[0]);
    const minut2 = m2 + h2 * 60;
    const day = new Date();
    const minutes = day.getHours() * 60 + day.getMinutes();
    return minut - minutes + 60 < 0
      ? minut2 - minutes + 60 > 0
        ? `${minut2 - minutes + 60}мин до конца ✅`
        : "❌"
      : `${minut - minutes + 60}мин до начала`;
  };

  const lessoncall = {
    [today == 1 ? "Понедельник 🌄" : "Понедельник 📅"]: {
      "Классный час": "08:30-09:10",
      "1 пара": "09:20-10:30",
      "2 пара": "10:40-11:50",
      "Большая переменна": "11:50-12:10",
      "3 пара": "12:10-13:20",
      "4 пара": "13:30-14:40",
      "Классный час 2": "15:00-15:40",
      "5 пара": "15:50-17:00",
      "6 пара": "17:10-18:20",
      "7 пара": "18:40-19:50",
      "8 пара": "20:00-21:10",
    },
    [today != 1 && today != 0 ? "Вторник-Суббота 🌄" : "Вторник-Суббота 📅"]: {
      "1 пара": "08:30-09:50",
      "2 пара": "10:00-11:20",
      "Большая переменна": "11:20-11:40",
      "3 пара": "11:40-13:00",
      "4 пара": "13:10-14:30",
      "Большая переменна 2": "14:30-14:50",
      "5 пара": "14:50-16:10",
      "6 пара": "16:20-17:40",
      "Большая переменна 3": "17:40-18:00",
      "7 пара": "18:00-19:20",
      "8 пара": "19:30-20:50",
    },
  };

  // "Большая переменна": "11:50-12:10",

  //  "Большая переменна": "14:30-14:50",

  //  "Большая переменна": "17:40-18:00",

  try {
    if (message_id) {
      await bot
        .editMessageText(
          `Расписание звонков\n${Object.entries(lessoncall)
            .map(([key1, data]) => {
              return `${"-".repeat(
                (key1.length + 1) * 2
              )}\n| ${key1} |\n${"-".repeat(
                (key1.length + 1) * 2
              )}\n${Object.entries(data)
                .map(([key, data]) => {
                  return `| ${key} | ${data} ${
                    key1.includes("🌄") ? `| ${getlessoncall(data)}` : ""
                  }`;
                })
                .join("\n")}`;
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
                    callback_data: "lessoncall",
                  },
                ],
                [
                  {
                    text: "Назад",
                    callback_data: "schedule",
                  },
                ],
              ],
            },
          }
        )
        .catch(() => {});
    } else {
      await bot
        .sendMessage(
          chatid,
          `Расписание звонков\n${Object.entries(lessoncall)
            .map(([key1, data]) => {
              return `${"-".repeat(
                (key1.length + 1) * 2
              )}\n| ${key1} |\n${"-".repeat(
                (key1.length + 1) * 2
              )}\n${Object.entries(data)
                .map(([key, data]) => {
                  return `| ${key} | ${data} ${
                    key1.includes("🌄") ? `| ${getlessoncall(data)}` : ""
                  }`;
                })
                .join("\n")}`;
            })
            .join("\n")}`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Обновить",
                    callback_data: "lessoncall",
                  },
                ],
                [
                  {
                    text: "Назад",
                    callback_data: "schedule",
                  },
                ],
              ],
            },
          }
        )
        .catch(() => {});
    }
  } catch {}
};
