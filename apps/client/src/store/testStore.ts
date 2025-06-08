import { create } from "zustand";

import type { ITestData } from "@/api/test/getTestData";
import { getTestData } from "@/api/test/getTestData";

interface ITestState {
  testData: ITestData[];
  loading: boolean;
  currentLimit: number;
  currentPage: number;
}

interface ITestActions {
  setValue: <T extends keyof ITestState>(field: T, value: ITestState[T]) => void;
  fetchTestData: (limit: string, page: string) => void;
}

type TTestStore = ITestState & ITestActions;

export const useTestStore = create<TTestStore>((set) => ({
  testData: [],
  loading: false,
  currentLimit: 10,
  currentPage: 1,
  setValue: (field, value) => set({ [field]: value }),
  fetchTestData: async (limit, page) => {
    set({ loading: true });
    try {
      const response = (await getTestData({ limit, page })).data;
      set({ testData: response });
    } catch (e) {
      console.log(e);
    } finally {
      set({ loading: false });
    }
  }
}));
