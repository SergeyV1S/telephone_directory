import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import { Typography } from "./typography";

const Table = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-container' className='relative w-full bg-white rounded-sm p-4 shadow-table'>
    <div data-slot='table' className={cn("w-full space-y-3", className)} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-header' className={cn("w-full pt-1", className)} {...props}>
    <div className=''>{props.children}</div>
  </div>
);

const TableContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-header'
    className={cn("w-full pt-1 max-h-[700px] overflow-auto", className)}
    {...props}
  >
    <div className=''>{props.children}</div>
  </div>
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
      "w-full grid grid-cols-[60px_repeat(7,minmax(140px,1fr))] px-3 transition-colors",
      className
    )}
    {...props}
  />
);

const TableHead = ({
  className,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : Typography;

  return (
    <Comp
      data-slot='table-head'
      {...(!asChild && { tag: "h2", variant: "s_medium" })}
      className={cn(
        "text-foreground bg-(--base-dark-3) border-b flex items-center h-10 px-4 py-6 font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
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
      className={cn(
        "px-4 py-3 align-middle border-b [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
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
