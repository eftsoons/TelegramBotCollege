module.exports = async (data, chatid, message_id) => {
  const Week = [];
  const nameteacher = data.split("&*")[1];

  jsonData.map((data3, index) => {
    if (index > 0) {
      Object.entries(data3).forEach(([key, data2], index) => {
        if (!key.includes("field")) {
          if (data2 != "" && !Week.find((data3) => data3[0].text == data2)) {
            Week.push([
              {
                text: data2,
                callback_data: `teacherday&*0&*${nameteacher}&*${data2}`,
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
      callback_data: `teacherday&*0&*${nameteacher}`,
    },
  ]);

  Week.push([{ text: "Назад", callback_data: "Teacher" }]);

  try {
    await bot
      .editMessageText(
        `На какой день интересует?\nПреподователь: ${nameteacher}`,
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
