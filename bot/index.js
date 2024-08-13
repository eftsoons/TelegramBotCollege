const dotenv = require("dotenv");
dotenv.config();

const cron = require("node-cron");
//const pdfParse = require("pdf-parse");
//const request = require("request");
//const concat = require("concat-stream");
//const PDFParser = require("pdf2json");
const fs = require("fs");

//const pdfjs = require("pdfjs-dist-for-node");

const { updateData, GetGroup } = require("./function");
const {
  Main,
  Author,
  Schedule,
  Teacher,
  TeacherWeek,
  TeacherDay,
  Group,
  GroupWeek,
  GroupDay,
  Settings,
  Clicksend,
  Send,
  Yessend,
  Sendall,
  Call,
  Office,
  OfficeWeek,
  OfficeDay,
} = require("./button");

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

bot = new TelegramBot(token, { polling: true });

jsonData = [];
tablzamen2 = [];
settext = [];
arrayuserinfo = [];

cron.schedule(
  "0 0 * * *",
  () => {
    updateData();
  },
  {
    scheduled: true,
    timezone: "Europe/Moscow",
  }
);

updateData();

try {
  bot.on("channel_post", (msg) => {
    const chatid = msg.chat.id;
    if (msg.text == "/start") {
      Main(null, chatid, null, null, true);
    }
  });

  bot.on("group_chat_created", async (msg) => {
    const chatid = msg.chat.id;
    const usernamebotresponse = await bot.getMe().catch(() => {});

    const usernamebot = `@${usernamebotresponse.username}`;

    bot
      .sendMessage(
        chatid,
        `Привет! Я бот с расписанием колледжа предпринимательства.\nМой создатель - @shishkin666\nМои команды:\n/start${usernamebot} - запускает главное меню бота\n/schedule${usernamebot} - запускает меню с расписанием\n/call${usernamebot} - запускает меню с звонками\n/help${usernamebot} - помощь в боте (лучше не прописывать)`
      )
      .catch(() => {});
  });

  bot.on("new_chat_members", async (msg) => {
    const chatid = msg.chat.id;
    const usernamebotresponse = await bot.getMe().catch(() => {});

    const usernamebot = `@${usernamebotresponse.username}`;

    bot
      .sendMessage(
        chatid,
        `Привет! Я бот с расписанием колледжа предпринимательства.\nМой создатель - @shishkin666\nМои команды:\n/start${usernamebot} - запускает главное меню бота\n/schedule${usernamebot} - запускает меню с расписанием\n/call${usernamebot} - запускает меню с звонками\n/help${usernamebot} - помощь в боте (лучше не прописывать)`
      )
      .catch(() => {});
  });

  bot.on("message", async (msg) => {
    const usernamebotresponse = await bot.getMe().catch(() => {});

    const usernamebot = `@${usernamebotresponse.username}`;

    const chatid = msg.chat.id;
    const text = msg.text;
    // const typechat = msg.chat.type;

    await bot.setMyCommands([
      { command: "start", description: "Запуск" },
      { command: "schedule", description: "Расписание" },
      { command: "call", description: "Звонки" },
      { command: "help", description: "Помощь" },
    ]);

    console.log(`TG BOT: ${msg.from.username} | ${msg.text}`);

    if (text == "/start" || text == "/start" + usernamebot) {
      Main(msg.from.first_name, chatid, null, msg.from.id);
    } else if (text == "/help" || text == "/help" + usernamebot) {
      await bot.sendMessage(chatid, "Зачем тебе помощь в таком простом боте?");
    } else if (
      (text == "/stats" || text == "/stats" + usernamebot) &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      const alluser = fs.readdirSync("./bass");
      const allgroup = [];

      alluser.map((data) => {
        const userinfo = JSON.parse(
          fs.readFileSync(`./bass/${data}/info.json`, "utf-8")
        );

        if (!allgroup.find((data) => data.group == userinfo.group)) {
          allgroup.push({
            group: userinfo.group,
            all: 1,
            user: [data],
          });
        } else {
          allgroup.map((data2) => {
            if (data2.group == userinfo.group) {
              data2.all = data2.all + 1;
              data2.user.push(data);
            }
          });
        }
      });

      /* const infouser = bot
        .getChat(data)
        .then((data) => {
          return `${data.first_name} | ${data.last_name} | @${data.username}`;
        })
        .catch(() => {});*/

      await bot
        .sendMessage(
          chatid,
          `Статистика:\n${allgroup
            .map(
              (data) =>
                `${data.group == null ? "Не выбрало" : data.group}: ${data.all}`
            )
            .join("\n")}\nВсего активных групп: ${
            allgroup.length
          }\nВсего пользователей: ${alluser.length}`
        )
        .catch(() => {});
    } else if (
      (text == "/deleted" || text == "/deleted" + usernamebot) &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      const change = JSON.parse(fs.readFileSync("./change.json", "utf-8"));
      change.map((data) => {
        bot.deleteMessage(data[0], data[1]).catch(() => {});
      });
      fs.writeFileSync("./change.json", "[]");
      bot.sendMessage(chatid, `Замены удалены`);
    } else if (
      (text == "/statsuser" || text == "/statsuser" + usernamebot) &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      const buttonarray = [];

      if (arrayuserinfo.length > 0) {
        arrayuserinfo.map((data, index) => {
          if (index % 5 == 0) {
            buttonarray.push([
              {
                text: index == 0 ? `• ${index + 1} •` : index + 1,
                callback_data: `statsuser&*${index}`,
              },
            ]);
          } else {
            buttonarray[buttonarray.length - 1].push({
              text: index == 0 ? `• ${index + 1} •` : index + 1,
              callback_data: `statsuser&*${index}`,
            });
          }
        });

        bot
          .sendMessage(
            chatid,
            `Список пользователей:\n${arrayuserinfo[0]
              .map((data) => {
                return `${data[4]}. ${data[0]} | ${data[1]} ${
                  data[2] ? data[2] : ""
                }${data[3] ? ` | ${data[3]}` : ""}${
                  data[5] ? ` | ${data[5]}` : ""
                }\nСоздан: ${data[6]}`;
              })
              .join("\n")}`,
            {
              reply_markup: {
                inline_keyboard: buttonarray,
              },
            }
          )
          .catch(() => {});
      }
    } else if (text == "/schedule" || text == "/schedule" + usernamebot) {
      Schedule(chatid, null, true);
    } else if (text == "/call" || text == "/call" + usernamebot) {
      //Call(chatid);
      Schedule(chatid, null, true);
    } else {
      settext.map((data) => {
        if (data[1] == chatid) {
          try {
            bot
              .editMessageCaption(
                `${data[0]}\nТекст: ${text}${data[3] ? data[3] : ""}`,
                {
                  chat_id: chatid,
                  message_id: data[2],
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "Да", callback_data: `yessend` }],
                      [{ text: "Назад", callback_data: "exitmenu" }],
                    ],
                  },
                }
              )
              .catch(() => {});
          } catch {}
        }
      });
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatid = msg.message.chat.id;
    const message_id = msg.message.message_id;
    //console.log(`TG BOT: ${msg.from.username} | ${data}`);
    if (data == "author") {
      Author(chatid, message_id);
    } else if (data == "exit") {
      Main(
        msg.from.first_name,
        chatid,
        message_id,
        msg.from.id,
        msg.message.chat.type == "channel"
      );
    } else if (data == "schedule") {
      Schedule(chatid, message_id, null, msg.message.chat.type == "channel");
    } else if (data == "Teacher") {
      Teacher(chatid, message_id);
    } else if (data.split("&*")[0] == "teacherweek") {
      TeacherWeek(data, chatid, message_id);
    } else if (data.split("&*")[0] == "teacherday") {
      TeacherDay(data, chatid, message_id);
    } else if (data == "Group") {
      Group(chatid, message_id);
    } else if (data.split("&*")[0] == "GroupWeek") {
      GroupWeek(data, chatid, message_id);
    } else if (data.split("&*")[0] == "GroupDay") {
      GroupDay(data, chatid, message_id);
    } else if (data.split("&*")[0] == "settings") {
      Settings(data, chatid, message_id, msg.from.id);
    } else if (
      "clicksend" == data.split("&*")[0] &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      Clicksend(msg, data, chatid, message_id);
    } else if (
      data == "send" &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      Send(msg, chatid, message_id);
    } else if (
      data == "yessend" &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      Yessend(msg, chatid, message_id);
    } else if (
      data == "sendall" &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      Sendall(chatid, message_id);
    } else if (
      data == "exitmenu" &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      const clickbutton = GetGroup("clicksend");
      if (clickbutton) {
        clickbutton.push([
          { text: "Отправить всем", callback_data: "sendall" },
        ]);
        clickbutton.push([{ text: "Отправить", callback_data: "send" }]);
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
    } else if (data == "lessoncall") {
      Call(chatid, message_id);
    } else if (data == "sendpdf") {
      const alluser = fs.readdirSync("./bass");

      alluser.map((data) => {
        const userinfo = JSON.parse(
          fs.readFileSync(`./bass/${data}/info.json`, "utf-8")
        );
        if (userinfo) {
          tablzamen2.map((data2) => {
            if (userinfo["group"] == data2[0]) {
              bot.sendMessage(
                data,
                `Замены ❤️${data2
                  .map((data, index) => {
                    if (index > 0) {
                      return data;
                    }
                  })
                  .join("\n")}`
              );
            }
          });
        }
      });

      bot
        .editMessageText(
          `Отправлено группам:\n${tablzamen2
            .map((data) => {
              return data[0];
            })
            .join("\n")}`,
          {
            chat_id: chatid,
            message_id: message_id,
          }
        )
        .catch(() => {});
    } else if (
      data.split("&*")[0] == "statsuser" &&
      (chatid == 1619511344 || chatid == 331259777)
    ) {
      if (arrayuserinfo.length > 0) {
        const buttonarray = [];

        arrayuserinfo.map((_, index) => {
          if (index % 5 == 0) {
            buttonarray.push([
              {
                text:
                  index == Number(data.split("&*")[1])
                    ? `• ${index + 1} •`
                    : index + 1,
                callback_data: `statsuser&*${index}`,
              },
            ]);
          } else {
            buttonarray[buttonarray.length - 1].push({
              text:
                index == Number(data.split("&*")[1])
                  ? `• ${index + 1} •`
                  : index + 1,
              callback_data: `statsuser&*${index}`,
            });
          }
        });

        bot
          .editMessageText(
            `Список пользователей:\n${arrayuserinfo[Number(data.split("&*")[1])]
              .map((data) => {
                return `${data[4]}. ${data[0]} | ${data[1]} ${
                  data[2] ? data[2] : ""
                }${data[3] ? ` | ${data[3]}` : ""}${
                  data[5] ? ` | ${data[5]}` : ""
                }\nСоздан: ${data[6]}`;
              })
              .join("\n")}`,
            {
              chat_id: chatid,
              message_id: message_id,
              reply_markup: {
                inline_keyboard: buttonarray,
              },
            }
          )
          .catch(() => {});
      }
    } else if (data == "authorchannel") {
      bot.editMessageText(
        "Разработано совместно со Студенческим Советом.\nРазработчик: @shishkin666 (участник студ. совета)\nGithub: https://github.com/eftsoons/TelegramBotCollege.git",
        {
          chat_id: chatid,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [{ text: "Назад", callback_data: "exitchannel" }],
            ],
          },
        }
      );
    } else if (data == "exitchannel") {
      MainChannel(chatid, message_id);
    } else if (data == "office") {
      Office(chatid, message_id);
    } else if (data.split("&*")[0] == "officeweek") {
      OfficeWeek(chatid, message_id, data);
    } else if (data.split("&*")[0] == "officeday") {
      OfficeDay(chatid, message_id, data);
    }
  });

  bot.on("photo", async (msg) => {
    const chatid = msg.chat.id;
    if (chatid == 1619511344 || chatid == 331259777) {
      const fileid = msg.photo[msg.photo.length - 1].file_id;
      const clickbutton = GetGroup("clicksend");
      if (clickbutton) {
        clickbutton.push([
          { text: "Отправить всем", callback_data: "sendall" },
        ]);
        clickbutton.push([{ text: "Отправить", callback_data: "send" }]);

        await bot
          .sendPhoto(chatid, fileid, {
            caption: "Выберите группы для отправки фото:",
            reply_markup: {
              inline_keyboard: clickbutton,
            },
          })
          .catch(() => {});
      }
    }
  });
} catch (error) {
  console.log(error);
}

