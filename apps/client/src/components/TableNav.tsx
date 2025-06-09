import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useDebouncedInput } from "@/hooks";
import { useDirectoryStore } from "@/store";

import { Button, Input, Typography } from "./ui";

interface ITableNavProps {
  totalPages: number;
}

export const TableNav = ({ totalPages }: ITableNavProps) => {
  const { currentPage, isLoading, setValue } = useDirectoryStore();
  const { inputValue, handleChange } = useDebouncedInput({
    value: currentPage,
    onChange: (page) => setValue("currentPage", Math.max(1, Math.min(page, totalPages)))
  });

  const isPrevButtonsDisabled = isLoading || currentPage === 1;
  const isNextButtonsDisabled = isLoading || currentPage === totalPages;

  return (
    <nav className='flex items-center gap-2'>
      <Button
        size='icon'
        variant='ghost'
        disabled={isPrevButtonsDisabled}
        onClick={() => setValue("currentPage", 1)}
      >
        <ChevronFirstIcon />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        disabled={isPrevButtonsDisabled}
        onClick={() => setValue("currentPage", Math.max(currentPage - 1, 1))}
      >
        <ChevronLeftIcon />
      </Button>
      <div className='flex items-center gap-2'>
        <Input value={inputValue} onChange={handleChange} className='max-w-14' autoComplete='off' />
        <Typography>из</Typography>
        <Typography>{totalPages}</Typography>
      </div>
      <Button
        size='icon'
        variant='ghost'
        disabled={isNextButtonsDisabled}
        onClick={() => setValue("currentPage", Math.min(currentPage + 1, totalPages))}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        disabled={isNextButtonsDisabled}
        onClick={() => setValue("currentPage", totalPages)}
      >
        <ChevronLastIcon />
      </Button>
    </nav>
  );
};
