const fs = require("fs");
const { GetInfoUser, GetGroup } = require("../function");

module.exports = (data, chatid, message_id, chatid2) => {
  const clickbutton = GetGroup("settings");

  if (clickbutton) {
    clickbutton.push([{ text: "Назад", callback_data: "schedule" }]);

    const check = data.split("&*")[1];

    GetInfoUser(chatid2, function (infouser) {
      clickbutton.map((data3) => {
        Object.entries(data3).forEach(([key, data2], index) => {
          if (data2.callback_data.split("&*")[1] == check) {
            if (infouser.group != data2.text) {
              infouser.group = data2.text;
            } else {
              infouser.group = null;
            }

            fs.writeFileSync(
              "./bass/" + chatid2 + "/info.json",
              JSON.stringify(infouser)
            );
          }
        });
      });

      clickbutton.map((data3) => {
        Object.entries(data3).forEach(([key, data2], index) => {
          if (data2.text == infouser.group) {
            data2.text = `✅${data2.text}✅`;
          }
        });
      });

      try {
        bot
          .editMessageText("Выбор группы", {
            chat_id: chatid,
            message_id: message_id,
            reply_markup: {
              inline_keyboard: clickbutton,
            },
          })
          .catch(() => {});
      } catch {}
    });
  }
};
