const fs = require("fs");

module.exports = (chatid, callback) => {
  fs.access("./bass/" + chatid + "/info.json", function (err) {
    if (err) {
      fs.mkdirSync("./bass/" + chatid);
      fs.writeFileSync("./bass/" + chatid + "/info.json", `{"group":null}`);

      callback({ group: null });
    } else {
      callback(
        JSON.parse(fs.readFileSync("./bass/" + chatid + "/info.json", "utf-8"))
      );
    }
  });
};
