module.exports = async (chat_id, message_id) => {
  const office = [];
  const office2 = [];

  jsonData.map((data2, index2) => {
    Object.entries(data2).forEach(([key, data], index) => {
      if (key.includes("field")) {
        if (
          data.match(/.+ \([А-Я][а-я]\)/) &&
          !office.find((data2) => data2 === data)
        ) {
          office.push(data);
        }
      }
    });
  });

  office
    .sort((a, b) => {
      const amatch = a.match(/\(([А-Я])[а-я]\)/)[1];
      const bmatch = b.match(/\(([А-Я])[а-я]\)/)[1];

      return amatch.localeCompare(bmatch) || a.localeCompare(b);
    })
    .map((data) => {
      if (office2[office2.length - 1]) {
        if (office2[office2.length - 1].length % 3 == 0) {
          office2.push([
            {
              text: data,
              callback_data: `officeweek&*${data}`,
            },
          ]);
        } else {
          office2[office2.length - 1].push({
            text: data,
            callback_data: `officeweek&*${data}`,
          });
        }
      } else {
        office2.push([
          {
            text: data,
            callback_data: `officeweek&*${data}`,
          },
        ]);
      }
    });

  office2.push([{ text: "Назад", callback_data: "schedule" }]);

  try {
    await bot
      .editMessageText("Расписание кабинетов", {
        chat_id: chat_id,
        message_id: message_id,
        reply_markup: {
          inline_keyboard: office2,
        },
      })
      .catch(() => {});
  } catch {}
};
