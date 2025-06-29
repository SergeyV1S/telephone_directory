import { AxiosError } from "axios";

import { toast } from "sonner";

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error("Произошла ошибка", {
      description: error.response?.data.message
    });
  }
};
