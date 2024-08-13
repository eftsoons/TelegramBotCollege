module.exports = async (chatid, message_id) => {
  try {
    await bot
      .editMessageText(
        "Разработано совместно со Студенческим Советом.\nРазработчик: @shishkin666 (участник студ. совета)\nGithub: https://github.com/eftsoons/TelegramBotCollege.git",
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [[{ text: "Назад", callback_data: "exit" }]],
          },
        }
      )
      .catch(() => {});
  } catch {}
};