/*bot.on("document", async (msg) => {
  const id = msg.chat.id;
  if (id == 1619511344 && msg.document.mime_type == "application/pdf") {
    const fileDetails = await bot.getFile(msg.document.file_id);
    const fileLink = `https://api.telegram.org/file/bot${token}/${fileDetails.file_path}`;
    request(fileLink).pipe(
      concat((buffer) => {
        const pdfParserInstance = new PDFParser();
        //fs.readFile("./10.04.2024 замены.pdf", (err, pdfBuffer) => {
        pdfParserInstance.parseBuffer(buffer, {
          combinedText: true,
          encoding: "UTF-8",
        });

        const tablzamen = [];

        pdfParserInstance.on("pdfParser_dataReady", async (pdfData) => {
          pdfData.Pages[0].Texts.map((data) => {
            const numbertext = decodeURIComponent(data.R[0].T).match(/\d+\./);
            if (numbertext) {
              tablzamen.push([data.R[0].T]);
            } else {
              tablzamen[tablzamen.length - 1] += decodeURIComponent(
                data.R[0].T
              );
            }
          });

          tablzamen.map((data, index) => {
            if (index < tablzamen.length - 1) {
              const groupname = data.match(/[А-Я]+ \d+\-\d+/);
              if (groupname) {
                tablzamen2.push([
                  groupname[0],
                  data.replace(groupname[0], "").replace(/\s+/, " "),
                ]);
              } else {
                tablzamen2[tablzamen2.length - 1].push(
                  data.replace(/\s+/, " ")
                );
              }
            }
          });

          bot.sendMessage(
            id,
            `Замены:\n${tablzamen2
              .map((data) => {
                return data.join("\n");
              })
              .join("\n")}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Отправить",
                      callback_data: "sendpdf",
                    },
                  ],
                ],
              },
            }
          );
        });
      })
    );
  }
});*/
