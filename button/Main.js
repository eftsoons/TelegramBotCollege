const { GetInfoUser } = require("../function");

module.exports = (name, chatid, message_id) => {
  GetInfoUser(chatid, async function (infouser) {
    if (message_id) {
      await bot.editMessageText(
        `Привет, ${name}!\nТут ты увидишь расписание "Колледжа Предпринимательства"${
          infouser.group ? `\nВыбранная группа: ${infouser.group}` : ""
        }`,
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Расписание",
                  callback_data: "schedule",
                },
                {
                  text: "Автор",
                  callback_data: "author",
                },
              ],
              [
                {
                  text: "Выбор группы",
                  callback_data: "settings&*",
                },
              ],
              [
                {
                  text: "Отзыв",
                  url: "https://t.me/+BId92KCmNjZkODZi",
                },
              ],
            ],
          },
        }
      );
    } else {
      await bot.sendMessage(
        chatid,
        `Привет, ${name}!\nТут ты увидишь расписание "Колледжа Предпринимательства"${
          infouser.group ? `\nВыбранная группа: ${infouser.group}` : ""
        }`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Расписание",
                  callback_data: "schedule",
                },
                {
                  text: "Автор",
                  callback_data: "author",
                },
              ],
              [
                {
                  text: "Выбор группы",
                  callback_data: "settings&*",
                },
              ],
              [
                {
                  text: "Отзыв",
                  url: "https://t.me/+BId92KCmNjZkODZi",
                },
              ],
            ],
          },
        }
      );
    }
  });
};
