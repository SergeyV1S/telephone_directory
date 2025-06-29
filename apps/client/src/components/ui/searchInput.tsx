import { useRef } from "react";

import { SearchIcon } from "lucide-react";

import { cn } from "@/helpers";

import { Input } from "./input";

export const SearchInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => searchInputRef.current?.focus();

  return (
    <div
      className={cn(
        "group flex items-center border border-input-border rounded-sm px-3 cursor-text max-sm:pr-0 max-sm:pl-2",
        "focus-within:border-bright-blue focus-within:ring-bright-blue-light focus-within:ring-2 transition-all duration-200",
        className
      )}
    >
      <SearchIcon
        className='size-5 text-input-border group-focus-within:text-bright-blue'
        onClick={handleClick}
      />
      <Input
        ref={searchInputRef}
        className='border-0 focus-visible:border-0 focus-visible:ring-0 py-0'
        {...props}
      />
    </div>
  );
};
