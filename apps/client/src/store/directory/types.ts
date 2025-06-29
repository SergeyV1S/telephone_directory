import type { IGetPhonebookRecords, TGroupBy, TOrderBy } from "@repo/types";

interface IDirectoryState {
  records: IGetPhonebookRecords[];
  isLoading: boolean;
  totalRecords?: number;
  currentLimit: number;
  query?: string;
  currentPage: number;
  groupBy?: TGroupBy;
  orderBy?: TOrderBy;
}

interface IDirectoryActions {
  setValue: <T extends keyof IDirectoryState>(field: T, value: IDirectoryState[T]) => void;
  fetchRecords: (
    limit: number,
    page: number,
    query?: string,
    orderBy?: TOrderBy,
    groupBy?: TGroupBy
  ) => void;
}

export type TDirectoryStore = IDirectoryState & IDirectoryActions;
