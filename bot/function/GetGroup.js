module.exports = (nextmenu) => {
  const allgroup = [];
  if (jsonData.length > 0) {
    Object.entries(jsonData[0]).forEach(([key, data], index) => {
      if (data == "Дата") {
        if (allgroup[allgroup.length - 1]) {
          if (allgroup[allgroup.length - 1].length % 3 == 0) {
            allgroup.push([
              {
                text: key,
                callback_data: `${nextmenu}&*${index}&*${key}`,
              },
            ]);
          } else {
            allgroup[allgroup.length - 1].push({
              text: key,
              callback_data: `${nextmenu}&*${index}&*${key}`,
            });
          }
        } else {
          allgroup.push([
            {
              text: key,
              callback_data: `${nextmenu}&*${index}&*${key}`,
            },
          ]);
        }
      }
    });
  }

  return allgroup;
};
