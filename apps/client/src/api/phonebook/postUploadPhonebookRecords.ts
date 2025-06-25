import { api } from "../instance";

interface IPostUpdateDataResponse {
  success: boolean;
}

interface IPostUploadPhonebookRecordsParams {
  password: string;
  formData: FormData;
}

export const postUploadPhonebookRecords = async ({
  password,
  formData
}: IPostUploadPhonebookRecordsParams) =>
  api.post<IResponse<IPostUpdateDataResponse>>("/update", formData, {
    headers: {
      Authorization: password,
      "Content-Type": "multipart/form-data"
    }
  });
