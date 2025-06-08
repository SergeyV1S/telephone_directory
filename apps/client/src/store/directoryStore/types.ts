import type { ITestData } from "@/api/test/getTestData";

interface IDirectoryState {
  testData: ITestData[];
  isLoading: boolean;
  currentLimit: number;
  currentPage: number;
}

interface IDirectoryActions {
  setValue: <T extends keyof IDirectoryState>(field: T, value: IDirectoryState[T]) => void;
  fetchTestData: (limit: number, page: number) => void;
}

export type TDirectoryStore = IDirectoryState & IDirectoryActions;
