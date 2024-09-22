import { initInitData } from "@telegram-apps/sdk-react";
const initData = initInitData();
const langcode = ((initData?.user?.languageCode == "ru" || "en" || "de"
  ? initData?.user?.languageCode
  : "ru") || "ru") as "ru" | "en" | "de";

const lang = {
  schedule: { ru: "Расписание", en: "Schedule", de: "Zeitplan" },
  mainmenu: { ru: "Главное меню", en: "Main Menu", de: "Hauptmenü" },
  call: { ru: "Звонки", en: "Calls", de: "Anrufe" },
  group: { ru: "Групп", en: "Groups", de: "Gruppen" },
  teachers: { ru: "Преподавателей", en: "Teachers", de: "Lehrer" },
  offices: { ru: "Кабинетов", en: "Offices", de: "Bueros" },
  subscribe: {
    ru: "Подписка на замены",
    en: "Subscribe to changes",
    de: "Änderungen abonnieren",
  },
  monday: {
    ru: "Понедельник",
    en: "Monday",
    de: "Montag",
  },
  tuesday: { ru: "Вторник", en: "Tuesday", de: "Dienstag" },
  wendnesday: { ru: "Среда", en: "Wendnesday", de: "Mittwoch" },
  thursday: { ru: "Четверг", en: "Thursday", de: "Donnerstag" },
  friday: { ru: "Пятница", en: "Friday", de: "Freitag" },
  saturday: { ru: "Суббота", en: "Saturday", de: "Samstag" },
  subscribenotification: {
    ru: "Вы успешно изменили подписку на замены",
    en: "You have successfully changed your replacement subscription",
    de: "Sie haben Ihr Ersatzabonnement erfolgreich geändert",
  },
  subscribenotificationon: {
    ru: "Подписались на",
    en: "Subscribed to",
    de: "Abonniert für",
  },
  subscribenotificationoff: {
    ru: "Отписались от",
    en: "Unsubscribed from",
    de: "Abgemeldet von",
  },
  office: { ru: "Кабинет", en: "Office", de: "Kabinett" },
  teacher: { ru: "Преподаватель", en: "Teacher", de: "Lehrer" },
  group2: { ru: "Группа", en: "Group", de: "Gruppe" },
  academidegree: {
    ru: "Учёная степень",
    en: "Academic degree",
    de: "akademischer Grad",
  },
  category: { ru: "Категория", en: "Category", de: "Kategorie" },
  workexperience: {
    ru: "Стаж работы",
    en: "Work experience",
    de: "Dienstalter",
  },
  pedagogical: { ru: "Педагогический", en: "Pedagogical", de: "Pädagogisch" },
  profession: { ru: "В профессии", en: "In the profession", de: "Im Beruf" },
  groups: { ru: "Группы", en: "Groups", de: "Gruppen" },
  codegroup: { ru: "Код группы", en: "Group code", de: "Gruppen-Code" },
  items: { ru: "Предметы", en: "Items", de: "Sachen" },
  itemcode: { ru: "Код предмета", en: "Item code", de: "Artikelcode" },
  education: { ru: "Образование", en: "Education", de: "Ausbildung" },
  notinformation: {
    ru: "Информация отсутствует",
    en: "There is no information available",
    de: "Keine Informationen verfügbar",
  },
  years: { ru: "лет", en: "years", de: "jahre" },
  search: { ru: "Поиск", en: "Search", de: "Suche" },
  entername: {
    ru: "Введите название",
    en: "Enter a name",
    de: "Geben Sie einen Namen ein",
  },
  authors: { ru: "Авторы", en: "Authors", de: "Autoren" },
  and: { ru: "и", en: "and", de: "und" },
  important: { ru: "Важно", en: "Important", de: "Wichtig" },
  access: {
    ru: "Для доступа вам необходимо иметь сферум и подключиться к нашему колледжу.",
    en: "To access, you need to have sferum and connect to our college.",
    de: "Sie müssen sferum haben und sich mit unserem College verbinden, um darauf zugreifen zu können.",
  },
  advice: {
    ru: "Совет от нас - пишите преподавателям только в рабочее время.",
    en: "Our advice is to write to teachers only during working hours.",
    de: "Tipp von uns - schreiben Sie den Lehrern nur während der Arbeitszeit.",
  },
  agree: { ru: "Согласен", en: "Agree", de: "Einverstanden" },
  writeteacher: {
    ru: "Написать преподавателю",
    en: "Write to the teacher",
    de: "An den Lehrer schreiben",
  },
  nowriteteacher: {
    ru: "Преподаватель еще не подключен к сферуму",
    en: "The teacher is not connected to the sferum",
    de: "Der Lehrer ist noch nicht mit sferum verbunden",
  },
};

export default {
  schedule: lang.schedule[langcode],
  mainmenu: lang.mainmenu[langcode],
  call: lang.call[langcode],
  group: lang.group[langcode],
  teachers: lang.teachers[langcode],
  offices: lang.offices[langcode],
  subscribe: lang.subscribe[langcode],
  monday: lang.monday[langcode],
  tuesday: lang.tuesday[langcode],
  wendnesday: lang.wendnesday[langcode],
  thursday: lang.thursday[langcode],
  friday: lang.friday[langcode],
  saturday: lang.saturday[langcode],
  subscribenotification: lang.subscribenotification[langcode],
  subscribenotificationon: lang.subscribenotificationon[langcode],
  subscribenotificationoff: lang.subscribenotificationoff[langcode],
  office: lang.office[langcode],
  teacher: lang.teacher[langcode],
  group2: lang.group2[langcode],
  academidegree: lang.academidegree[langcode],
  category: lang.category[langcode],
  workexperience: lang.workexperience[langcode],
  pedagogical: lang.pedagogical[langcode],
  profession: lang.profession[langcode],
  groups: lang.groups[langcode],
  codegroup: lang.codegroup[langcode],
  items: lang.items[langcode],
  itemcode: lang.itemcode[langcode],
  education: lang.education[langcode],
  notinformation: lang.notinformation[langcode],
  years: lang.years[langcode],
  search: lang.search[langcode],
  entername: lang.entername[langcode],
  authors: lang.authors[langcode],
  and: lang.and[langcode],
  important: lang.important[langcode],
  access: lang.access[langcode],
  advice: lang.advice[langcode],
  agree: lang.agree[langcode],
  writeteacher: lang.writeteacher[langcode],
  nowriteteacher: lang.nowriteteacher[langcode],
};
