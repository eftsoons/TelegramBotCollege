const axios = require("axios");
const cheerio = require("cheerio");
const csvtojson = require("csvtojson");

module.exports = async () => {
  console.log("Данные обновлены");
  const response = await axios.get("https://vk.com/@kolledge39-timetable");
  const response2 = cheerio.load(response.data);

  response2("a").each(async (index, element) => {
    const linkText = response2(element).text();
    if (linkText.includes("https")) {
      const response3 = await axios.get(
        `https://docs.google.com/spreadsheets/d/${
          linkText.split("/")[5]
        }/export?format=csv`
      );
      jsonData = await csvtojson().fromString(response3.data);
    }
  });
};
