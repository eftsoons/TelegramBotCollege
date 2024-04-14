module.exports = async (chatid, message_id) => {
  await bot.editMessageText("Расписание", {
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
        ],
        [
          {
            text: "Назад",
            callback_data: "exit",
          },
        ],
      ],
    },
  });
};
