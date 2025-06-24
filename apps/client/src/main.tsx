import { createRoot } from "react-dom/client";

import "@/assets/index.css";
import { Container } from "@/components/Container";
import { DirectoryTable } from "@/components/DirectoryTable";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <Header />
    <Container>
      <DirectoryTable />
    </Container>
  </Providers>
);
