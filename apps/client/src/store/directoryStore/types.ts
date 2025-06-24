import type { IGetPhonebookRecords } from "@repo/types";

interface IDirectoryState {
  records: IGetPhonebookRecords[];
  isLoading: boolean;
  totalRecords?: number;
  currentLimit: number;
  query: string;
  currentPage: number;
}

interface IDirectoryActions {
  setValue: <T extends keyof IDirectoryState>(field: T, value: IDirectoryState[T]) => void;
  fetchTestData: (limit: number, page: number, query: string) => void;
}

export type TDirectoryStore = IDirectoryState & IDirectoryActions;
