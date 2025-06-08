import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { useDirectoryStore } from "@/store";

import { Button, Input, Typography } from "./ui";

interface ITableNavProps {
  totalPages: number;
}

export const TableNav = ({ totalPages }: ITableNavProps) => {
  const { currentPage, setValue } = useDirectoryStore();

  const isPrevButtonsDisabled = currentPage === 1;
  const isNextButtonsDisabled = currentPage === totalPages;

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
        onClick={() => setValue("currentPage", currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <div className='flex items-center gap-2'>
        <Input
          value={currentPage}
          onChange={(e) => setValue("currentPage", +e.target.value)}
          className='max-w-14'
          autoComplete='off'
        />
        <Typography>из</Typography>
        <Typography>{totalPages}</Typography>
      </div>
      <Button
        size='icon'
        variant='ghost'
        disabled={isNextButtonsDisabled}
        onClick={() => setValue("currentPage", currentPage + 1)}
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
