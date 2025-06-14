import { toast } from "sonner";

import { useOnlineStatus } from "@/hooks";

import { Toaster } from "./ui";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    toast.warning("Отсутствует подключение к интернету.", {
      position: "top-center",
      description: "Вы находитесь в оффлайн-режиме. Некоторые функции могут быть недоступны.",
      richColors: true,
      closeButton: true,
      duration: 10000
    });
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
