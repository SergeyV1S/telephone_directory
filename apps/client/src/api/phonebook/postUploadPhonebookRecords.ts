import { api } from "../instance";

export interface IPostUpdateDataResponse {
  success: boolean;
}

export const postUploadPhonebookRecords = async (prevState: unknown, formData: FormData) =>
  api.post("/update", formData.get("files"), {
    headers: {
      Authorization: `Bearer ${formData.get("password")}`,
      "Content-Type": "multipart/form-data"
    }
  });
