import type { ToasterProps } from "sonner";
import { Toaster as Sonner } from "sonner";

import { cn } from "@/helpers";

const Toaster = ({ className, ...props }: ToasterProps) => (
  <Sonner
    className={cn("toaster group", className)}
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      } as React.CSSProperties
    }
    {...props}
  />
);

export { Toaster };
