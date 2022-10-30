import styled from "styled-components";
import { copyToClipboard } from "../clipboard";
import { FaClipboardCheck } from "@react-icons/all-files/fa/FaClipboardCheck";
import { useState } from "react";

type Props = {
  result: MockData[];
};
function Result({ result }: Props) {
  const [isCopyHovering, setCopyHovering] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"none" | "success" | "failure">(
    "none"
  );
  const resultString = JSON.stringify(result, null, 2);

  const handleCopyToClipboard = () => {
    copyToClipboard(
      resultString,
      () => {
        setCopyStatus("success");
        setTimeout(() => {
          setCopyStatus("none");
        }, 2500);
      },
      () => {
        setCopyStatus("failure");
        setTimeout(() => {
          setCopyStatus("none");
        }, 2500);
      }
    );
  };

  const handleCopyHoverIn = () => {
    setCopyHovering(true);
  };

  const handleCopyHoverOut = () => {
    setCopyHovering(false);
  };

  const copyButtonLabel = {
    none: "Copy",
    success: "Copied!",
    failure: "Copy Failed, Try Again!",
  };

  return (
    <Container>
      <SectionHeader>
        <SectionTitle>Result</SectionTitle>
        <CopyButton
          onClick={handleCopyToClipboard}
          onMouseEnter={handleCopyHoverIn}
          onMouseLeave={handleCopyHoverOut}
        >
          {isCopyHovering ? copyButtonLabel[copyStatus] : ""}{" "}
          <FaClipboardCheck />
        </CopyButton>
      </SectionHeader>

      {!!result && (
        <CodeBlock>
          <Inner>
            <code>{resultString}</code>
          </Inner>
        </CodeBlock>
      )}
    </Container>
  );
}

export default Result;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
`;

const CodeBlock = styled.div`
  height: 500px;
  padding: 5%;
  background-color: #252b2e;
  color: #fac863;
  border-radius: 15px;
`;

const Inner = styled.pre`
  height: 90%;
  overflow-y: scroll;
  line-height: 1.3;
`;

const Button = styled.button`
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;

const CopyButton = styled(Button)`
  width: max-content;
`;
