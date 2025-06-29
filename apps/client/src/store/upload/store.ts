import { toast } from "sonner";
import { create } from "zustand";

import { postUploadPhonebookRecords } from "@/api";
import { handleError } from "@/helpers";

import type { TUploadStore } from "./types";

export const useUploadStore = create<TUploadStore>((set, get) => ({
  isLoading: false,
  isModalOpen: false,
  responseSuccess: false,
  uploadedFiles: [],
  setValue: (field, value) => set({ [field]: value }),
  uploadPhonebook: async (data) => {
    set({ isLoading: true });
    const password = data.get("password") as string;
    const { uploadedFiles } = get();

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const { message } = (
        await postUploadPhonebookRecords({
          password,
          formData
        })
      ).data;
      toast.success("Данные успешно обновлены");
      set({ responseSuccess: message.success, isModalOpen: false });
    } catch (error) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
