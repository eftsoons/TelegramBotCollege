import { Badge } from "@telegram-apps/telegram-ui";

export const getlessoncall = (timelesson: string, date: Date) => {
  //console.log(date);
  const m = Number(timelesson.split("-")[0].split(":")[1]);
  const h = Number(timelesson.split("-")[0].split(":")[0]);
  const minut = m + h * 60;
  const m2 = Number(timelesson.split("-")[1].split(":")[1]);
  const h2 = Number(timelesson.split("-")[1].split(":")[0]);
  const minut2 = m2 + h2 * 60;
  const minutes = date.getHours() * 60 + date.getMinutes();

  if (minut - minutes < 0) {
    const resultminut = minut2 - minutes;
    return minut2 - minutes > 0 ? (
      <Badge type="number" mode="primary" large={true}>
        {resultminut - 60 > 0
          ? `${Math.floor(resultminut / 60)}ч ${resultminut % 60}`
          : `${resultminut}`}
        м
      </Badge>
    ) : (
      <Badge type="dot" mode="critical" />
    );
  } else {
    const resultminut = minut - minutes;
    return (
      <Badge type="number" mode="white" large={true}>
        {resultminut - 60 > 0
          ? `${Math.floor(resultminut / 60)}ч ${resultminut % 60}`
          : `${resultminut}`}
        м
      </Badge>
    );
  }
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

export function ConvertTimeZone(date: Date, timezone: string) {
  return new Date(
    new Date(date).toLocaleString("en-US", {
      timeZone: timezone,
    })
  );
}

export function GetInfoTeacher(TeacherName: string) {
  const teacherinfo = {
    "Абдуллаев Р.Ф.": {
      rank: "преподаватель",
      group: [
        {
          code: "54.02.02",
          name: "Декоративноприкладное искусство и народные промыслы (по видам)",
        },
        { code: "38.02.04", name: "Коммерция (по отраслям)" },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам)",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем",
        },
        { code: "09.02.07", name: "Информационные системы и программирование" },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем",
        },
        { code: "09.02.06", name: "Сетевое и системное администрирование" },
        { code: "54.02.04", name: "Реставрация" },
      ],
      subjects: [
        { code: null, name: "Иностранный язык" },
        {
          code: null,
          name: "История",
        },
      ],
      education: [
        {
          name: "высшее",
          college: `НАЧОУ ВПО «Современная гуманитарная академия», 2011, Юриспруденция, бакалавр`,
        },
        {
          name: "высшее",
          college: `ФГАОУ ВПО «Балтийский федеральный университет имени Иммануила Канта» 2011, Лингвистика, бакалавр`,
        },
        {
          name: "высшее",
          college: `ФГАОУ ВПО «Балтийский федеральный университет имени Иммануила Канта», 2013, Филология, магистр`,
        },
      ],
      category: "высшая",
      degree: "не имеет",
      experience: "11",
      experiencecollege: "11",
      experiencework: "0",
    },
    "Бахтин А.И.": {
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        { code: "ПП.01", name: "Производственная практика" },
        {
          code: "МДК.03.01",
          name: "Технология изготовления ювелирных изделий со вставками",
        },
        {
          code: "ПП.03",
          name: "Производственная практика",
        },
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "ПП.04",
          name: "Производственная практика",
        },
        {
          code: "МДК.01.01",
          name: "Технология изготовления металлических ювелирных и художественных изделий",
        },
        {
          code: "УП.01",
          name: "Учебная практика",
        },
        {
          code: "ПП.02",
          name: "Производственная практика",
        },
      ],
      education: [
        {
          name: "СПО",
          college: `ГБУ КО ПОО "ХПТ", 2018 г., Ювелир`,
        },
        {
          name: "высшее",
          college: `Калининградский государственный технический университет, 2005 г., Технология машиностроения, инженер`,
        },
      ],
      category: "не имеет",
      degree: "не имеет",
      experience: "18",
      experiencecollege: "11",
      experiencework: "0",
    },
    "Бахтина О.Н.": {
      rank: "Заведующий отделением",
      group: [
        {
          code: "54.02.02",
          name: "Декоративноприкладное искусство и народные промыслы (по видам)",
        },
        { code: "54.02.04", name: "Реставрация" },
        { code: "54.01.02", name: "Ювелир" },
      ],
      subjects: [
        { code: "ОД.2.4", name: "Перспектива" },
        {
          code: "ПП 01",
          name: "Производственная практика (по профилю  специальности)",
        },
        { code: "ОД.02.04", name: "Черчение и перспектива" },
        { code: "ДОП.01", name: "Проекционное черчение" },
      ],
      education: [
        {
          name: "СПО",
          college: `ГБУ КО ПОО "ХПТ", 2018 г., Художник росписи по дереву`,
        },
        {
          name: "высшее",
          college: `ФГОУ ВПО "Калининградский государственный технический университет", 2010 г., Пищевая инженерия ма-лых предприятий, инженер`,
        },
      ],
      category: "не имеет",
      degree: "не имеет",
      experience: "13",
      experiencecollege: "5",
      experiencework: "0",
    },
    /*"Белова Е.В.": {},
    "Березкина Н.Ю.": {},
    "Бледных О.В.": {},
    "Бобылёва М.А.": {},
    "Бровков А.М.": {},
    "Бычай А.П.": {},
    "Бычай Е.В.": {},
    "Вагапова И.С.": {},
    "Василенкова М.С.": {},
    "Винидиктов Д.Г.": {},
    "Воробьева О.Ю.": {},
    "Воронько Д.А.": {},
    "Гегель П.В.": {},
    "Гейко Н.Е.": {},
    "Гризецкий А.А.": {},
    "Гриневич У.Г.": {},
    "Гуренко О.В.": {},
    "Древич Я.С.": {},
    "Дюжикова А.С.": {},
    "Жулега В.В.": {},
    "Зверев М.В.": {},
    "Калинин А.Н.": {},
    "Кархерт С.Э.": {},
    "Кириллова О.Б.": {},
    "Кислова Н.И.": {},
    "Ковальчук А.C.": {},
    "Кондакова В.Е.": {},
    "Красильникова И.А.": {},
    "Крючкова Т.И.": {},
    "Куриленко Т.Н.": {},
    "Кучиева Н.А.": {},
    "Лавринец А.В.": {},
    "Лунина А.В.": {},
    "Мамаев П.В.": {},
    "Мандрыкина О.Э.": {},
    "Мартиросян Т.Э.": {},
    "Машковский Е.В.": {},
    "Морылёв С.И.": {},
    "Морылёва Л.М.": {},
    "Москалюк А.И.": {},
    "Москаева С.C.": {},
    "Наумчик А.А.": {},
    "Никитин С.С.": {},
    "Осипова Г.В.": {},
    "Петровская Т.В.": {},
    "Пластова А.Л.": {},
    "Пономарчук А.А.": {},
    "Прокофьева Г.А.": {},
    "Сахапов Ф.Р.": {},
    "Сергеенко К.К.": {},
    "Сидорова О.А.": {},
    "Скворцов Д.С.": {},
    "Смольникова В.Р.": {},
    "Сорочан Ю.В.": {},
    "Трофимова Т.Д.": {},
    "Трусов М.М.": {},
    "Тупиков П.А.": {},
    "Федорова А.Д.": {},
    "Федорова Т.В.": {},
    "Федотова Н.Ю.": {},
    "Филиппов М.Д.": {},
    "Чернобылец О.И.": {},
    "Чурсанова И.В.": {},
    "Шевчук Д.В.": {},
    "Шимина Н.Г.": {},
    "Юркина Н.А.": {},
    "Яценко С.В.": {},*/
  } as {
    [key: string]: {
      rank: string;
      group: Array<{ code: string; name: string }>;
      subjects: Array<{ code: string | null; name: string }>;
      education: Array<{ name: string; college: string }>;
      category: string;
      degree: string;
      experience: string;
      experiencecollege: string;
      experiencework: string;
    };
  };

  return teacherinfo[TeacherName];
}
