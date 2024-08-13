import { Badge } from "@telegram-apps/telegram-ui";

export const getlessoncall = (timelesson: string) => {
  const m = Number(timelesson.split("-")[0].split(":")[1]);
  const h = Number(timelesson.split("-")[0].split(":")[0]);
  const minut = m + h * 60;
  const m2 = Number(timelesson.split("-")[1].split(":")[1]);
  const h2 = Number(timelesson.split("-")[1].split(":")[0]);
  const minut2 = m2 + h2 * 60;
  const day = new Date();
  const minutes = day.getHours() * 60 + day.getMinutes();
  return minut - minutes + 60 < 0 ? (
    minut2 - minutes + 60 > 0 ? (
      <Badge type="number" mode="primary" large={true}>
        {minut2 - minutes + 60}
      </Badge>
    ) : (
      <Badge type="dot" mode="critical" />
    )
  ) : (
    <Badge type="number" mode="white" large={true}>
      {minut - minutes + 60}
    </Badge>
  );
};

export function GetGroup(
  namegroup: string,
  JsonData: Record<string, string>[]
) {
  const info = [] as Array<Array<{ name: string; key: number }>>;
  if (namegroup == "group") {
    Object.entries(JsonData[0]).forEach(([key, data], index) => {
      if (data == "Дата") {
        if (info[info.length - 1]) {
          if (info[info.length - 1].length % 3 == 0) {
            info.push([{ name: key, key: index }]);
          } else {
            info[info.length - 1].push({ name: key, key: index });
          }
        } else {
          info.push([{ name: key, key: index }]);
        }
      }
    });
  } else if (namegroup == "teacher") {
    const allteacher = [] as Array<{ name: string; key: number }>;

    JsonData.map((data2: Record<string, string>) => {
      Object.entries(data2).forEach(
        ([key, data]: [string, string], index: number) => {
          if (key.includes("field")) {
            if (
              data.match(/[А-Я]\.[А-Я]\./) &&
              !allteacher.find((data2) => data2.name === data)
            ) {
              allteacher.push({ name: data, key: index });
            }
          }
        }
      );
    });

    allteacher
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((data) => {
        if (info[info.length - 1]) {
          if (info[info.length - 1].length % 3 == 0) {
            info.push([data]);
          } else {
            info[info.length - 1].push(data);
          }
        } else {
          info.push([data]);
        }
      });
  } else if (namegroup == "office") {
    const office = [] as Array<{ name: string; key: number }>;

    JsonData.map((data2: Record<string, string>) => {
      Object.entries(data2).forEach(([key, data]: [string, string], index) => {
        if (key.includes("field")) {
          if (
            data.match(/.+ \([А-Я][а-я]\)/) &&
            !office.find(
              (data2: { name: string; key: number }) => data2.name === data
            )
          ) {
            office.push({ name: data, key: index });
          }
        }
      });
    });

    office
      .sort(
        (
          a: { name: string; key: number },
          b: { name: string; key: number }
        ) => {
          const amatch = a.name.match(/\(([А-Я])[а-я]\)/);
          const bmatch = b.name.match(/\(([А-Я])[а-я]\)/);

          if (amatch && bmatch) {
            return (
              amatch[1].localeCompare(bmatch[1]) || a.name.localeCompare(b.name)
            );
          } else {
            return -1;
          }
        }
      )
      .map((data: { name: string; key: number }) => {
        if (info[info.length - 1]) {
          if (info[info.length - 1].length % 3 == 0) {
            info.push([data]);
          } else {
            info[info.length - 1].push(data);
          }
        } else {
          info.push([data]);
        }
      });
  }

  return info;
}

