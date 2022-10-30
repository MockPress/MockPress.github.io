import { useState } from "react";
import styled from "styled-components";
import Result from "./components/Result";
import SchemaForm from "./components/SchemaForm";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaNpm } from "@react-icons/all-files/fa/FaNpm";

const personFieldTypes: Field[] = [
  { name: "id", type: "autoIncrement" },
  { name: "username", type: "text" },
  { name: "name", type: "koreanName" },
  { name: "address", type: "koreanAddress" },
];

function App() {
  const [result, setResult] = useState<MockData[]>();

  return (
    <Container>
      <Header>
        <PageTitle>MockPress</PageTitle>
        <PageDescription>
          Mock data generator, simple and flexible.
        </PageDescription>
        <LinkContainer>
          <Link href="https://github.com/MockPress/mockpress">
            <FaGithub />
          </Link>
          <Link href="https://www.npmjs.com/package/mockpress">
            <FaNpm />
          </Link>
        </LinkContainer>
      </Header>
      <Main>
        <SchemaForm defaultSchema={personFieldTypes} setResult={setResult} />
        <ResultContainer>
          <Result result={result} />
        </ResultContainer>
      </Main>
    </Container>
  );
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 50px 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
`;

const PageDescription = styled.p`
  font-size: 1.5rem;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Link = styled.a`
  font-size: 24px;
`;

const Main = styled.main`
  display: flex;
  width: 90%;
  max-width: 1400px;
`;

const ResultContainer = styled.div`
  width: 50%;
`;
