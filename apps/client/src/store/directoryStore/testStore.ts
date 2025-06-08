import { create } from "zustand";

import { getTestData } from "@/api/test/getTestData";

import type { TDirectoryStore } from "./types";

export const useDirectoryStore = create<TDirectoryStore>((set) => ({
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
