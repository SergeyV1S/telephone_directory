import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/helpers/utils";

const HoverCard = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) => (
  <HoverCardPrimitive.Root data-slot='hover-card' {...props} />
);

const HoverCardTrigger = ({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) => (
  <HoverCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />
);

const HoverCardContent = ({
  className,
  align = "center",
  side = "top",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) => (
  <HoverCardPrimitive.Portal data-slot='hover-card-portal'>
    <HoverCardPrimitive.Content
      data-slot='hover-card-content'
      align={align}
      sideOffset={sideOffset}
      side={side}
      className={cn(
        "bg-corporate text-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-hover-card-content-transform-origin) rounded-md border py-2.5 px-4 shadow-md outline-hidden",
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
);

export { HoverCard, HoverCardTrigger, HoverCardContent };
