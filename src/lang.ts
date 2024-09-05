import { getlangcode } from "./utils";

const lang = {
  schedule: { ru: "Расписание", en: "Schedule", de: "Zeitplan" },
  mainmenu: { ru: "Главное меню", en: "Main Menu", de: "Hauptmenü" },
  call: { ru: "Звонки", en: "Calls", de: "Anrufe" },
  group: { ru: "Групп", en: "Group", de: "Gruppe" },
  teacher: { ru: "Преподавателей", en: "Teachers", de: "Lehrer" },
  office: { ru: "Кабинетов", en: "Offices", de: "Bueros" },
};

const langcode = getlangcode();

export default {
  schedule: lang.schedule[langcode],
  mainmenu: lang.mainmenu[langcode],
  call: lang.call[langcode],
  group: lang.group[langcode],
  teacher: lang.teacher[langcode],
  office: lang.office[langcode],
};
