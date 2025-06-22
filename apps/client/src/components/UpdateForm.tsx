import { useActionState, useEffect, useRef, useState } from "react";

import { FileIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { postUpdateData } from "@/api/update/postUpdateData";
import { cn } from "@/helpers";

import { Button, Input, Typography } from "./ui";

interface IUpdateFormProps {
  closeDialog: () => void;
}

export const UpdateForm = ({ closeDialog }: IUpdateFormProps) => {
  const [updatedData, updateDataAction, isPending] = useActionState(postUpdateData, undefined);
  const [isOver, setIsOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: File[]) => {
    const jsonFiles = newFiles.filter(
      (file) => file.type === "application/json" || file.name.endsWith(".json")
    );
    setUploadedFiles((prev) => [...prev, ...jsonFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const files = "dataTransfer" in e ? e.dataTransfer.files : e.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
  };

  const removeFile = (fileIndex: number) =>
    setUploadedFiles((prev) => prev.filter((_, index) => index !== fileIndex));

  const handleClick = () => fileInputRef.current?.click();

  useEffect(() => {
    if (updatedData?.success) {
      toast.success("Данные успешно обновлены!");
      closeDialog();
    }
  }, [updatedData]);

  return (
    <form action={updateDataAction} className='space-y-8 flex flex-col'>
      <Input
        name='password'
        autoComplete='off'
        placeholder='Введите пароль'
        type='password'
        required
      />

      <div
        onDrop={handleDrop}
        onDragLeave={() => setIsOver(false)}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isOver) setIsOver(true);
        }}
        onClick={handleClick}
        className={cn(
          "border-[4px] border-dashed hover:bg-muted py-14 px-24 flex items-center justify-center flex-col cursor-pointer rounded-3xl",
          `${isOver ? "border-primary bg-input" : "border-border"}`
        )}
      >
        <FileIcon className='size-20' />
        <Typography variant='s_medium' className='text-center'>
          Перетащите json файлы сюда или нажмите для выбора
        </Typography>
        <input
          ref={fileInputRef}
          name='files'
          type='file'
          onChange={handleFileChange}
          className='hidden'
          accept='.json'
          multiple
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className='space-y-2'>
          <Typography tag='h3' variant='s_medium'>
            Выбранные файлы:
          </Typography>
          <ul className='grid grid-cols-[repeat(2,1fr)] gap-2'>
            {uploadedFiles.map((file, index) => (
              <li key={index} className='relative p-2 bg-muted rounded'>
                <div className='flex items-center flex-col justify-center gap-2'>
                  <FileIcon size={30} />
                  <Typography variant='xxs'>{file.name}</Typography>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => removeFile(index)}
                  className='absolute top-1 right-1 text-destructive hover:text-destructive/80'
                >
                  <XIcon className='size-4' />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button type='submit' size='lg' disabled={isPending || uploadedFiles.length === 0}>
        Отправить
      </Button>
    </form>
  );
};
