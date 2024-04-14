const fs = require("fs");

module.exports = (msg, chatid, message_id) => {
  const alluser = fs.readdirSync("./bass");
  const photo = msg.message.photo[msg.message.photo.length - 1].file_id;
  const text = msg.message.caption.split("\n")[1];
  alluser.map((data2) => {
    const userinfo = JSON.parse(
      fs.readFileSync(`./bass/${data2}/info.json`, "utf-8")
    );

    if (userinfo.group) {
      text.split(",").map((data, index) => {
        if (data == userinfo.group) {
          bot.sendPhoto(data2, photo, {
            caption: "Замены ❤",
          });
        }
      });
    }
  });

  bot.editMessageCaption("Фото отправлено 🎉", {
    chat_id: chatid,
    message_id: message_id,
  });
};
