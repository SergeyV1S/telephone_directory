interface IUploadState {
  isLoading: boolean;
  isModalOpen: boolean;
  responseSuccess: boolean;
  uploadedFiles: File[];
}

interface IUploadActions {
  setValue: <T extends keyof IUploadState>(field: T, value: IUploadState[T]) => void;
  uploadPhonebook: (formData: FormData) => void;
}

export type TUploadStore = IUploadState & IUploadActions;
