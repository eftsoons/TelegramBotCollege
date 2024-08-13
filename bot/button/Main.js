const { GetInfoUser } = require("../function");

module.exports = (name, chatid, message_id, chatidsave, channel) => {
  GetInfoUser(chatidsave, async function (infouser) {
    if (message_id) {
      try {
        await bot
          .editMessageText(
            `${
              !channel
                ? `Привет, ${name}!\nТут ты увидишь расписание "Колледжа Предпринимательства"${
                    infouser.group
                      ? `\nПодписка на замены: ${infouser.group}`
                      : ""
                  }`
                : `Привет!\nТут ты увидишь расписание "Колледжа Предпринимательства"`
            }`,
            {
              chat_id: chatid,
              message_id: message_id,
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Расписание",
                      web_app: {
                        url: "https://eftsoons.github.io/FriendsApp/",
                      },
                    },
                  ],
                  /*[
                    {
                      text: "Расписание",
                      callback_data: "schedule",
                    },
                  ],*/
                  [
                    {
                      text: "Автор",
                      callback_data: "author",
                    },
                  ],
                  /*[
                {
                  text: "Выбор группы",
                  callback_data: "settings&*",
                },
              ],*/
                  [
                    {
                      text: "Отзыв",
                      url: "https://t.me/+BId92KCmNjZkODZi",
                    },
                  ],
                ],
              },
            }
          )
          .catch(() => {});
      } catch {}
    } else {
      try {
        await bot
          .sendMessage(
            chatid,
            `${
              !channel
                ? `Привет, ${name}!\nТут ты увидишь расписание "Колледжа Предпринимательства"${
                    infouser.group
                      ? `\nПодписка на замены: ${infouser.group}`
                      : ""
                  }`
                : `Привет!\nТут ты увидишь расписание "Колледжа Предпринимательства"`
            }`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Расписание",
                      web_app: {
                        url: "https://eftsoons.github.io/FriendsApp/",
                      },
                    },
                  ],
                  /*[
                    {
                      text: "Расписание",
                      callback_data: "schedule",
                    },
                  ],*/
                  [{ text: "Автор", callback_data: "author" }],
                  /*[
                {
                  text: "Выбор группы",
                  callback_data: "settings&*",
                },
              ],*/
                  [
                    {
                      text: "Отзыв",
                      url: "https://t.me/+BId92KCmNjZkODZi",
                    },
                  ],
                ],
              },
            }
          )
          .catch(() => {});
      } catch {}
    }
  });
};
