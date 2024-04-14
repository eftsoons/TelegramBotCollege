const { GetGroup } = require("../function");

module.exports = async (chatid, message_id) => {
  const allgroup = GetGroup("GroupWeek");

  allgroup.push([{ text: "Назад", callback_data: "schedule" }]);

  await bot.editMessageText("Расписание", {
    chat_id: chatid,
    message_id: message_id,
    reply_markup: {
      inline_keyboard: allgroup,
    },
  });
};
