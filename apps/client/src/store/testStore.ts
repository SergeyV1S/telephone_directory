import { create } from "zustand";

import type { ITestData } from "@/api/test/getTestData";
import { getTestData } from "@/api/test/getTestData";

interface ITestStore {
  testData: ITestData[];
  loading: boolean;
  fetchTestData: (limit: string, page: string) => void;
}

export const useTestStore = create<ITestStore>((set) => ({
  testData: [],
  loading: false,
  async fetchTestData(limit, page) {
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
