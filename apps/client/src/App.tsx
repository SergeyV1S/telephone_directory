import { Container } from "@/components/Container";
import {
  Input,
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
  TableRow
} from "@/components/ui";

const App = () => (
  <Container>
    <Table>
      <TableCaption>
        <div className='flex items-center gap-3'>
          <p>Записи</p>
          <Select defaultValue='10'>
            <SelectTrigger className='max-w-24'>
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
        <Input placeholder='' className='max-w-96' />
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Яцук Сергей Николаевич</TableCell>
            <TableCell>+79451386424</TableCell>
            <TableCell>Frontend Developer</TableCell>
            <TableCell>ул. Пушкина дом Колотушкина</TableCell>
            <TableCell>Igniz</TableCell>
            <TableCell>Igniz Developer</TableCell>
            <TableCell>serg@yandex.ru</TableCell>
          </TableRow>
        </TableBody>
      </TableContent>
      <TableFooter>
        <p>Показано с 1 по 10 из 8485 записей</p>
        <nav>nav</nav>
      </TableFooter>
    </Table>
  </Container>
);

export default App;
