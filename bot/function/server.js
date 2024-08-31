const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { CheckValiddata, GetInfoUser } = require("./");
const https = require("https");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _, next) => {
  if (CheckValiddata(req.body.initData, process.env.TELEGRAM_BOT_TOKEN)) {
    next();
  }
});

app.post("/", (_, res) => {
  res.send(jsonData);
});

app.post("/group", (req, res) => {
  const initData = new URLSearchParams(req.body.initData);
  const userinfo = JSON.parse(initData.get("user"));

  console.log(`Connect College-Mini-apps: ${userinfo.id}`);
  GetInfoUser(userinfo.id, (data) => {
    res.send(data.group);
  });
});

app.post("/setgroup", (req, res) => {
  const initData = new URLSearchParams(req.body.initData);
  const userinfo = JSON.parse(initData.get("user"));

  const setgroup = req.body.setgroup;

  GetInfoUser(userinfo.id, function (infouser) {
    if (infouser.group != setgroup) {
      infouser.group = setgroup;
    } else {
      infouser.group = null;
    }

    fs.writeFileSync(
      `./bass/${userinfo.id}/info.json`,
      JSON.stringify(infouser)
    );
  });

  res.send("ok");
});

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/widgetvoting.ru/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/widgetvoting.ru/fullchain.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/widgetvoting.ru/chain.pem"),
};

const server = https.createServer(options, app);

server.listen(444, () => {
  console.log("Сервер запущен");
});
