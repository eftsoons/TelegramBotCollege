module.exports = (chatid, message_id) => {
  settext.push(["Отправляем фото выше всем группам?", chatid, message_id]);
  try {
    bot
      .editMessageCaption(
        `Отправляем фото выше всем группам?\nТекст: Замены ❤`,
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [{ text: "Да", callback_data: `yessend` }],
              [{ text: "Назад", callback_data: "exitmenu" }],
            ],
          },
        }
      )
      .catch(() => {});
  } catch {}
};
