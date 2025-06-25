import { useRef, useState } from "react";

import { FileIcon, XIcon } from "lucide-react";

import { cn } from "@/helpers";
import { useUploadStore } from "@/store";

import { Button, Input, Typography } from "./ui";

export const UpdateForm = () => {
  const { isLoading, uploadedFiles, setValue, uploadPhonebook } = useUploadStore();
  const [isOver, setIsOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: File[]) => {
    const jsonFiles = newFiles.filter(
      (file) => file.type === "application/json" || file.name.endsWith(".json")
    );
    const newUploadedFiles = uploadedFiles.concat(jsonFiles);
    setValue("uploadedFiles", newUploadedFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isOver) setIsOver(true);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const files = "dataTransfer" in e ? e.dataTransfer.files : e.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
  };

  const removeFile = (fileIndex: number) => {
    const newUploadedFiles = uploadedFiles.filter((_, index) => index !== fileIndex);
    setValue("uploadedFiles", newUploadedFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <form action={uploadPhonebook} className='space-y-8 flex flex-col'>
      <Input
        name='password'
        autoComplete='off'
        placeholder='Введите пароль'
        type='password'
        required
      />

      <div
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className={cn(
          "border-3 border-dashed hover:bg-muted py-14 px-24 flex items-center justify-center flex-col gap-2 cursor-pointer rounded-3xl",
          `${isOver ? "border-primary bg-input" : "border-border"}`
        )}
      >
        <FileIcon className='size-14' />
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
                  variant='destructive'
                  onClick={() => removeFile(index)}
                  className='absolute top-1 right-1'
                >
                  <XIcon className='size-4' />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button type='submit' size='lg' disabled={isLoading || uploadedFiles.length === 0}>
        Отправить
      </Button>
    </form>
  );
};
