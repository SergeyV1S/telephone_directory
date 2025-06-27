import type { TGroupBy } from "@repo/types";
import { ArrowDownUp } from "lucide-react";

import { useDirectoryStore } from "@/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { TableHead } from "./ui/table";
import { Typography } from "./ui/typography";

interface IGroupFilter {
  columnFilterName?: TGroupBy;
  columnName: string;
  composeFilter?: TGroupBy[];
}

export const GroupFilter = ({ columnName, columnFilterName, composeFilter }: IGroupFilter) => {
  const { groupBy, setValue } = useDirectoryStore();

  const handleOnButtonClick = () => {
    if (groupBy === columnFilterName) {
      setValue("groupBy", undefined);
      return;
    }
    setValue("groupBy", columnFilterName);
  };

  if (columnFilterName) {
    return (
      <TableHead isActive={groupBy === columnFilterName} onClick={handleOnButtonClick}>
        <span>{columnName}</span>
        <ArrowDownUp />
      </TableHead>
    );
  }

  if (composeFilter) {
    const handleOnValueChange = (newGroupBy: string) => {
      if (groupBy === newGroupBy) {
        setValue("groupBy", undefined);
        return;
      }
      setValue("groupBy", newGroupBy as TGroupBy);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TableHead
            isActive={composeFilter.includes(groupBy || "post")}
            onClick={handleOnButtonClick}
          >
            <span>{columnName}</span>
            <ArrowDownUp />
          </TableHead>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuRadioGroup value={groupBy} onValueChange={handleOnValueChange}>
            {composeFilter.map((item) => (
              <DropdownMenuRadioItem defaultChecked={item === groupBy} value={item}>
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <TableHead asChild>
      <Typography tag='h2'>{columnName}</Typography>
    </TableHead>
  );
};
