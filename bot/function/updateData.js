const axios = require("axios");
const cheerio = require("cheerio");
const csvtojson = require("csvtojson");
const fs = require("fs");
const { format } = require("date-fns");

module.exports = async () => {
  console.log("Данные обновлены");
  const response = await axios.get("https://vk.com/@kolledge39-timetable");
  const response2 = cheerio.load(response.data);

  /*response2("a").each(async (index, element) => {
    const linkText = response2(element).text();
    if (linkText.includes("https") && linkText.split("/")[5]) {*/
  /*const response3 = await axios.get(
        `https://docs.google.com/spreadsheets/d/${
          linkText.split("/")[5]
        }/export?format=csv`
      );*/

  const response3 = await axios.get(
    "https://docs.google.com/spreadsheets/d/1eQ90SILPsnrg6EhNNlamS-TDtuMp9qDQ/export?format=csv"
  );

  jsonData = await csvtojson().fromString(response3.data);
  require("./server"); // важно потрубать сервак именно на этом моменте
  const alluser = fs.readdirSync("./bass");
  /*bot.setMyName({
    name: `Расписание КП | ${alluser.length} пользователей`,
  });*/

  arrayuserinfo = [];

  try {
    for (let i = 0; i < alluser.length; i++) {
      const userData = await bot.getChat(alluser[i]).catch(() => {});
      const groupuser = JSON.parse(
        fs.readFileSync(`./bass/${alluser[i]}/info.json`, "utf-8")
      );

      const date = format(
        fs.statSync(`./bass/${alluser[i]}`)["birthtime"],
        "HH:mm d.MM.yyyy"
      );

      if (arrayuserinfo[0]) {
        if (arrayuserinfo[arrayuserinfo.length - 1].length % 50 == 0) {
          if (userData) {
            arrayuserinfo.push([
              [
                userData.id,
                userData.first_name,
                userData.last_name,
                userData.username ? `@${userData.username}` : null,
                i + 1,
                groupuser["group"],
                date,
              ],
            ]);
          } else {
            arrayuserinfo.push([
              [
                alluser[i],
                "Заблокировал бота",
                null,
                null,
                i + 1,
                groupuser["group"],
                date,
              ],
            ]);
          }
        } else {
          if (userData) {
            arrayuserinfo[arrayuserinfo.length - 1].push([
              userData.id,
              userData.first_name,
              userData.last_name,
              userData.username ? `@${userData.username}` : null,
              i + 1,
              groupuser["group"],
              date,
            ]);
          } else {
            arrayuserinfo[arrayuserinfo.length - 1].push([
              alluser[i],
              "Заблокировал бота",
              null,
              null,
              i + 1,
              groupuser["group"],
              date,
            ]);
          }
        }
      } else {
        if (userData) {
          arrayuserinfo.push([
            [
              userData.id,
              userData.first_name,
              userData.last_name,
              userData.username ? `@${userData.username}` : null,
              i + 1,
              groupuser["group"],
              date,
            ],
          ]);
        } else {
          arrayuserinfo.push([
            [
              alluser[i],
              "Заблокировал бота",
              null,
              null,
              i + 1,
              groupuser["group"],
              date,
            ],
          ]);
        }
      }
    }
  } catch {}
  // }
  //});
};
