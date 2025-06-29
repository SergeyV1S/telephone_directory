import type { TGroupBy } from "@repo/types";

export const translateFio = (value: TGroupBy) => {
  switch (value) {
    case "firstname":
      return "Имя";
    case "lastname":
      return "Фамилия";
    case "middlename":
      return "Отчество";
  }
};