export function GetInfoGroup(
  namegroup: string,
  activegroup: string,
  activeindex: string,
  JsonData: Record<string, string>[]
) {
  const info = [] as Array<any>; // сорян за any
  const info2 = [] as Array<Array<string>>;

  if (namegroup.includes("group")) {
    JsonData.map((data3: Record<string, string>, index: number) => {
      if (index > 0) {
        Object.entries(data3).forEach(([key, data2]) => {
          if (key.includes("field")) {
            if (data2 != "") {
              if (key.split("d")[1] == String(Number(activeindex) + 2)) {
                info2[info2.length - 1].push(data2);
              } else if (key.split("d")[1] == String(Number(activeindex) + 4)) {
                info2[info2.length - 1].push(data2);
              } else if (key.split("d")[1] == String(Number(activeindex) + 5)) {
                info2[info2.length - 1].push(data2);
              } else if (key.split("d")[1] == String(Number(activeindex) + 6)) {
                info2[info2.length - 1].push(data2);
              }
            }
          } else {
            if (key == activegroup) {
              info2.push([data2]);
            }
          }
        });
      }
    });

    info2.map((data: Array<string>) => {
      if (data[0] != "") {
        info.push([data[0]]);
        if (data.length > 1) {
          info[info.length - 1].push(data.splice(1));
        }
      } else {
        if (data[1] != "" && data.length > 1) {
          info[info.length - 1].push(data.splice(1));
        }
      }
    });
  } else if (namegroup.includes("teacher")) {
    JsonData.map((data2: Record<string, string>, index2: number) => {
      Object.entries(data2).forEach(([key, data], index) => {
        if (index2 > 0) {
          if (key.includes("field")) {
            if (data == activegroup) {
              const numberlesson =
                data2["field" + String(Number(key.split("field")[1]) - 3)];
              const namelesson =
                data2["field" + String(Number(key.split("field")[1]) - 1)];
              const officelesson =
                data2["field" + String(Number(key.split("field")[1]) + 1)];

              info[info.length - 1].push([
                numberlesson,
                namelesson,
                officelesson,
                index,
              ]);
            }
          } else {
            if (
              data != "" &&
              !info.find((data2: Array<any>) => data2[0] == data)
            ) {
              info.push([data]);
            }
          }
        }
      });
    });

    JsonData.map((data2: Record<string, string>) => {
      Object.entries(data2).forEach(([key], index) => {
        info.map((data: Array<[string, string, string, number, string]>) => {
          data.map((data4, index3: number) => {
            if (index3 > 0) {
              if (data4[3] - 4 == index && !data4[4]) {
                data4.splice(3, 1, key);
              }
            }
          });
        });
      });
    });

    info.map((data: Array<Array<string>>) => {
      data.sort((a: Array<string>, b: Array<string>) => {
        if (a.length > 1 && b.length > 1) {
          return Number(a[0]) - Number(b[0]);
        } else {
          return -1;
        }
      });
    });
  } else if (namegroup.includes("office")) {
    JsonData.map((data2: Record<string, string>, index2: number) => {
      Object.entries(data2).forEach(([key, data], index) => {
        if (index2 > 0) {
          if (key.includes("field")) {
            if (data == activegroup) {
              const numberlesson =
                data2["field" + String(Number(key.split("field")[1]) - 4)];
              const namelesson =
                data2["field" + String(Number(key.split("field")[1]) - 2)];
              const nameteacher =
                data2["field" + String(Number(key.split("field")[1]) - 1)];

              info[info.length - 1].push([
                numberlesson,
                namelesson,
                nameteacher,
                index,
              ]);
            }
          } else {
            if (
              data != "" &&
              !info.find((data2: Array<string>) => data2[0] == data)
            ) {
              info.push([data]);
            }
          }
        }
      });
    });

    JsonData.map((data2: Record<string, string>) => {
      Object.entries(data2).forEach(([key], index) => {
        info.map((data: Array<[string, string, string, number, string]>) => {
          data.map((data4, index3: number) => {
            if (index3 > 0) {
              if (data4[3] - 5 == index && !data4[4]) {
                data4.splice(3, 1, key);
              }
            }
          });
        });
      });
    });

    info.map((data: Array<[string, string, string, number, string]>) => {
      data.sort(
        (
          a: [string, string, string, number, string],
          b: [string, string, string, number, string]
        ) => {
          if (a.length > 1 && b.length > 1) {
            return Number(a[0]) - Number(b[0]);
          } else {
            return -1;
          }
        }
      );
    });
  }

  return info;
}

export function GetDay(index: number) {
  return ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][
    index
  ];
}
