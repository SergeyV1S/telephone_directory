import { create } from "zustand";

import { getPhonebookRecords } from "@/api";

import type { TDirectoryStore } from "./types";

export const useDirectoryStore = create<TDirectoryStore>((set) => ({
  records: [],
  isLoading: false,
  currentLimit: 10,
  currentPage: 1,
  query: "",
  totalRecords: 1,
  setValue: (field, value) => set({ [field]: value }),
  fetchTestData: async (limit, page, query) => {
    set({ isLoading: true });
    try {
      const { records, totalRecords } = (
        await getPhonebookRecords({
          limit: limit.toString(),
          page: page.toString(),
          query,
          groupBy: "firstname",
          orderBy: "ASC"
        })
      ).data.message;
      set({ records, totalRecords });
    } catch (e) {
      console.log(e);
    } finally {
      set({ isLoading: false });
    }
  }
}));
