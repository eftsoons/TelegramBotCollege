module.exports = async (chatid, message_id) => {
  await bot.editMessageText("Разработчик: @shishkin666\nGithub: Ссылка", {
    chat_id: chatid,
    message_id: message_id,
    reply_markup: {
      inline_keyboard: [[{ text: "Назад", callback_data: "exit" }]],
    },
  });
};
