module.exports = async (chatid, message_id, command, channel) => {
  try {
    if (!command) {
      await bot
        .editMessageText("Расписание", {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Групп", callback_data: "Group" },
                {
                  text: "Преподователей",
                  callback_data: "Teacher",
                },
                { text: "Кабинетов", callback_data: "office" },
              ],
              [{ text: "Звонков", callback_data: "lessoncall" }],
              [{ text: "Подписаться на замены", callback_data: "settings&*" }],
              [
                {
                  text: "Назад",
                  callback_data: "exit",
                },
              ],
            ],
          },
        })
        .catch(() => {});
    } else {
      await bot
        .sendMessage(chatid, "Расписание", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Групп", callback_data: "Group" },
                {
                  text: "Преподователей",
                  callback_data: "Teacher",
                },
                { text: "Кабинетов", callback_data: "office" },
              ],
              [{ text: "Звонков", callback_data: "lessoncall" }],
              [{ text: "Подписаться на замены", callback_data: "settings&*" }],
              [
                {
                  text: "Назад",
                  callback_data: "exit",
                },
              ],
            ],
          },
        })
        .catch(() => {});
    }
  } catch {}
  /*try {
    if (!command) {
      await bot
        .editMessageText("Расписание", {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Групп", callback_data: "Group" },
                {
                  text: "Преподователей",
                  callback_data: "Teacher",
                },
                { text: "Кабинетов", callback_data: "office" },
              ],
              [{ text: "Звонков", callback_data: "lessoncall" }],
              channel
                ? [
                    {
                      text: "❌ Подписаться на замены ❌",
                      callback_data: "fghfghfgh",
                    },
                  ]
                : [
                    {
                      text: "Подписаться на замены",
                      callback_data: "settings&*",
                    },
                  ],
              [
                {
                  text: "Назад",
                  callback_data: "exit",
                },
              ],
            ],
          },
        })
        .catch(() => {});
    } else {
      await bot
        .sendMessage(chatid, "Расписание", {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Групп", callback_data: "Group" },
                {
                  text: "Преподователей",
                  callback_data: "Teacher",
                },
                { text: "Кабинетов", callback_data: "office" },
              ],
              [{ text: "Звонков", callback_data: "lessoncall" }],
              [{ text: "Подписаться на замены", callback_data: "settings&*" }],
              [
                {
                  text: "Назад",
                  callback_data: "exit",
                },
              ],
            ],
          },
        })
        .catch(() => {});
    }
  } catch {}*/
  /*try {
    if (!command) {
      await bot
        .editMessageText(
          "Поздравляю с окончанием учебного года ⭐️\nРасписание пока недоступно из-за ненадобности ❌\nЖелаю тебе провести это лето именно так, как ты хочешь 🌄\nЕсли есть предложения по реализации каких-то идей, то напиши нам - @shishkin666, @tommyilinykh ✍️",
          {
            chat_id: chatid,
            message_id: message_id,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Назад",
                    callback_data: "exit",
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
          "Поздравляю с окончанием учебного года ⭐️\nРасписание пока недоступно из-за ненадобности ❌\nЖелаю тебе провести это лето именно так, как ты хочешь 🌄\nЕсли есть предложения по реализации каких-то идей, то напиши нам - @shishkin666, @tommyilinykh ✍️",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Назад",
                    callback_data: "exit",
                  },
                ],
              ],
            },
          }
        )
        .catch(() => {});
    }
  } catch {}*/
};
