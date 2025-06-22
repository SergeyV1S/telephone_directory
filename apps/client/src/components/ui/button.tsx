import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/helpers/utils";

import { typographyVariants } from "./typography";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer disabled:cursor disabled:cursor-not-allowed justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-corporate shadow-xs text-white hover:bg-corporate/90",
        destructive:
          "text-destructive fill-destructive hover:bg-accent focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-bright-blue-light text-white shadow-xs hover:bg-bright-blue-light/80",
        ghost: "hover:bg-accent dark:hover:bg-accent/50"
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const Button = ({
  className,
  variant,
  typographyVariant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    typographyVariant?: VariantProps<typeof typographyVariants>;
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot='button'
      className={cn(
        typographyVariants({ variant: typographyVariant?.variant }),
        buttonVariants({ variant, size, className })
      )}
      {...props}
    />
  );
};

export { Button, buttonVariants };
