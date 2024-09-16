import { Badge } from "@telegram-apps/telegram-ui";
import lang from "./lang";

export const getlessoncall = (
  timelesson: string,
  date: Date,
  typeseperation?: string
) => {
  const m = Number(
    timelesson.split("-")[0].split(typeseperation ? typeseperation : ":")[1]
  );
  const h = Number(
    timelesson.split("-")[0].split(typeseperation ? typeseperation : ":")[0]
  );
  const minut = m + h * 60;
  const m2 = Number(
    timelesson.split("-")[1].split(typeseperation ? typeseperation : ":")[1]
  );
  const h2 = Number(
    timelesson.split("-")[1].split(typeseperation ? typeseperation : ":")[0]
  );
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
  try {
    if (namegroup.includes("group")) {
      JsonData.map((data3: Record<string, string>, index: number) => {
        if (index > 0) {
          Object.entries(data3).forEach(([key, data2]) => {
            if (key.includes("field")) {
              if (data2 != "") {
                if (key.split("d")[1] == String(Number(activeindex) + 2)) {
                  info2[info2.length - 1].push(data2);
                } else if (
                  key.split("d")[1] == String(Number(activeindex) + 4)
                ) {
                  info2[info2.length - 1].push(data2);
                } else if (
                  key.split("d")[1] == String(Number(activeindex) + 5)
                ) {
                  info2[info2.length - 1].push(data2);
                } else if (
                  key.split("d")[1] == String(Number(activeindex) + 6)
                ) {
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

    info.map((data) => {
      data.sort((a: object | string) => {
        if (typeof a == "object") {
          return 1;
        } else {
          return -1;
        }
      });
    });

    return info;
  } catch {}
}

export function GetDay(index: number) {
  return [
    lang.monday,
    lang.tuesday,
    lang.wendnesday,
    lang.thursday,
    lang.friday,
    lang.saturday,
  ][index];
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
      fullname: "Абдуллаев Роял Фаталиевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "54.02.04",
          name: "Реставрация",
        },
      ],
      subjects: [
        { code: null, name: "Иностранный язык" },
        { code: null, name: "История" },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "11",
      experiencecollege: "11",
      experiencework: "0",
    },
    "Бахтин А.И.": {
      fullname: "Бахтин Александр Иванович",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "ПП.01",
          name: "Производственная практика",
        },
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
      education: ["СПО", "высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "18",
      experiencecollege: "11",
      experiencework: "0",
    },
    "Бахтина О.Н.": {
      fullname: "Бахтина Олеся Николаевна",
      rank: "Заведующий отделением",
      group: [
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "ОД.2.4",
          name: "Перспектива",
        },
        {
          code: "ПП 01",
          name: "Производственная практика (по профилю специальности)",
        },
        {
          code: "ПП 01",
          name: "Производственная практика (по профилю специальности)",
        },
        {
          code: "ОД.02.04",
          name: "Черчение и перспектива",
        },
        {
          code: "ДОП.01",
          name: "Проекционное черчение",
        },
      ],
      education: ["СПО", "высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "13",
      experiencecollege: "5",
      experiencework: "0",
    },
    "Белова Е.В.": {
      fullname: "Белова Елена Викторовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "УП.03",
          name: "Учебная практика",
        },
        {
          code: "ПП.01",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.01",
          name: "Экзамен",
        },
        {
          code: "МДК.03.01",
          name: "Технология изготовления ювелирных изделий со вставками",
        },
        {
          code: "ПП.03",
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
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "31",
      experiencecollege: "5",
      experiencework: "0",
    },
    "Березкина Н.Ю.": {
      fullname: "Березкина Наталия Юрьевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву",
        },
      ],
      subjects: [
        {
          code: "ОП.06",
          name: "Обзор графических техник",
        },
        {
          code: "ОП.01",
          name: "Рисунок",
        },
        {
          code: "УП.1.1",
          name: "Учебная практика (работа с натуры на открытом воздухе (пленэр)",
        },
        {
          code: "ДР.01",
          name: "Рисунок",
        },
      ],
      education: ["СПО", "высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "36",
      experiencecollege: "34",
      experiencework: "33",
    },
    "Бледных О.В.": {
      fullname: "Бледных Ольга Витальевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование",
        },
      ],
      subjects: [
        {
          code: "МДК.04.02",
          name: "Психология и этика профессиональной деятельности",
        },
        {
          code: "МДК 04.01",
          name: "Основы менеджмента, управление персоналом",
        },
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "ЭК.4.1",
          name: "Экзамен",
        },
        {
          code: "ПП.04",
          name: "Производственная практика",
        },
        {
          code: "МДК.4.1",
          name: "Основы мене-та, упр.перс- ом",
        },
        {
          code: "ПП.4.1",
          name: "Производственная практика",
        },
        {
          code: "УП.4.1",
          name: "Учебная практика",
        },
        {
          code: "ОП.14",
          name: "Основы финансовой грамотности",
        },
        {
          code: "ОП.12",
          name: "Основы предпринимательской деятельности",
        },
        {
          code: "ОП.07",
          name: "Охрана труда",
        },
        {
          code: "ОП.11",
          name: "Основы менеджмента и",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "32",
      experiencecollege: "18",
      experiencework: "0",
    },
    "Бобылёва М.А.": {
      fullname: "Бобылёва Марина Анатольевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОГСЭ.03",
          name: "Иностранный язык",
        },
        {
          code: "ОГСЭ.06",
          name: "Иностранный язык в профессиональной деятельности",
        },
        {
          code: "ОГСЭ.04",
          name: "Иностранный язык в профессиональной деятельности",
        },
        {
          code: "ОУП.04",
          name: "Иностранный язык",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "21",
      experiencecollege: "18",
      experiencework: "2",
    },
    "Бровков А.М.": {
      fullname: "Бровков Александр Максимович",
      rank: "Педагог-организатор",
      group: [],
      subjects: [],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "7",
      experiencecollege: "1",
      experiencework: "0",
    },
    "Бычай А.П.": {
      fullname: "Бычай Алексей Петрович",
      rank: "преподаватель",
      group: [
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "МДК.02.01",
          name: "Программные и программно- аппаратные средства защиты информации",
        },
        {
          code: "МДК.03.02",
          name: "Инженерно-технические средства физической защиты объектов информатизации",
        },
        {
          code: "ПП.03.01",
          name: "Производственная практика ПДП ПРОИЗВОДСТВЕННАЯ ПРАКТИКА (ПРЕДДИПЛОМНАЯ)",
        },
        {
          code: "МДК.01.04",
          name: "Эксплуатация автоматизированных (информационных) систем в защищенном исполнении",
        },
        {
          code: "МДК.02.02",
          name: "Криптографические средства защиты информации",
        },
        {
          code: "УП.02.01",
          name: "Учебная практика",
        },
        {
          code: "МДК.03.01",
          name: "Техническая защита информации",
        },
        {
          code: "МДК.03.02",
          name: "Инженерно-технические",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "25",
      experiencecollege: "5",
      experiencework: "25",
    },
    "Бычай Е.В.": {
      fullname: "Бычай Елена Васильевна",
      rank: "преподаватель",
      group: [
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "МДК.2.1",
          name: "Финансы, налоги и налогообложение",
        },
        {
          code: "МДК.2.2",
          name: "Организация пассажирских перевозок и обслуживания пассажиров (по видам транспорта)",
        },
        {
          code: "МДК.2.3",
          name: "Организация международных пассажирских перевозок (по видам транспорта)",
        },
        {
          code: "УП.2.1",
          name: "Учебная практика",
        },
        {
          code: "ПП.2.1",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.02",
          name: "Экзамен",
        },
        {
          code: "МДК.3.3",
          name: "Перевозка грузов на особых условиях",
        },
        {
          code: "ПП.3.1",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.03",
          name: "Экзамен",
        },
        {
          code: "ПМ.03",
          name: "ПП Преддипломная практика",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "19",
      experiencecollege: "4",
      experiencework: "6",
    },
    "Вагапова И.С.": {
      fullname: "Вагапова Инна Станиславовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам)",
        },
      ],
      subjects: [
        {
          code: "ОП.06",
          name: "Иностранный язык в профессиональной дейтельности",
        },
        {
          code: "ОУД.04",
          name: "Иностранный язык",
        },
        {
          code: "ОУП.03",
          name: "Иностранный язык",
        },
        {
          code: "ОД.1.1",
          name: "Иностранный язык",
        },
        {
          code: "ОГСЭ.03",
          name: "Иностранный язык",
        },
        {
          code: "ОД.03",
          name: "Иностранный язык",
        },
        {
          code: "ОДБ.03",
          name: "Иностранный язык",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "21",
      experiencecollege: "21",
      experiencework: "0",
    },
    "Василенкова М.С.": {
      fullname: "Василенкова Милана Сергеевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "ОП.03",
          name: "Основы материаловедения",
        },
        {
          code: "МДК.02.01",
          name: "Технология изготовления ювелирных вставок",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
        {
          code: "ПП.02",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.02",
          name: "Экзамен",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "2",
    },
    "Винидиктов Д.Г.": {
      fullname: "Винидиктов Дмитрий Григорьевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОП.13",
          name: "Обор-ие и благ-во средовых об-ов",
        },
        {
          code: "ОП.05",
          name: "История дизайна",
        },
        {
          code: "ЕН.03",
          name: "Инф.обесп.проф.деят-ти",
        },
        {
          code: "ОП.01",
          name: "Материаловедение",
        },
        {
          code: "ОП.10",
          name: "Обор-ие и благ-во средовых об-ов",
        },
        {
          code: "ЕН.03",
          name: "Инф.обесп.проф.деят-ти",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "27",
      experiencecollege: "13",
      experiencework: "13",
    },
    "Воробьева О.Ю.": {
      fullname: "Воробьева Ольга Юрьевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем",
        },
      ],
      subjects: [
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ДУПКВ.01",
          name: "Родной язык и (или) государственный язык республики Российской Федерации / Родная литература",
        },
        {
          code: "ОП.02",
          name: "Основы деловой культуры",
        },
        {
          code: "ОД.02",
          name: "Литература",
        },
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "32",
      experiencecollege: "30",
      experiencework: "0",
    },
    "Воронько Д.А.": {
      fullname: "Воронько Дарья Аркадьевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер",
        },
      ],
      subjects: [
        {
          code: "УП.02",
          name: "Учебная практика",
        },
        {
          code: "ПП.02",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.02",
          name: "Экзамен",
        },
        {
          code: "МДК.02.06",
          name: "3D моделирование",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
        {
          code: "ПП.02",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.02",
          name: "Экзамен",
        },
        {
          code: "МДК 02.02",
          name: "Информационный дизайн и медиа",
        },
        {
          code: "МДК 02.02",
          name: "Информационный дизайн и медиа",
        },
        {
          code: "ПП.01",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.01",
          name: "Экзамен",
        },
        {
          code: "МДК 02.02",
          name: "Информационный дизайн и медиа",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "0",
    },
    "Гегель П.В.": {
      fullname: "Гегель Пауль Викторович",
      rank: "преподаватель",
      group: [
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем",
        },
      ],
      subjects: [
        {
          code: "ОУП.05",
          name: "Информатика ПM.04.Э Экзамен по профессиональному модулю ПM.04.Э Экзамен по профессиональному модулю",
        },
        {
          code: "ОП.08",
          name: "Основы проектирования баз данных",
        },
        {
          code: "МДК.11.01",
          name: "Технология разработки и защиты баз данных",
        },
        {
          code: "ОП.08",
          name: "Основы проектирования баз данных",
        },
        {
          code: "МДК.11.01",
          name: "Технология разработки и защиты баз данных",
        },
        {
          code: "ОП.08",
          name: "Разработка программных модулей",
        },
        {
          code: "ЕН.02",
          name: "Информатика",
        },
        {
          code: "ОУП.05",
          name: "Информатика",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "1",
      experiencecollege: "1",
      experiencework: "0",
    },
    "Гейко Н.Е.": {
      fullname: "Гейко Наталья Евгеньевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву ",
        },
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "ОП.08",
          name: "Основы композицииМ",
        },
      ],
      education: ["ДК.01.01 СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "16",
      experiencecollege: "5",
      experiencework: "15",
    },
    "Гризецкий А.А.": {
      fullname: "Гризецкий Александр Анатольевич",
      rank: "заведующий отделом,\nпреподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОУД.07",
          name: "Основы безопасности жизнедеятельности География",
        },
        {
          code: "ОУП.11",
          name: "География",
        },
        {
          code: "ОП.05",
          name: "Безопасность жизнедеятельности",
        },
        {
          code: "ОД.1.5",
          name: "География",
        },
        {
          code: "ОД.1.7",
          name: "Основы безопасности жизнедеятельности",
        },
        {
          code: "ОУП.13",
          name: "Основы безопасности жизнедеятельности География",
        },
        {
          code: "ОД.01.05",
          name: "География",
        },
        {
          code: "ОД.01.07",
          name: "Основы безопасности жизнедеятельности",
        },
        {
          code: "ОДБ.06",
          name: "Основы безопасности жизнедеятельности",
        },
        {
          code: "ОУП.10",
          name: "География",
        },
        {
          code: "ОУП.12",
          name: "Основы безопасности жизнедеятельности",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "14",
      experiencecollege: "13",
      experiencework: "0",
    },
    "Гриневич У.Г.": {
      fullname: "Гриневич Ульяна Григорьевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ООУПП.1.511",
          name: "Дизайн интерьера и экстерьера",
        },
        {
          code: "ОП.16",
          name: "Декорирование в интерьере",
        },
        {
          code: "МДК 02.02",
          name: "Основы конструкторско- технологического обеспечения дизайна",
        },
        {
          code: "ОП.15",
          name: "Дизайн интерьера и экстерьера",
        },
        {
          code: "ОП.16",
          name: "Декорирование в интерьере",
        },
        {
          code: "МДК 02.02",
          name: "Основы конструкторско- технологического обеспечения дизайна",
        },
        {
          code: "МДК.2.2",
          name: "Основы конструкторско- технологического обеспечения дизайна",
        },
        {
          code: "ОП.15",
          name: "Дизайн интерьера и экстерьера",
        },
        {
          code: "ОП.16",
          name: "Декорирование в интерьере",
        },
        {
          code: "УП.1.1",
          name: "Учебная практика",
        },
        {
          code: "МДК.2.1",
          name: "Выполнение художественно-",
        },
      ],
      education: ["СПО", "высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "12",
      experiencecollege: "5",
      experiencework: "0",
    },
    "Гуренко О.В.": {
      fullname: "Гуренко Ольга Васильевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ОП.04",
          name: "Русский язык и культура речи",
        },
        {
          code: "ОД.1.8",
          name: "Русский язык",
        },
        {
          code: "ОД.1.9",
          name: "Литература",
        },
        {
          code: "ОД.01.09",
          name: "Литература",
        },
        {
          code: "ОД.01.08",
          name: "Русский язык",
        },
        {
          code: "ОДБ.01",
          name: "Русский язык",
        },
        {
          code: "ОДБ.02",
          name: "Литература",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "12",
      experiencecollege: "12",
      experiencework: "0",
    },
    "Древич Я.С.": {
      fullname: "Древич Яна Степановна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОП.17",
          name: "Эргономика",
        },
        {
          code: "МДК.1.1",
          name: "Дизайн-проектирование",
        },
        {
          code: "МДК.2.2",
          name: "Основы конструкторско- технологического обеспечения дизайна",
        },
        {
          code: "МДК.3.1",
          name: "Основы стан-ии, серт. И метр-ии",
        },
        {
          code: "ОП.12",
          name: "Эргономика",
        },
        {
          code: "МДК.02.02",
          name: "Основы конструкторско- технологического обеспечения дизайна",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "4",
      experiencecollege: "4",
      experiencework: "0",
    },
    "Дюжикова А.С.": {
      fullname: "Дюжикова Алёна Сергеевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование",
        },
      ],
      subjects: [
        {
          code: "МДК.02.05",
          name: "Основы web дизайна",
        },
        {
          code: "ОУД.10",
          name: "Информатика",
        },
        {
          code: "ОУД.11",
          name: "Информатика",
        },
        {
          code: "ОП.12",
          name: "Введение в креативные индустрии",
        },
        {
          code: "ОДП.12",
          name: "Информатика",
        },
        {
          code: "ОУП.04",
          name: "Информатика",
        },
        {
          code: "ПП.04.01",
          name: "Производственная практика",
        },
        {
          code: "ПП.11.01",
          name: "Производственная практика",
        },
        {
          code: "ОП.03",
          name: "Информационные технологии",
        },
        {
          code: "МДК.04.01",
          name: "Внедрение и поддержка компьютерных систем",
        },
        {
          code: "ОП.03",
          name: "Информационные технологии",
        },
        {
          code: "ОП.13",
          name: "Введение в креативные индустрии",
        },
        {
          code: "ПП.01.01",
          name: "Производственная практика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "3",
      experiencecollege: "3",
      experiencework: "0",
    },
    "Жулега В.В.": {
      fullname: "Жулега Вера Васильевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ДУПКВ.01",
          name: "Родной язык и (или) государственный язык республики Российской Федерации / Родная литература",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "16",
      experiencecollege: "13",
      experiencework: "0",
    },
    "Зверев М.В.": {
      fullname: "Зверев Максим Владимирович",
      rank: "заведующий отделением,\nпреподаватель",
      group: [
        {
          code: "09.02.07",
          name: "Информационные системы и программирование",
        },
      ],
      subjects: [
        {
          code: "МДК.01.01",
          name: "Разработка программных модулей",
        },
        {
          code: "УП.01.01",
          name: "Учебная практика ПM.01.Э Экзамен по профессиональному модулю",
        },
        {
          code: "МДК.01.04",
          name: "Системное программирование",
        },
        {
          code: "ОП.10",
          name: "Численные методы",
        },
        {
          code: "ОП.13",
          name: "Разработка библиотек общего назначения",
        },
        {
          code: "МДК.01.02",
          name: "Поддержка и тестирование программных модулей",
        },
        {
          code: "МДК.02.02",
          name: "Инструментальные средства разработки программного обеспечения ПM.11.Э Экзамен по профессиональному модулю Компьютерные сети",
        },
        {
          code: "ОП.11",
          name: "Компьютерные сети",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "20",
      experiencecollege: "7",
      experiencework: "20",
    },
    "Калинин А.Н.": {
      fullname: "Калинин Анатолий Николаевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОДБ.05",
          name: "Физическая культура",
        },
        {
          code: "ФК.01",
          name: "Физическая культура",
        },
        {
          code: "ОУП.11",
          name: "Физическая культура",
        },
        {
          code: "ОУП.12",
          name: "Физическая культура",
        },
        {
          code: "ОД.1.6",
          name: "Физическая культура",
        },
        {
          code: "ОД.01.06",
          name: "Физическая культура",
        },
        {
          code: "ОГСЭ.05",
          name: "Физическая культура ФК Физическая культура",
        },
        {
          code: "ФК.00",
          name: "Физическая культура",
        },
        {
          code: "ОГСЭ.04",
          name: "Физическая культура",
        },
        {
          code: "ОГСЭ.05",
          name: "Физическая культура",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "28",
      experiencecollege: "18",
      experiencework: "0",
    },
    "Кархерт С.Э.": {
      fullname: "Кархерт Светлана Эрвиновна",
      rank: "Социальный педагог",
      group: [],
      subjects: [],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "12",
      experiencecollege: "7",
      experiencework: "0",
    },
    "Кириллова О.Б.": {
      fullname: "Кириллова Ольга Борисовна",
      rank: "преподаватель",
      group: [
        {
          code: "09.02.07",
          name: "Информационные системы и программирование",
        },
      ],
      subjects: [
        {
          code: "ОП.14",
          name: "Основы предпринимательства в сфере креативных индустрий",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "1",
      experiencecollege: "1",
      experiencework: "0",
    },
    "Кислова Н.И.": {
      fullname: "Кислова Наталья Ивановна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
      ],
      subjects: [
        {
          code: "ОУД.05",
          name: "История",
        },
        {
          code: "ОУП.09",
          name: "История",
        },
        {
          code: "ОД.2.2",
          name: "История",
        },
        {
          code: "ОГСЭ.01",
          name: "Основы философии",
        },
        {
          code: "ОГСЭ.02",
          name: "История",
        },
        {
          code: "ОД.02.02",
          name: "История",
        },
        {
          code: "ОДБ.04",
          name: "История",
        },
        {
          code: "ОУП.08",
          name: "История",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "28",
      experiencecollege: "18",
      experiencework: "0",
    },
    "Ковальчук А.С.": {
      fullname: "Ковальчук Анна Сергеевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер",
        },
      ],
      subjects: [
        {
          code: "МДК.02.04",
          name: "Дизайн упаковки",
        },
        {
          code: "ПП.01",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.01",
          name: "Экзамен",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
        {
          code: "МДК.01.01",
          name: "Дизайн-проектирование",
        },
        {
          code: "МДК.01.02",
          name: "Проектная графика",
        },
        {
          code: "МДК 05.01",
          name: "Коммуникационный дизайн",
        },
        {
          code: "УП.01",
          name: "Учебная практика",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "6",
      experiencecollege: "6",
      experiencework: "0",
    },
    "Ковалевский К.Ю.": {
      fullname: "Ковалевский Константин Юрьевич",
      rank: "заведующий отделением,\nпреподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование",
        },
      ],
      subjects: [
        {
          code: "МДК.04.01",
          name: "Основы менеджмента и планирование профессиональной деятельности",
        },
        {
          code: "ОП.09",
          name: "Основы предпринимательства в сфере креативных индустрий",
        },
        {
          code: "ОП.13",
          name: "Основы предпринимательства в сфере креативных индустрий",
        },
        {
          code: "ОП.07",
          name: "Экономика отрасли",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "20",
      experiencecollege: "7",
      experiencework: "12",
    },
    "Кондакова В.Е.": {
      fullname: "Кондакова Виктория Евгеньевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер",
        },
      ],
      subjects: [
        {
          code: "ОУД.01",
          name: "Русский язык",
        },
        {
          code: "ОУД.02",
          name: "Литература Русский язык",
        },
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ОУП.02",
          name: "Литература",
        },
        {
          code: "ОУП.01",
          name: "Русский язык",
        },
        {
          code: "ПД.03",
          name: "Родная литература (русская)",
        },
        {
          code: "ОП.05",
          name: "Основы деловой культуры",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "35",
      experiencecollege: "32",
      experiencework: "0",
    },
    "Красильникова И.А.": {
      fullname: "Красильникова Ирина Алаевна",
      rank: "преподаватель",
      group: [
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "09.01.02",
          name: "Наладчик компьютерных сетей ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОП.01",
          name: "Инженерная графика",
        },
        {
          code: "МДК.1.2",
          name: "Информационное обеспечение перевозочного процесса (по видам транспорта)",
        },
        {
          code: "ОП.09",
          name: "Стандартизация, сертификация и техническое документоведение",
        },
        {
          code: "ПП.03.01",
          name: "Производственная практика",
        },
        {
          code: "ПП.01.01",
          name: "Производственная практика",
        },
        {
          code: "ПП.02.01",
          name: "Производственная практика",
        },
        {
          code: "ОП.11",
          name: "Инженерная компьютерная графика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "41",
      experiencecollege: "40",
      experiencework: "0",
    },
    "Крючкова Т.И.": {
      fullname: "Крючкова Татьяна Ивановна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация",
        },
      ],
      subjects: [
        {
          code: "ОП.01",
          name: "Рисунок",
        },
        {
          code: "ДР.01",
          name: "Рисунок",
        },
        {
          code: "ОП.04",
          name: "Живопись с основами цветоведения",
        },
        {
          code: "ОП.03",
          name: "Рисунок с основами перспективы",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "32",
      experiencecollege: "30",
      experiencework: "20",
    },
    "Куриленко Е.Н.": {
      fullname: "Куриленко Елена Николаевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "МДК.1.3",
          name: "Методы расчета осн-х техно- эко-их показ-ей",
        },
        {
          code: "МДК.01.03",
          name: "Методы расчета осн-х техно- эко-их показ-ей",
        },
        {
          code: "ОП.07",
          name: "Бухгалтерский учет",
        },
        {
          code: "ОУП.04",
          name: "Математика",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "37",
      experiencecollege: "14",
      experiencework: "25",
    },
    "Кучиева Н.А.": {
      fullname: "Кучиева Наталия Анатольевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам)",
        },
      ],
      subjects: [
        {
          code: "МДК.04.02",
          name: "Психология и этика профессиональной деятельности",
        },
        {
          code: "ОУД.12",
          name: "Экономика",
        },
        {
          code: "ЭК.3.1",
          name: "Экзамен",
        },
        {
          code: "ПП.03",
          name: "Производственная практика",
        },
        {
          code: "ПП.3.1",
          name: "Производственная практика",
        },
        {
          code: "МДК.3.2",
          name: "Основы управления качеством",
        },
        {
          code: "УП.3.1",
          name: "Учебная практика",
        },
        {
          code: "МДК.3.2",
          name: "Основы управления качеством",
        },
        {
          code: "ОП.02",
          name: "Статистика",
        },
        {
          code: "МДК.3.1",
          name: "Индивидуальное предпринимательство Э",
        },
        {
          code: "ПМ.03",
          name: "Экзамен",
        },
        {
          code: "МДК.05.01",
          name: "Индивидуальное предпринимательство",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "кандидат\nвоенных наук",
      experience: "21",
      experiencecollege: "19",
      experiencework: "0",
    },
    "Лавринец А.В.": {
      fullname: "Лавринец Анастасия Владимировна",
      rank: "советник директора по\nвоспитанию и\nвзаимодействию с\nдетскими общественными\nобъединениями",
      group: [],
      subjects: [],
      education: [""],
      category: "",
      degree: "",
      experience: "23",
      experiencecollege: "12",
      experiencework: "0",
    },
    "Лунина А.В.": {
      fullname: "Лунина Ангелина Владиславовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОП.08",
          name: "Введение в креативные индустрии",
        },
        {
          code: "МДК.02.01",
          name: "Технология разработки программного обеспечения",
        },
        {
          code: "УП.02.01",
          name: "Учебная практика",
        },
        {
          code: "ПП.02.01",
          name: "Производственная практика ПM.02.Э Экзамен по профессиональному модулю",
        },
        {
          code: "ОП.01",
          name: "Операционные системы и среды",
        },
        {
          code: "МДК.12.02",
          name: "Программирование и разработка программного обеспечения",
        },
        {
          code: "ОП.03",
          name: "Основы алгоритмизации и программирования",
        },
        {
          code: "МДК.01.01",
          name: "Операционные системы",
        },
        {
          code: "ОП.12",
          name: "Основы теории информации",
        },
        {
          code: "ОП.14",
          name: "Разработка моделей Big Data",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "0",
    },
    "Мамаев П.В.": {
      fullname: "Мамаев Павел Владимирович",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.01.02",
          name: "",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОДБ.12",
          name: "Информатика",
        },
        {
          code: "МДК.01.03",
          name: "Разработка мобильных приложений",
        },
        {
          code: "МДК.02.03",
          name: "Математическое моделирование",
        },
        {
          code: "ОП.04",
          name: "Основы алгоритмизации и программирования",
        },
        {
          code: "ОП.08",
          name: "Установка и обслуживание программного обеспечения ПЭВМ и серверов",
        },
        {
          code: "ОП.10",
          name: "Модернизация программного обеспечения ПЭВМ и серверов",
        },
        {
          code: "ОП.03",
          name: "Информационные технологии",
        },
        {
          code: "ОП.04",
          name: "Основы алгоритмизации и программирования й, Математическое моделирование",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "0",
    },
    "Мандрыкина О.Э.": {
      fullname: "Мандрыкина Ольга Эрнестовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
      ],
      subjects: [
        {
          code: "МДК.04.01",
          name: "Основы менеджмента и планирование профессиональной деятельности",
        },
        {
          code: "ОП.02",
          name: "Экономика организации",
        },
        {
          code: "МДК.1.1",
          name: "Организация коммерческой деятельности",
        },
        {
          code: "МДК.2.2",
          name: "Анализ финансово- хозяйственной деятельности",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
        {
          code: "ПП.02",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.02",
          name: "Экзамен",
        },
        {
          code: "ОП.05",
          name: "Экономика организации",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "30",
      experiencecollege: "20",
      experiencework: "21",
    },
    "Мартиросян Т.Э.": {
      fullname: "Мартиросян Татьяна Эдвардовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОУД.10",
          name: "Математика",
        },
        {
          code: "ОУП.03",
          name: "Математика",
        },
        {
          code: "ОУП.03.",
          name: " Математика",
        },
        {
          code: "ОД.01.03",
          name: "Математика и информатика",
        },
        {
          code: "ОДП.11",
          name: "Математика",
        },
        {
          code: "ЕН.01",
          name: "Математика",
        },
        {
          code: "ЕН.03",
          name: "Теория вероятностей и математическая статистика",
        },
        {
          code: "ЕН.01",
          name: "Элементы высшей математики",
        },
        {
          code: "ЕН.02",
          name: "Дискретная математика",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "13",
      experiencecollege: "11",
      experiencework: "0",
    },
    "Машковский Е.В.": {
      fullname: "Машковский Евгений Валерьевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер",
        },
      ],
      subjects: [
        {
          code: "МДК.02.03",
          name: "Многостраничный дизайн",
        },
        {
          code: "МДК.03.02",
          name: "Типографика",
        },
        {
          code: "УП.03",
          name: "Учебная практика",
        },
        {
          code: "ПП.03",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.03",
          name: "Экзамен",
        },
        {
          code: "ПМ.03",
          name: "Многостраничный дизайн",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "11",
      experiencecollege: "7",
      experiencework: "11",
    },
    "Морылёв С.И.": {
      fullname: "Морылёв Сергей Иванович",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам)",
        },
      ],
      subjects: [
        {
          code: "ОП.02",
          name: "Живопись",
        },
        {
          code: "ОП.01",
          name: "Основы изобразительного искусства",
        },
        {
          code: "ОП.01",
          name: "Рисунок",
        },
        {
          code: "ДР 01",
          name: "Рисунок",
        },
        {
          code: "ОД.02.05",
          name: "Пластическая анатомия ДР. 02 Живопись",
        },
        {
          code: "ОП.02",
          name: "Живопись",
        },
        {
          code: "УП.02",
          name: "Учебная практика (изучение памятников искусства в других городах)",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "38",
      experiencecollege: "26",
      experiencework: "28",
    },
    "Морылёва Л.М.": {
      fullname: "Морылёва Людмила Михайловна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву",
        },
      ],
      subjects: [
        {
          code: "ОП.02",
          name: "Живопись",
        },
        {
          code: "ОП.01",
          name: "Основы изобразительного искусства",
        },
        {
          code: "ОП.04",
          name: "Живопись с основами цветоведения",
        },
        {
          code: "ОД.02.01",
          name: "История мировой культуры",
        },
        {
          code: "ОП.06",
          name: "Пластическая анатомия",
        },
        {
          code: "ОП.07",
          name: "История изобразительного искусства",
        },
        {
          code: "УП.01",
          name: "Учебная практика (работа с натуры на открытом воздухе- пленэр)",
        },
        {
          code: "УП.03",
          name: "Учебная практика (изучение памятников искусства в других городах)",
        },
        {
          code: "ДР.02",
          name: "Живопись",
        },
        {
          code: "ОД.2.1",
          name: "История мировой культуры",
        },
        {
          code: "ОД.2.3",
          name: "История искусств",
        },
        {
          code: "ОД.02.03",
          name: "История искусств",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "38",
      experiencecollege: "26",
      experiencework: "28",
    },
    "Москалюк А.И.": {
      fullname: "Москалюк Алексей Игоревич",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "К07.04",
          name: "01 Технология ремонта и реставрации ювелирных и художественных изделий МДК. 04.01 Технология ремонта и реставрации ювелирных и художественных изделий",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "11",
      experiencecollege: "2",
      experiencework: "9",
    },
    "Москаева С.С.": {
      fullname: "Москаева Серафима Сергеевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "МДК.02.01",
          name: "Фирменный стиль и корпоративный дизайн",
        },
        {
          code: "МДК.02.02",
          name: "Информационный дизайн и медиа",
        },
        {
          code: "МДК.02.01",
          name: "Фирменный стиль и корпоративный дизайн",
        },
        {
          code: "МДК.2.1",
          name: "Выполнение художественно- конструкторских проектов в материале",
        },
        {
          code: "ПП.1.1",
          name: "Производственная практика",
        },
        {
          code: "ПП.2.1",
          name: "Производственная практика",
        },
        {
          code: "ЭК.2.1",
          name: "Экзамен",
        },
        {
          code: "МДК.02.01",
          name: "Выполнение художественно- конструкторских (дизайнерских) проектов в материале",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "0",
    },
    "Наумчик А.А.": {
      fullname: "Наумчик Антонина Алексеевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.02",
          name: "Ювелир",
        },
      ],
      subjects: [
        {
          code: "ОУД.08",
          name: "Естествознание",
        },
        {
          code: "ОУП.07",
          name: "Химия",
        },
        {
          code: "ОУП.08",
          name: "Биология",
        },
        {
          code: "ОД.1.4",
          name: "Естествознание",
        },
        {
          code: "ЕН.02",
          name: "Экологические основы природопользования",
        },
        {
          code: "БД.06",
          name: "Естествознание",
        },
        {
          code: "ЕН.02",
          name: "Экологические основы природопользования",
        },
        {
          code: "ОП.07",
          name: "Спецхимия",
        },
        {
          code: "ОП.08",
          name: "Спецбиология",
        },
        {
          code: "ОД.07",
          name: "Естествознание",
        },
        {
          code: "ОДБ.07",
          name: "Естествознание",
        },
        {
          code: "ОУП.06",
          name: "Химия",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "29",
      experiencecollege: "22",
      experiencework: "0",
    },
    "Никитин С.С.": {
      fullname: "Никитин Сергей Сергеевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОУП.10",
          name: "Обществознание",
        },
        {
          code: "ОГСЭ.02",
          name: "История",
        },
        {
          code: "ОД.1.2",
          name: "Обществоведение",
        },
        {
          code: "ПД.05",
          name: "Обществознание",
        },
        {
          code: "ОУП.10.",
          name: " Обществознание",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "14",
      experiencecollege: "12",
      experiencework: "0",
    },
    "Осипова Г.В.": {
      fullname: "Осипова Галина Владимировна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем",
        },
      ],
      subjects: [
        {
          code: "ОУД.09",
          name: "Математика",
        },
        {
          code: "ОУД.10",
          name: "Математика",
        },
        {
          code: "ОУП.03",
          name: "Математика",
        },
        {
          code: "ОД.1.3",
          name: "Математика и информатика",
        },
        {
          code: "ЕН.01",
          name: "Математика",
        },
        {
          code: "ЕН.01",
          name: "Элементы высшей математики",
        },
        {
          code: "ЕН.02",
          name: "Дискретная математика с элементами математической логики",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "44",
      experiencecollege: "30",
      experiencework: "0",
    },
    "Петровская Е.В.": {
      fullname: "Петровская Елена Витальевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОП.03",
          name: "Рисунок с основами перспективы",
        },
        {
          code: "ОП.04",
          name: "Живопись с основами цветоведения",
        },
      ],
      education: ["СПО"],
      category: "первая",
      degree: "не имеет",
      experience: "37",
      experiencecollege: "26",
      experiencework: "26",
    },
    "Пластова А.Л.": {
      fullname: "Пластова Алена Леонидовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "МДК.03.01",
          name: "Финальная сборка дизайн- макетов и подготовка их к печати в типографии, к публикации",
        },
        {
          code: "ОП.01",
          name: "Основы материаловедения",
        },
        {
          code: "МДК.01.01",
          name: "Дизайн-проектирование",
        },
        {
          code: "ЭК.1.1",
          name: "Экзамен",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "4",
      experiencecollege: "3",
      experiencework: "0",
    },
    "Пономарчук А.А.": {
      fullname: "Пономарчук Анастасия Анатольевна",
      rank: "преподаватель",
      group: [
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "МДК.03.02",
          name: "Безопасность компьютерных сетей",
        },
        {
          code: "МДК.03.03",
          name: "Эксплуатация объектов сетевой инфраструктуры ПM.01.Э Экзамен по профессиональному модулю",
        },
        {
          code: "МДК.02.01",
          name: "Администрирование сетевых операционных систем",
        },
        {
          code: "УП.03.01",
          name: "Учебная практика ПM.03.Э Экзамен по профессиональному модулю",
        },
        {
          code: "ПМ 03",
          name: "ПM.01.Э Экзамен по профессиональному модулю",
        },
        {
          code: "МДК.02.01",
          name: "Администрирование сетевых операционных систем",
        },
        {
          code: "МДК.03.01",
          name: "Эксплуатация объектов сетевой инфраструктуры",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "0",
    },
    "Прокофьева Г.А.": {
      fullname: "Прокофьева Галина Алексеевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "УОПУД.0.30",
          name: "901 Астрономия",
        },
        {
          code: "ОУД.13",
          name: "Основы индивидуального проектирования",
        },
        {
          code: "ОУД.09",
          name: "Астрономия",
        },
        {
          code: "ОУП.08",
          name: "Биология",
        },
        {
          code: "ДУПКВ.02",
          name: "Основы индивидуального проектирования",
        },
        {
          code: "ОУП.07",
          name: "Химия",
        },
        {
          code: "ОД.08",
          name: "Астрономия",
        },
        {
          code: "БД.09",
          name: "Астрономия",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "33",
      experiencecollege: "32",
      experiencework: "0",
    },
    "Сахапов Ф.Р.": {
      fullname: "Сахапов Фаим Ризайдинович",
      rank: "преподаватель",
      group: [
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам)",
        },
      ],
      subjects: [
        {
          code: "ОП.01",
          name: "Техническая механика",
        },
        {
          code: "ОП.05",
          name: "Инженерная графика",
        },
        {
          code: "МДК.02.01",
          name: "Дистанционное пилотирование беспилотных воздушных судов вертолетного типа, мультикоптеров и конвертопланов (с вертикальным взлетом и посадкой), обеспечение безопасности полетов",
        },
        {
          code: "ПП.02.01",
          name: "Производственная практика",
        },
        {
          code: "ОУП.06",
          name: "Физика",
        },
        {
          code: "ОП.04",
          name: "Электроника и схемотехника",
        },
        {
          code: "ОП.10",
          name: "Основы электротехники",
        },
        {
          code: "УП.02.01",
          name: "Учебная практика ПM.02.ЭК Экзамен по профессиональному модулю",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "45",
      experiencecollege: "5",
      experiencework: "25",
    },
    "Сергеенко К.К.": {
      fullname: "Сергеенко Ксения Константиновна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам)",
        },
      ],
      subjects: [
        {
          code: "МДК.02.01",
          name: "Технология исполнения изделий декоративно- прикладного и народного искусства",
        },
        {
          code: "УП.02.01",
          name: "Практика для получения первичных профессиональных навыков",
        },
        {
          code: "ПП 02",
          name: "Производственная практика (по профилю специальности) Э.",
        },
        {
          code: "ПМ.02",
          name: "Экзамен",
        },
        {
          code: "ДР 03",
          name: "Технология исполнения изделий декоративно- прикладного и народного искусства ПДП. 00 Преддипломная практика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "18",
      experiencecollege: "18",
      experiencework: "18",
    },
    "Сидорова О.А.": {
      fullname: "Сидорова Оксана Андреевна",
      rank: "преподаватель",
      group: [
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "09.01.02",
          name: "Наладчик компьютерных сетей",
        },
      ],
      subjects: [
        {
          code: "ПМДК.02.01",
          name: "Администрирование сетевых операционных систем",
        },
        {
          code: "МДК.02.02",
          name: "Программное обеспечение компьютерных сетей",
        },
        {
          code: "УП.02.01",
          name: "Учебная практика",
        },
        {
          code: "ОП.09",
          name: "Построение сетей передачи данных с использованием беспроводных технологий",
        },
        {
          code: "УП.03.01",
          name: "Учебная практика",
        },
        {
          code: "МДК.02.03",
          name: "Организация администрирования компьютерных систем ПДП Преддипломная практика ПM.02.Э Экзамен по профессиональному модулю",
        },
        {
          code: "МДК.01.02",
          name: "Организация, принципы построения и функционирования компьютерных сетей",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "3",
      experiencecollege: "3",
      experiencework: "0",
    },
    "Скворцов Д.С.": {
      fullname: "Скворцов Дмитрий Сергеевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.01.02",
          name: "",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОП.07",
          name: "Физическая культура",
        },
        {
          code: "ОУД.05",
          name: "Физическая культура",
        },
        {
          code: "ОУП.12",
          name: "Физическая культура",
        },
        {
          code: "ОГСЭ.04",
          name: "Физическая культура",
        },
        {
          code: "ОГСЭ.05",
          name: "Физическая культура",
        },
        {
          code: "ФК.00",
          name: "Физическая культура",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "25",
      experiencecollege: "25",
      experiencework: "0",
    },
    "Смольникова В.Р.": {
      fullname: "Смольникова Виктория Романовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОП.11",
          name: "Дизайн и рекламные технологии",
        },
        {
          code: "МДК.01.01",
          name: "Дизайн-проектирование",
        },
        {
          code: "МДК 01.02",
          name: "Основы проектной и компьютерной графики",
        },
        {
          code: "ОП.14",
          name: "Дизайн и рекламные технологии ПП Преддипломная практика",
        },
        {
          code: "УП.01",
          name: "Учебная практика",
        },
        {
          code: "ЭК.1.1",
          name: "Экзамен",
        },
        {
          code: "УП.01",
          name: "Учебная практика",
        },
        {
          code: "МДК.1.2",
          name: "Основы проектной и компьютерной графики",
        },
        {
          code: "ОП.14",
          name: "Дизайн и рекламные технологии",
        },
        {
          code: "МДК.1.2",
          name: "Основы проектной и комп.графики",
        },
        {
          code: "МДК.5.1",
          name: "Коммуникационный дизайн",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "3",
      experiencecollege: "3",
      experiencework: "0",
    },
    "Сорочан Ю.В.": {
      fullname: "Сорочан Юлия Валерьевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ПП.02",
          name: "Производственная практика",
        },
        {
          code: "ПП.01",
          name: "Производственная практика",
        },
        {
          code: "ЭК.2.1",
          name: "Экзамен",
        },
        {
          code: "ПМ.02",
          name: "ПП Преддипломная практика",
        },
        {
          code: "ЭК.2.1",
          name: "Экзамен",
        },
        {
          code: "МДК.1.1",
          name: "Дизайн-проектирование",
        },
        {
          code: "ЭК.1.1",
          name: "Экзамен",
        },
        {
          code: "МДК 2.1",
          name: "Выполнение художественно- конструкторских проектов в материале",
        },
        {
          code: "УП.2.1",
          name: "Учебная практика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "10",
      experiencecollege: "6",
      experiencework: "6",
    },
    "Трофимова Т.Д.": {
      fullname: "Трофимова Татьяна Дмитриевна",
      rank: "преподаватель",
      group: [
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
      ],
      subjects: [
        {
          code: "МДК.01.05",
          name: "Эксплуатация компьютерных сетей",
        },
        {
          code: "УП.01.01",
          name: "Учебная практика",
        },
        {
          code: "ОП.07",
          name: "Технические средства информатизации",
        },
        {
          code: "МДК.04.01",
          name: "Наладка технологического оборудования",
        },
        {
          code: "УП.04.01",
          name: "Учебная практика ПM.04.Э Экзамен по профессиональному модулю",
        },
        {
          code: "МДК.01.01",
          name: "Компьютерные сети",
        },
        {
          code: "ОП.01",
          name: "Операционные системы и среды",
        },
        {
          code: "ОП.02",
          name: "Архитектура аппаратных средств",
        },
        {
          code: "ОП.13",
          name: "Технологии физического уровня передачи данных",
        },
        {
          code: "ОП.07",
          name: "Аппаратное обеспечение ПЭВМ и серверов",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "4",
      experiencecollege: "4",
      experiencework: "0",
    },
    "Трусов М.М.": {
      fullname: "Трусов Михаил Михайлович",
      rank: "преподаватель",
      group: [
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам)",
        },
      ],
      subjects: [
        {
          code: "ОП.02",
          name: "Электротехника и электроника",
        },
        {
          code: "ОП.13",
          name: "Правила и безопасность движения (по видам транспорта)",
        },
        {
          code: "МДК.2.1",
          name: "Организация движения (по видам транспорта)",
        },
        {
          code: "ОП.14",
          name: "Эксплуатационные материалы (по видам транспорта)",
        },
        {
          code: "МДК.1.3",
          name: "Автоматизированные системы управления на транспорте (по видам транспорта)",
        },
        {
          code: "УП.1.1",
          name: "Учебная практика Техническая документация перевозочных процессов",
        },
        {
          code: "УП.1.2",
          name: "Учебная практика Решение транспортной задачи на ЭВМ",
        },
        {
          code: "ПП.1.1",
          name: "Производственная практика",
        },
        {
          code: "ПМ.01",
          name: "Э",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "42",
      experiencecollege: "6",
      experiencework: "30",
    },
    "Тупиков П.А.": {
      fullname: "Тупиков Павел Александрович",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем",
        },
      ],
      subjects: [
        {
          code: "ОУП.06",
          name: "Физика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "33",
      experiencecollege: "10",
      experiencework: "0",
    },
    "Федорова А.Д.": {
      fullname: "Федорова Анастасия Дмитриевна",
      rank: "Методист",
      group: [],
      subjects: [],
      education: ["высшее"],
      category: "",
      degree: "",
      experience: "2",
      experiencecollege: "0",
      experiencework: "0",
    },
    "Федорова Т.В.": {
      fullname: "Федорова Татьяна Вячеславовна",
      rank: "Заведующий отделением,\nпреподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "ПП.04",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.04",
          name: "Экзамен",
        },
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "ПП.04",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.04",
          name: "Экзамен",
        },
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "УП.04",
          name: "Учебная практика",
        },
        {
          code: "ПП.01",
          name: "Производственная практика Э",
        },
        {
          code: "ПМ.01",
          name: "Экзамен",
        },
        {
          code: "МДК.3.2",
          name: "Товароведение продовольственных и непродовольственных товаров",
        },
        {
          code: "УП.03",
          name: "Учебная практика",
        },
        {
          code: "ПП.03",
          name: "Производственная практика",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "34",
      experiencecollege: "27",
      experiencework: "0",
    },
    "Федотова Н.Ю.": {
      fullname: "Федотова Нина Юрьевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву",
        },
      ],
      subjects: [
        {
          code: "ОП.09",
          name: "Народный орнамент",
        },
        {
          code: "МДК.1.1",
          name: "Художественное проектирование изделий декоративно-прикладного и народного искусства",
        },
        {
          code: "УП.02",
          name: "Практика для получения первичных профессиональных навыков Э.",
        },
        {
          code: "ПМ.01",
          name: "Экзамен",
        },
        {
          code: "ОД.2.5",
          name: "Декоративно-прикладное искусство и народные промыслы",
        },
        {
          code: "ОП.01",
          name: "История народных художественных промыслов в России",
        },
        {
          code: "ОП.08",
          name: "Технология и материаловедение",
        },
        {
          code: "МДК.1.1",
          name: "Разработка эскизов орнаментального оформления изделий из дерева",
        },
        {
          code: "УП.1.1",
          name: "Учебная практика",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "15",
      experiencecollege: "12",
      experiencework: "11",
    },
    "Филиппов М.Д.": {
      fullname: "Филиппов Максим Дмитриевич",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ПОПУП.1..110",
          name: "Обществознание",
        },
        {
          code: "ОУП.09",
          name: "Обществознание",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "1",
      experiencecollege: "1",
      experiencework: "0",
    },
    "Чернобылец О.И.": {
      fullname: "Чернобылец Ольга Ивановна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОГСЭ.05",
          name: "Психология общения ОГСЭ. 03 Психология общения",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "28",
      experiencecollege: "16",
      experiencework: "0",
    },
    "Чурсанова И.В.": {
      fullname: "Чурсанова Ирина Владимировна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОУД.10",
          name: "Информатика",
        },
        {
          code: "ОУП.04",
          name: "Информатика",
        },
        {
          code: "ОДП.02",
          name: "Информатика",
        },
        {
          code: "ОД.2.7",
          name: "Информационные технологии в профессиональной деятельности",
        },
        {
          code: "ОУП.05",
          name: "Информатика",
        },
        {
          code: "ОД.02.06",
          name: "Информационные технологии",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "1",
      experiencecollege: "1",
      experiencework: "0",
    },
    "Шевчук Д.В.": {
      fullname: "Шевчук Дарья Владиславовна",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям)",
        },
      ],
      subjects: [
        {
          code: "ОУД.12",
          name: "Индивидуальный проект",
        },
        {
          code: "МДК 02.01",
          name: "Фирменный стиль и корпоративный дизайн",
        },
        {
          code: "УП.02",
          name: "Учебная практика",
        },
        {
          code: "УП.01",
          name: "Учебная практика",
        },
        {
          code: "ДУПКВ.03",
          name: "Введение в профессию",
        },
        {
          code: "МДК.05.01",
          name: "Коммуникационный дизайн",
        },
        {
          code: "МДК.05.03",
          name: "3D-графика",
        },
        {
          code: "УП.05.01",
          name: "Учебная практика",
        },
      ],
      education: ["СПО"],
      category: "не имеет",
      degree: "не имеет",
      experience: "2",
      experiencecollege: "2",
      experiencework: "0",
    },
    "Шимина Н.Г.": {
      fullname: "Шимина Наталья Георгиевна",
      rank: "преподаватель",
      group: [
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование",
        },
      ],
      subjects: [
        {
          code: "ОГСЭ.03",
          name: "Иностранный язык",
        },
        {
          code: "ОГСЭ.03",
          name: "Иностранный язык в профессиональной деятельности",
        },
        {
          code: "ОУП.04",
          name: "Иностранный язык",
        },
        {
          code: "ОГСЭ.04",
          name: "Иностранный язык в профессиональной деятельности",
        },
      ],
      education: ["высшее"],
      category: "не имеет",
      degree: "не имеет",
      experience: "45",
      experiencecollege: "36",
      experiencework: "0",
    },
    "Юркина Н.А.": {
      fullname: "Юркина Наталья Алексеевна",
      rank: "преподаватель",
      group: [
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем",
        },
      ],
      subjects: [
        {
          code: "ОУП.03.",
          name: "Математика",
        },
        {
          code: "ОУП.03",
          name: "Математика",
        },
      ],
      education: ["высшее"],
      category: "высшая",
      degree: "не имеет",
      experience: "32",
      experiencecollege: "32",
      experiencework: "0",
    },
    "Яценко С.В.": {
      fullname: "Яценко Сергей Вадимович",
      rank: "преподаватель",
      group: [
        {
          code: "54.01.20",
          name: "Графический дизайнер ",
        },
        {
          code: "54.02.02",
          name: "Декоративно- прикладное искусство и народные промыслы (по видам) ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по отраслям) ",
        },
        {
          code: "38.02.04",
          name: "Коммерция (по отраслям) ",
        },
        {
          code: "23.02.01",
          name: "Организация перевозок и управление на транспорте (по видам) ",
        },
        {
          code: "54.02.04",
          name: "Реставрация ",
        },
        {
          code: "54.01.10",
          name: "Художник росписи по дереву ",
        },
        {
          code: "54.01.02",
          name: "Ювелир ",
        },
        {
          code: "25.02.08",
          name: "Эксплуатация беспилотных авиационных систем ",
        },
        {
          code: "09.02.07",
          name: "Информационные системы и программирование ",
        },
        {
          code: "09.01.02",
          name: "",
        },
        {
          code: "10.02.05",
          name: "Обеспечение информационной безопасности автоматизированных систем ",
        },
        {
          code: "09.02.06",
          name: "Сетевое и системное администрирование ",
        },
        {
          code: "54.02.01",
          name: "Дизайн (по",
        },
      ],
      subjects: [
        {
          code: "ОП.02",
          name: "Безопасность жизнедеятельности",
        },
        {
          code: "ОУП.13",
          name: "Основы безопасности жизнедеятельности",
        },
        {
          code: "ОД.2.6",
          name: "Правовые основы профессиональной деятельности",
        },
        {
          code: "ОП.07",
          name: "Безопасность жизнедеятельности",
        },
        {
          code: "ОП.03",
          name: "Безопасность жизнедеятельности",
        },
        {
          code: "ОП.03",
          name: "Правовое обеспечение профессиональной и предпринимательской деятельности",
        },
        {
          code: "ОП.05",
          name: "Безопасность жизнедеятельности",
        },
        {
          code: "ОП.04",
          name: "Правовое обеспечение профессиональной и предпринимательской деятельности",
        },
        {
          code: "ОП.06",
          name: "Безопасность",
        },
      ],
      education: ["высшее"],
      category: "первая",
      degree: "не имеет",
      experience: "30",
      experiencecollege: "4",
      experiencework: "26",
    },
  } as {
    [key: string]: {
      fullname: string;
      rank: string;
      group: Array<{ code: string; name: string }>;
      subjects: Array<{ code: string | null; name: string }>;
      education: Array<string>;
      category: string;
      degree: string;
      experience: string;
      experiencecollege: string;
      experiencework: string;
    };
  };

  return teacherinfo[TeacherName];
}

export function GetSferum(teacher: string) {
  const idsferum = {
    "Дюжикова А.С.": 819087205,

    "Сидорова О.А.": 819088146,

    "Древич Я.С.": 818041751,

    "Курочкина М.А.": 878132788,

    "Морылёва Л.М.": 856192463,

    "Пластова А.Л.": 0,

    "Бурцева Д.И.": 0,

    "Абдуллаев Р.Ф.": 853398357,

    "Трусов М.М.": 847155206,

    "Бычай Е.В.": 694974942,

    "Василенкова М.С.": 819593649,

    "Арсентьев П.В.": 878082529,

    "Кучиева Н.А.": 818276471,

    "Мамаев П.В.": 877985261,

    "Калинин А.Н.": 819117906,

    "Бледных О.В.": 846463512,

    "Кислова Н.И.": 819091371,

    "Мандрыкина О.Э.": 857408095,

    "Ковалевский К.Ю.": 801492552,

    "Гайворонская Я.Ю.": 803966635,

    "Осипова Г.В.": 818857708,

    "Криворот А.С.": 878059836,

    "Зверев М.В.": 856921566,

    "Яценко С.В.": 818032841,

    "Гризецкий А.А.": 818719156,

    "Жулега В.В.": 818103962,

    "Бобылёва М.А.": 818880740,

    "Пахомова О.Н.": 0,

    "Прокофьева Г.А.": 818418408,

    "Скворцов Д.С.": 0,

    "Кондакова В.Е.": 818778625,

    "Шамардина Н.В.": 0,

    "Чернобылец О.И.": 854217751,

    "Юркина Н.А.": 819084253,

    "Вагапова И.С.": 804483592,

    "Шимина Н.Г.": 818116600,

    "Мартиросян Т.Э.": 793533047,

    "Наумчик А.А.": 818165882,

    "Винидиктов Д.Г.": 0,

    "Березкина Н.Ю.": 818407215,

    "Гриневич У.Г.": 833759965,

    "Бахтина О.Н.": 819537509,

    "Бахтин А.И.": 781614365,

    "Тупиков П.А.": 717270555,

    "Воронько Д.А.": 818024013,

    "Воробьева О.Ю.": 818028234,

    "Гегель П.В.": 856098295,

    "Пономарчук А.А.": 819086437,

    "Никитин С.С.": 0,

    "Бычай А.П.": 819086967,

    "Морылёв С.И.": 856110003,

    "Сахапов Ф.Р.": 0,

    "Сергеенко К.К.": 818131645,

    "Гуренко О.В.": 818034998,

    "Москаева С.С.": 0,

    "Машковский Е.В.": 818783368,

    "Трофимова Т.Д.": 853343861,

    "Сорочан Ю.В.": 0,

    "Гейко Н.Е.": 818796577,

    "Лунина А.В.": 813908217,

    "Ковальчук А.С.": 786964846,

    "Петровская Е.В.": 0,

    "Крючкова Т.И.": 856135096,

    "Воробьева Н.А.": 857312659,

    "Москалюк А.И.": 0,

    "Федотова Н.Ю.": 818937916,

    "Лис Л.А.": 0,

    "Козодаева В.И.": 827281438,

    "Кириллова О.Б.": 831557517,

    "Белова Е.В.": 0,

    "Остапчук Д.А.": 878165153,

    "Куприянова Е.И.": 0,

    "Федорова Т.В.": 818025436,

    "Лобанова М.Г.": 876503855,

    "Красильникова И.А.": 781396888,

    "Лавринец А.В.": 819484553,

    "Аполонская И.В.": 0,

    "Куриленко Е.Н.": 0,
  } as {
    [key: string]: number;
  };

  return idsferum[teacher] ? idsferum[teacher] : 0;
}
