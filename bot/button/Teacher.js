module.exports = async (chatid, message_id) => {
  const allteacher = [];
  const allteacher2 = [];
  if (jsonData.length > 0) {
    jsonData.map((data2, index2) => {
      Object.entries(data2).forEach(([key, data], index) => {
        if (key.includes("field")) {
          if (
            data.match(/[А-Я]\.[А-Я]\./) &&
            !allteacher.find((data2) => data2 === data)
          ) {
            allteacher.push(data);
          }
        }
      });
    });

    allteacher
      .sort((a, b) => a.localeCompare(b))
      .map((data) => {
        if (allteacher2[allteacher2.length - 1]) {
          if (allteacher2[allteacher2.length - 1].length % 3 == 0) {
            allteacher2.push([
              {
                text: data,
                callback_data: `teacherweek&*${data}`,
              },
            ]);
          } else {
            allteacher2[allteacher2.length - 1].push({
              text: data,
              callback_data: `teacherweek&*${data}`,
            });
          }
        } else {
          allteacher2.push([
            {
              text: data,
              callback_data: `teacherweek&*${data}`,
            },
          ]);
        }
      });

    allteacher2.push([{ text: "Назад", callback_data: "schedule" }]);

    try {
      await bot
        .editMessageText("Расписание преподователей", {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: allteacher2,
          },
        })
        .catch(() => {});
    } catch {}
  }
};
