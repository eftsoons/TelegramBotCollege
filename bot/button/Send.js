module.exports = (msg, chatid, message_id) => {
  const clickbutton = msg.message.reply_markup.inline_keyboard;
  const sendgroup = [];

  clickbutton.map((data3) => {
    Object.entries(data3).forEach(([key, data2]) => {
      if (data2.text.includes("✅")) {
        sendgroup.push(data2.text.split("✅")[1]);
      }
    });
  });

  settext.push([
    "Отправляем фото выше этим группам:",
    chatid,
    message_id,
    `\n${sendgroup.join(",")}`,
  ]);

  try {
    bot
      .editMessageCaption(
        `Отправляем фото выше этим группам:\nТекст: Замены ❤\n${sendgroup.join(
          ","
        )}`,
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
