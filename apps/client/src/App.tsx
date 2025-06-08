import { Container } from "@/components/Container";
import { DirectoryTable } from "@/components/DirectoryTable";
import { Header } from "@/components/Header";

export const App = () => (
  <>
    <Header />
    <Container>
      <DirectoryTable />
    </Container>
  </>
);
