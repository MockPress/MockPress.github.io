import { useState } from "react";
import styled from "styled-components";
import SchemaForm from "./components/SchemaForm";

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
      </Header>
      <Main>
        <SchemaForm defaultSchema={personFieldTypes} setResult={setResult} />
        <Result>
          <h2>Result</h2>
          {!!result && (
            <pre>
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          )}
        </Result>
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
  gap: 30px;
  padding: 50px 0 30px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
`;

const PageDescription = styled.p`
  font-size: 1.5rem;
`;

const Main = styled.main`
  display: flex;
  width: 90%;
  max-width: 1400px;
`;

const Result = styled.div`
  width: 50%;
`;
