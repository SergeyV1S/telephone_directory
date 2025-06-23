import { useEffect } from "react";

import { BeatLoader } from "react-spinners";

import { FIFTY_RECORDS, ONE_HUNDRED_RECORDS, TEN_RECORDS, TTWENTY_FIVE_RECORDS } from "@/constants";
import { useDebouncedInput } from "@/hooks";
import { useDirectoryStore } from "@/store";

import {
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
  TableHead,
  TableHeader,
  TableNav,
  TableRow,
  Typography
} from "./ui";

export const DirectoryTable = () => {
  const { testData, isLoading, searchValue, currentLimit, currentPage, fetchTestData, setValue } =
    useDirectoryStore();

  const { inputValue, handleChange } = useDebouncedInput({
    value: searchValue,
    onChange: (value) => setValue("searchValue", value)
  });

  const dataLength = 5000;
  const startRecord = testData.length > 0 ? testData[0]?.id : currentLimit + 2;
  const endRecord = testData[testData.length - 1]?.id;
  const totalPages = dataLength / currentLimit;

  useEffect(() => {
    fetchTestData(currentLimit, currentPage, searchValue);
    console.log(searchValue);
  }, [currentLimit, currentPage, searchValue]);

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
        <SearchInput
          value={inputValue}
          onChange={handleChange}
          placeholder='Введите текст'
          className='max-w-96'
        />
      </TableCaption>
      <TableContent>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>ФИО</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Должность</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Организация</TableHead>
            <TableHead>Подразделение</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <BeatLoader
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              color='var(--color-corporate)'
            />
          ) : (
            testData.map((element) => (
              <TableRow key={element.id}>
                <TableCell>{element.id}</TableCell>
                <TableCell>Яцук Сергей Николаевич</TableCell>
                <TableCell>+79451386424</TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>ул. Пушкина дом Колотушкина</TableCell>
                <TableCell>Igniz</TableCell>
                <TableCell>Igniz Developer</TableCell>
                <TableCell>serg@yandex.ru</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableContent>
      <TableFooter>
        <Typography>
          Показано с {startRecord} по {endRecord} из {dataLength} записей
        </Typography>
        <TableNav totalPages={totalPages} />
      </TableFooter>
    </Table>
  );
};
