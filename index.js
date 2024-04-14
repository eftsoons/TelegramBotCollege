const cron = require("node-cron");

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
} = require("./button");

const TelegramBot = require("node-telegram-bot-api");

const token = "tokenbot";

bot = new TelegramBot(token, { polling: true });

jsonData = [];

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

bot.on("message", async (msg) => {
  const chatid = msg.chat.id;
  const text = msg.text;
  const typechat = msg.chat.type;

  if (typechat == "private") {
    await bot.setMyCommands([
      { command: "start", description: "Запуск" },
      { command: "help", description: "Помощь" },
    ]);

    if (text == "/start") {
      Main(msg.chat.first_name, chatid);
    } else if (text == "/help") {
      await bot.sendMessage(chatid, "За чем тебе помощь в таком простом боте?");
    }
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatid = msg.message.chat.id;
  const message_id = msg.message.message_id;
  if (data == "author") {
    Author(chatid, message_id);
  } else if (data == "exit") {
    Main(msg.message.chat.first_name, chatid, message_id);
  } else if (data == "schedule") {
    Schedule(chatid, message_id);
  } else if (data == "Teacher") {
    Teacher(chatid, message_id);
  } else if (data.split("&*")[0] == "teacherweek") {
    TeacherWeek(data, chatid, message_id);
  } else if (data.split("&*")[0] == "teacherday") {
    TeacherDay(msg, data, chatid, message_id);
  } else if (data == "Group") {
    Group(chatid, message_id);
  } else if (data.split("&*")[0] == "GroupWeek") {
    GroupWeek(data, chatid, message_id);
  } else if (data.split("&*")[0] == "GroupDay") {
    GroupDay(msg, data, chatid, message_id);
  } else if (data.split("&*")[0] == "settings") {
    Settings(data, chatid, message_id);
  } else if (
    "clicksend" == data.split("&*")[0] &&
    (chatid == 1619511344 || chatid == 331259777)
  ) {
    Clicksend(msg, data, chatid, message_id);
  } else if (data == "send" && (chatid == 1619511344 || chatid == 331259777)) {
    Send(msg, chatid, message_id);
  } else if (
    data == "yessend" &&
    (chatid == 1619511344 || chatid == 331259777)
  ) {
    Yessend(msg, chatid, message_id);
  }
});

bot.on("photo", async (msg) => {
  const chatid = msg.chat.id;
  if (chatid == 1619511344 || chatid == 331259777) {
    const fileid = msg.photo[msg.photo.length - 1].file_id;
    const clickbutton = GetGroup("clicksend");
    if (clickbutton) {
      clickbutton.push([{ text: "Отправить", callback_data: "send" }]);

      await bot.sendPhoto(chatid, fileid, {
        caption: "Выберите группы для отправки фото:",
        reply_markup: {
          inline_keyboard: clickbutton,
        },
      });
    }
  }
});

/*bot.on("document", async (msg) => {
  const id = msg.chat.id;
  console.log(msg);
  if (id == 1619511344 && msg.document.mime_type == "application/pdf") {
    const fileDetails = await bot.getFile(msg.document.file_id);

    const fileLink = `https://api.telegram.org/file/bot${token}/${fileDetails.file_path}`;

    const response = await axios.get(fileLink);

    const data = new Uint8Array(response.data);

    console.log(fileLink);

    const pdfPath = "test.pdf";

    //Buffer.from(response.data)

    console.log(pdfjsLib.getDocument(pdfPath));
  }
});*/
