module.exports = async (data, chatid, message_id) => {
  const Week = [];

  jsonData.map((data3, index) => {
    if (index > 0) {
      Object.entries(data3).forEach(([key, data2]) => {
        if (!key.includes("field")) {
          if (key == data.split("&*")[2] && data2 != "") {
            Week.push([
              {
                text: data2,
                callback_data: `GroupDay&*0&*${data.split("&*")[1]}&*${
                  data.split("&*")[2]
                }&*${data2}`,
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
      callback_data: `GroupDay&*0&*${data.split("&*")[1]}&*${
        data.split("&*")[2]
      }`,
    },
  ]);

  Week.push([{ text: "Назад", callback_data: "Group" }]);

  try {
    await bot
      .editMessageText(
        `На какой день интересует?\nГруппа: ${data.split("&*")[2]}`,
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: Week,
          },
          parse_mode: "HTML",
        }
      )
      .catch(() => {});
  } catch {}
};
