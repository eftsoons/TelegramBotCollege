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

  bot.editMessageCaption(
    `Отправляем фото выше этим группам:\n${sendgroup.join(",")}`,
    {
      chat_id: chatid,
      message_id: message_id,
      reply_markup: {
        inline_keyboard: [[{ text: "Да", callback_data: `yessend` }]],
      },
    }
  );
};
