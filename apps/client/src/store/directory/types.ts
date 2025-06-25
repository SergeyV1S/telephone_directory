import type { IGetPhonebookRecords, TOrderBy } from "@repo/types";

interface IDirectoryState {
  records: IGetPhonebookRecords[];
  isLoading: boolean;
  totalRecords?: number;
  currentLimit: number;
  query?: string;
  currentPage: number;
  orderBy?: TOrderBy;
}

interface IDirectoryActions {
  setValue: <T extends keyof IDirectoryState>(field: T, value: IDirectoryState[T]) => void;
  fetchRecords: (limit: number, page: number, query?: string, orderBy?: TOrderBy) => void;
}

export type TDirectoryStore = IDirectoryState & IDirectoryActions;
