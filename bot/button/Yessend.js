const fs = require("fs");

module.exports = (msg, chatid, message_id) => {
  const alluser = fs.readdirSync("./bass");
  const photo = msg.message.photo[msg.message.photo.length - 1].file_id;
  const text = msg.message.caption.split("\n");
  settext = [];

  try {
    if (!text[2] && text[0] != "Отправляем фото выше этим группам:") {
      alluser.map((data2) => {
        bot
          .sendPhoto(data2, photo, {
            caption: text[1].split(":")[1],
          })
          .then((msg) => {
            const change = JSON.parse(
              fs.readFileSync("./change.json", "utf-8")
            );
            change.push([msg.chat.id, msg.message_id]);

            fs.writeFileSync("./change.json", JSON.stringify(change));
          })
          .catch(() => {});
      });

      bot
        .editMessageCaption(`Фото отправлено 🎉\nГруппы: ${text[2]}`, {
          chat_id: chatid,
          message_id: message_id,
        })
        .catch(() => {});
    } else if (text[2]) {
      alluser.map((data2) => {
        const userinfo = JSON.parse(
          fs.readFileSync(`./bass/${data2}/info.json`, "utf-8")
        );

        if (userinfo.group) {
          text[2].split(",").map((data, index) => {
            if (data == userinfo.group) {
              bot
                .sendPhoto(data2, photo, {
                  caption: text[1].split(":")[1],
                })
                .then((msg) => {
                  const change = JSON.parse(
                    fs.readFileSync("./change.json", "utf-8")
                  );
                  change.push([msg.chat.id, msg.message_id]);

                  fs.writeFileSync("./change.json", JSON.stringify(change));
                })
                .catch(() => {});

              // const change = JSON.parse(fs.readFileSync("./change.json", "utf-8"));
              // change.push(message_id);
              // console.log(change);
            }
          });
        }
      });

      bot
        .editMessageCaption(`Фото отправлено 🎉\nГруппы: ${text[2]}`, {
          chat_id: chatid,
          message_id: message_id,
        })
        .catch(() => {});
    } else {
      bot
        .editMessageCaption("Ошибка\nГруппы не выбраны", {
          chat_id: chatid,
          message_id: message_id,
        })
        .catch(() => {});
    }
  } catch {}
};
