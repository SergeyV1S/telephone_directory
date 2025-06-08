import { useEffect } from "react";

import { FIFTY_RECORDS, ONE_HUNDRED_RECORDS, TEN_RECORDS, TTWENTY_FIVE_RECORDS } from "@/constants";
import { useDirectoryStore } from "@/store";

import { TableNav } from "./TableNav";
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
  TableRow,
  Typography
} from "./ui";

export const DirectoryTable = () => {
  const { testData, isLoading, currentLimit, currentPage, fetchTestData, setValue } =
    useDirectoryStore();

  const dataLength = 5000;
  const startRecord = testData.length > 0 ? testData[0]?.id : currentLimit + 2;
  const endRecord = testData[testData.length - 1]?.id;
  const totalPages = dataLength / currentLimit;

  useEffect(() => {
    fetchTestData(currentLimit, currentPage);
  }, [currentLimit, currentPage]);

  return (
    <Table className='mt-5'>
      <TableCaption>
        <div className='flex items-center gap-3'>
          <Typography variant='xs'>Записи</Typography>
          <Select
            defaultValue={currentLimit.toString()}
            onValueChange={(newLimit) => setValue("currentLimit", +newLimit)}
          >
            <SelectTrigger className='w-24'>
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
        <SearchInput placeholder='Введите текст' className='max-w-96' />
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
          {isLoading && testData.length === 0 ? (
            <div className=''>Загрузка</div>
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
