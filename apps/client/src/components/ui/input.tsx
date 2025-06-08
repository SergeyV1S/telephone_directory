import { cn } from "@/helpers/utils";

import { typographyVariants } from "./typography";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => (
  <input
    type={type}
    data-slot='input'
    className={cn(
      "dark:bg-input/30 border-input-border flex h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:border-bright-blue focus-visible:ring-bright-blue-light focus-visible:ring-2",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      typographyVariants({ variant: "s" }),
      className
    )}
    {...props}
  />
);

export { Input };
