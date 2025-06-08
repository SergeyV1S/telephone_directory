import { useEffect } from "react";

import { useTestStore } from "@/store";

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
  const { testData, loading, currentLimit, currentPage, fetchTestData, setValue } = useTestStore();

  const dataLength = 5000;
  const startRecord = testData.length > 0 ? testData[0]?.id : currentLimit + 2;
  const endRecord = testData[testData.length - 1]?.id;
  const totalPages = dataLength / currentLimit;

  const onLimitChangeHandler = (newLimit: string) => setValue("currentLimit", +newLimit);

  useEffect(() => {
    fetchTestData(currentLimit.toString(), currentPage.toString());
  }, [currentLimit, currentPage]);

  return (
    <Table>
      <TableCaption>
        <div className='flex items-center gap-3'>
          <p>Записи</p>
          <Select defaultValue={currentLimit.toString()} onValueChange={onLimitChangeHandler}>
            <SelectTrigger className='w-24'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='25'>25</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
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
          {loading && testData.length === 0 ? (
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
