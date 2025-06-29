import { create } from "zustand";

import { getPhonebookRecords } from "@/api";
import { handleError } from "@/helpers";

import type { TDirectoryStore } from "./types";

export const useDirectoryStore = create<TDirectoryStore>((set, get) => ({
  records: [],
  isLoading: false,
  currentLimit: 10,
  currentPage: 1,
  totalRecords: 1,
  setValue: (field, value) => set({ [field]: value }),
  fetchRecords: async () => {
    set({ isLoading: true });
    try {
      const { currentLimit, currentPage, query, groupBy, orderBy } = get();
      const { records, totalRecords } = (
        await getPhonebookRecords({
          limit: currentLimit.toString(),
          page: currentPage.toString(),
          query,
          groupBy,
          orderBy
        })
      ).data.message;
      set({ records, totalRecords });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
