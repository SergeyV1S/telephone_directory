import { useEffect } from "react";

import { toast } from "sonner";

import { useOnlineStatus } from "@/hooks";

import { Button, Toaster } from "./ui";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { isOnline, wasOffline } = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      toast.warning("Отсутствует подключение к интернету.", {
        position: "top-center",
        description: "Вы находитесь в оффлайн-режиме. Некоторые функции могут быть недоступны.",
        richColors: true,
        closeButton: true,
        dismissible: false
      });
    } else if (wasOffline) {
      toast.success("Подключение восстановлено!", {
        position: "top-center",
        richColors: true,
        closeButton: true,
        action: <Button>Обновить</Button>,
        dismissible: false
      });
    }
  }, [isOnline]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
