import { useEffect } from "react";

import { Slot } from "@radix-ui/react-slot";
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/helpers/utils";
import { useDebouncedInput } from "@/hooks";
import { useDirectoryStore } from "@/store";

import { Button, Input, Typography, typographyVariants } from ".";

const Table = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-container'
    className={cn(
      "relative flex flex-col size-full space-y-5 bg-white rounded-sm p-4 shadow-table",
      className
    )}
    {...props}
  />
);

const TableHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-header'
    className={cn("w-full sticky top-0 z-10 bg-white", className)}
    {...props}
  />
);

const TableContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-content'
    className={cn("relative w-full flex-1 min-h-0 overflow-auto", className)}
    {...props}
  />
);

const TableBody = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-body' className={cn("w-full", className)} {...props}>
    <div className=''>{props.children}</div>
  </div>
);

const TableFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-footer'
    className={cn("flex items-center justify-between gap-8 w-full", className)}
    {...props}
  />
);

const TableRow = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-row'
    className={cn(
      "bg-white z-10 w-full grid grid-cols-[60px_repeat(7,minmax(140px,1fr))] transition-colors",
      className
    )}
    {...props}
  />
);

const TableHead = ({
  className,
  asChild,
  isActive,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
  isActive?: boolean;
}) => {
  const Comp = asChild ? Slot : Button;

  return (
    <Comp
      data-slot='table-head'
      {...(!asChild && { variant: "ghost" })}
      className={cn(
        "bg-base-dark-3 border-b rounded-none hover:rounded-lg transition-rounded duration-300 flex items-center justify-start h-10 py-6 px-2 last:pl-8",
        typographyVariants({ variant: "s_medium" }),
        isActive && "text-corporate",
        className
      )}
      {...props}
    />
  );
};

const TableCell = ({
  className,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : Typography;

  return (
    <Comp
      data-slot='table-cell'
      className={cn("px-2 py-3 align-middle border-b last:pl-8 first:wrap-normal", className)}
      {...props}
    />
  );
};

const TableCaption = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-caption'
    className={cn("flex items-center justify-between gap-8", className)}
    {...props}
  />
);

export const TableNav = ({ totalPages }: { totalPages: number }) => {
  const { currentPage, currentLimit, isLoading, setValue } = useDirectoryStore();
  const { inputValue, handleChange } = useDebouncedInput({
    value: currentPage,
    delay: 400,
    onChange: (page) => setValue("currentPage", Math.max(1, Math.min(page, totalPages)))
  });

  const isPrevButtonsDisabled = isLoading || currentPage === 1;
  const isNextButtonsDisabled = isLoading || currentPage === totalPages;

  useEffect(() => {
    if (inputValue > totalPages) {
      setValue("currentPage", totalPages);
    }
  }, [currentLimit]);

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

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableContent
};
