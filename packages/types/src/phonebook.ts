// export type IFindBy =

import { IPhoneNumber } from "./phone-number";

export interface IGetPhonebookRecordRequest {
  limit: string;
  page: string;
  groupBy?: TGroupBy;
  orderBy?: TOrderBy;
  query?: string;
}

export interface IGetPhonebookRecordsResponse {
  records: IGetPhonebookRecords[];
  totalRecords: number;
}

export interface IGetPhonebookRecords {
  id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  gasPhone: string;
  urbanPhone: string;
  email?: string;
  address?: string;
  post: string;
  organization: string;
  subdivision: string;
}

export type TGroupBy =
  | "firstname"
  | "lastname"
  | "middlename"
  | "post"
  | "organisation"
  | "subdivision";

export type TOrderBy = "ASC" | "DESC";

export interface IFirstFormat {
  ID: string;
  firstname: string;
  lastname: string;
  middlename: string;
  gasPhone: string;
  urbanPhone: string;
  email: string;
  address: string;
  post: string;
  organization: string;
  subdivision: string;
  subdivisionId: string;
}

export interface ISecondFormat {
  employeeId: string;
  name: string;
  gasPhone: string;
  urbanPhone: string;
  email: string;
  post: string;
  organization: string;
  subdivision: string;
  subdivisionId: string;
}

export interface IThirdFormat {
  id: number;
  id_dept: number;
  lastname: string;
  firstname: string;
  middlename: string;
  phonenumbers: IPhoneNumber[];
  email: string;
  address: string;
  post: string;
  organization: string;
  subdivision: string;
}
