import { useEffect } from "react";

import type { TOrderBy } from "@repo/types";
import { ArrowDownAZIcon } from "lucide-react";
import { BeatLoader } from "react-spinners";

import { FIFTY_RECORDS, ONE_HUNDRED_RECORDS, TEN_RECORDS, TTWENTY_FIVE_RECORDS } from "@/constants";
import { useDebouncedInput } from "@/hooks";
import { useDirectoryStore } from "@/store";

import { GroupFilter } from "./GroupFilter";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContent,
  TableFooter,
  TableHeader,
  TableNav,
  TableRow,
  Typography
} from "./ui";

export const DirectoryTable = () => {
  const {
    records,
    totalRecords,
    isLoading,
    query,
    orderBy,
    groupBy,
    currentLimit,
    currentPage,
    fetchRecords,
    setValue
  } = useDirectoryStore();

  const { inputValue, handleChange } = useDebouncedInput({
    value: query,
    onChange: (value) => setValue("query", value)
  });

  const startRecord = records.length > 0 ? currentLimit * currentPage - currentLimit + 1 : 0;
  const endRecord = Math.min(currentLimit * currentPage, totalRecords || 1);
  const totalPages = totalRecords !== 0 ? Math.ceil(totalRecords! / currentLimit) : 1;

  useEffect(() => {
    fetchRecords(currentLimit, currentPage, query, orderBy, groupBy);
  }, [currentLimit, currentPage, query, orderBy, groupBy]);

  return (
    <Table className='mt-5'>
      <TableCaption>
        <div className='flex items-center gap-3'>
          <Typography variant='xs'>Записи</Typography>
          <Select
            defaultValue={currentLimit.toString()}
            onValueChange={(newLimit) => setValue("currentLimit", +newLimit)}
          >
            <SelectTrigger className='w-24' disabled={isLoading}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TEN_RECORDS}>{TEN_RECORDS}</SelectItem>
              <SelectItem value={TTWENTY_FIVE_RECORDS}>{TTWENTY_FIVE_RECORDS}</SelectItem>
              <SelectItem value={FIFTY_RECORDS}>{FIFTY_RECORDS}</SelectItem>
              <SelectItem value={ONE_HUNDRED_RECORDS}>{ONE_HUNDRED_RECORDS}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-4'>
          <DropdownMenu>
            <HoverCard>
              <HoverCardTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <ArrowDownAZIcon className='size-6' />
                  </Button>
                </DropdownMenuTrigger>
              </HoverCardTrigger>
              <HoverCardContent>
                <Typography variant='xxs_medium' className='text-white'>
                  Упорядочить
                </Typography>
              </HoverCardContent>
            </HoverCard>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuRadioGroup
                value={orderBy}
                onValueChange={(newOrderBy) => setValue("orderBy", newOrderBy as TOrderBy)}
              >
                <DropdownMenuRadioItem value='ASC'>По возрастанию</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='DESC'>По убыванию</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <SearchInput
            value={inputValue}
            onChange={handleChange}
            placeholder='Введите текст'
            className='max-w-96'
          />
        </div>
      </TableCaption>
      <TableContent>
        <TableHeader>
          <TableRow>
            <GroupFilter columnName='#' />
            <GroupFilter columnName='ФИО' composeFilter={["firstname", "lastname", "middlename"]} />
            <GroupFilter columnName='Телефон' />
            <GroupFilter columnName='Должность' columnFilterName='post' />
            <GroupFilter columnName='Адрес' />
            <GroupFilter columnName='Организация' columnFilterName='organisation' />
            <GroupFilter columnName='Подразделение' columnFilterName='subdivision' />
            <GroupFilter columnName='Email' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <BeatLoader
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              color='var(--color-corporate)'
            />
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className={`${record.id.length >= 6 && "pl-0"} `}>{record.id}</TableCell>
                <TableCell>{`${record.firstname} ${record.lastname} ${record.middlename}`}</TableCell>
                <TableCell className='flex flex-col'>
                  <span>Газ. тел.: {record.gasPhone}</span>
                  <span>Гор. тел.: {record.urbanPhone}</span>
                </TableCell>
                <TableCell>{record.post}</TableCell>
                <TableCell>{record.address}</TableCell>
                <TableCell>{record.organization}</TableCell>
                <TableCell>{record.subdivision}</TableCell>
                <TableCell>{record.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableContent>
      <TableFooter>
        <Typography>
          Показано с {startRecord} по {endRecord} из {totalRecords} записей
        </Typography>
        <TableNav totalPages={totalPages} />
      </TableFooter>
    </Table>
  );
};
