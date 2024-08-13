module.exports = (msg, data, chatid, message_id) => {
  const clickbutton = msg.message.reply_markup.inline_keyboard;
  const checkid2 = data.split("&*")[1];

  clickbutton.map((data3) => {
    Object.entries(data3).forEach(([key, data2], index) => {
      const checkid = data2.callback_data.split("&*")[1];
      if (checkid == checkid2) {
        if (!data2.text.includes("✅")) {
          data2.text = `✅${data2.text}✅`;
        } else {
          data2.text = data2.text.split("✅")[1];
        }

        try {
          bot
            .editMessageCaption("Выберите группы для отправки фото:", {
              chat_id: chatid,
              message_id: message_id,
              reply_markup: {
                inline_keyboard: clickbutton,
              },
            })
            .catch(() => {});
        } catch {}
      }
    });
  });
};
