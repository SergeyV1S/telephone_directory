import { create } from "zustand";

import { getTestData } from "@/api/test/getTestData";

import type { TDirectoryStore } from "./types";

export const useDirectoryStore = create<TDirectoryStore>((set) => ({
  testData: [],
  isLoading: false,
  currentLimit: 10,
  currentPage: 1,
  searchValue: "",
  setValue: (field, value) => set({ [field]: value }),
  fetchTestData: async (limit, page, searchValue) => {
    set({ isLoading: true });
    try {
      const response = (await getTestData({ limit, page, searchValue })).data;
      set({ testData: response });
    } catch (e) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  }
}));
