module.exports = async (chat_id, message_id, data) => {
  const Week = [];
  const nameoffice = data.split("&*")[1];

  jsonData.map((data3, index) => {
    if (index > 0) {
      Object.entries(data3).forEach(([key, data2], index) => {
        if (!key.includes("field")) {
          if (data2 != "" && !Week.find((data3) => data3[0].text == data2)) {
            Week.push([
              {
                text: data2,
                callback_data: `officeday&*0&*${nameoffice}&*${data2}`,
              },
            ]);
          }
        }
      });
    }
  });

  Week.push([
    {
      text: "Вся неделя",
      callback_data: `officeday&*0&*${nameoffice}`,
    },
  ]);

  Week.push([{ text: "Назад", callback_data: "office" }]);

  try {
    await bot
      .editMessageText(`На какой день интересует?\nКабинет: ${nameoffice}`, {
        chat_id: chat_id,
        message_id: message_id,
        reply_markup: {
          inline_keyboard: Week,
        },
      })
      .catch(() => {});
  } catch {}
};
