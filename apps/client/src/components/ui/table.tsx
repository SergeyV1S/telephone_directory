import * as React from "react";

import { cn } from "@/lib/utils";

const Table = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-container' className='relative w-full bg-white rounded-sm p-4 shadow-table'>
    <div data-slot='table' className={cn("w-full space-y-3", className)} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-header' className={cn("w-full pt-1 overflow-x-auto", className)} {...props}>
    <div className=''>{props.children}</div>
  </div>
);

const TableContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-header' className={cn("w-full pt-1 overflow-x-auto", className)} {...props}>
    <div className=''>{props.children}</div>
  </div>
);

const TableBody = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-body' className={cn("w-full overflow-x-auto", className)} {...props}>
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
      "grid grid-cols-[60px_repeat(7,minmax(140px,1fr))] border-b transition-colors",
      className
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-head'
    className={cn(
      "text-foreground h-10 px-2 align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-cell'
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
);

const TableCaption = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-caption'
    className={cn("flex items-center justify-between gap-8", className)}
    {...props}
  />
);

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
