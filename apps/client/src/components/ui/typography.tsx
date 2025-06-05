import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TTypographyTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface ITypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  tag?: TTypographyTag;
}

const typographyVariants = cva(
  "align-middle tracking-normal text-base-dark selection:text-corporate selection:bg-base-dark-8",
  {
    variants: {
      variant: {
        xl_medium: "font-medium text-xl leading-[130%]",
        L_medium: "font-medium text-lg leading-[130%]",
        m_medium: "font-medium text-base leading-[130%]",
        s_medium: "font-medium text-sm leading-[130%]",
        xs: "font-normal text-xs leading-[150%]",
        s: "font-normal text-sm leading-[150%]"
      }
    },
    defaultVariants: {
      variant: "xs"
    }
  }
);

const Typography = ({ className, variant, tag = "p", ...props }: ITypographyProps) => {
  const Comp = tag;

  return (
    <Comp
      data-slot={variant ?? "xs"}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
