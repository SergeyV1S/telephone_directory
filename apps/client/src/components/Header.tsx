import { useUploadStore } from "@/store";

import { UpdateForm } from "./UpdateForm";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui";

export const Header = () => {
  const { isModalOpen, setValue } = useUploadStore();

  const onOpenDialogChange = () => setValue("isModalOpen", !isModalOpen);

  return (
    <header className='flex items-center justify-center bg-white py-3'>
      <div className='flex items-center justify-between w-[calc(100%-50px)] max-w-8xl'>
        <img src='/logo.svg' alt='Gazprom_logo' />
        <Dialog open={isModalOpen} onOpenChange={onOpenDialogChange}>
          <DialogTrigger asChild>
            <Button variant='outline'>Обновить данные</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Обновление данных справочника</DialogTitle>
            </DialogHeader>
            <UpdateForm />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
