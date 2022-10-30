import { generate } from "mockpress";
import { ChangeEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { fieldOptions, generateSchema } from "../mockUtils";
import { fieldComponentMapper } from "./FieldInput";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";

type Props = {
  defaultSchema: Field[];
  setResult: React.Dispatch<React.SetStateAction<MockData[]>>;
};

const isType = (input: string): input is FieldType =>
  input in fieldComponentMapper;

function SchemaForm({ defaultSchema, setResult }: Props) {
  const [schema, setSchema] = useState(defaultSchema);
  const [amount, setAmount] = useState(5);
  const handleFieldTypeChange: (
    index: number
  ) => ChangeEventHandler<HTMLSelectElement> = (index) => (e) => {
    const type = e.target.value;
    if (!isType(type)) throw new Error("Invalid Field Type");

    setSchema((prev) => {
      const newArray = [...prev];
      newArray[index] = { name: newArray[index].name, type };
      return newArray;
    });
  };

  const setFieldData = (index: number) => (data: Partial<Field>) => {
    setSchema((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], ...data };
      return newArray;
    });
  };

  const addNewField = () => {
    setSchema((prev) => {
      const newArray = [...prev];
      newArray.push({
        name: `field ${newArray.length + 1}`,
        type: "autoIncrement",
      });
      return newArray;
    });
  };

  const removeField = (index: number) => () => {
    setSchema((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.valueAsNumber;
    if (input > 10000 || input === NaN) {
      alert("incorrect amount");
      return;
    }
    setAmount(e.target.valueAsNumber);
  };

  const generateData: () => MockData[] = () => {
    try {
      return generate(generateSchema(schema), amount) as MockData[];
    } catch (e) {
      alert(e instanceof Error ? e.message : "Unknown Error");
    }
  };

  const handleNewDataGenerate = () => {
    setResult(generateData());
  };

  useEffect(() => {
    handleNewDataGenerate();
  }, []);

  return (
    <Container>
      <SectionTitle>Select Your Schema</SectionTitle>
      <FieldContainer>
        {schema.map(({ name, type, params }, index) => {
          const data = { name, params };
          const Component = fieldComponentMapper[type];
          return (
            <Field key={index}>
              <TypeField>
                <Strong>Field #{index + 1}</Strong>
                <label>type: </label>
                <Select value={type} onChange={handleFieldTypeChange(index)}>
                  {fieldOptions}
                </Select>
              </TypeField>
              <PropertyInput>
                <Component data={data} setFieldData={setFieldData(index)} />
                <RemoveButton onClick={removeField(index)}>
                  <MdDelete />
                </RemoveButton>
              </PropertyInput>
            </Field>
          );
        })}
      </FieldContainer>
      <Button onClick={addNewField}>Add New Field</Button>
      <AmountField>
        <p>
          <Strong>Amount</Strong> (max: 10000):
        </p>
        <AmountInput
          type={"number"}
          value={amount}
          onChange={handleAmountChange}
        />
      </AmountField>
      <Button onClick={handleNewDataGenerate}>Generate Data</Button>
    </Container>
  );
}

export default SchemaForm;

const Container = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 5%;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  overflow-y: scroll;
`;

const Strong = styled.span`
  font-size: 1.1;
  font-weight: 700;
`;

const Field = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;

  border-bottom: 1px solid black;
`;

const Select = styled.select`
  padding: 5px;
`;

const PropertyInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  input[type="text"],
  input[type="number"],
  select {
    width: 80px;
    padding: 5px;
  }
`;

const TypeField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const AmountField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;

const RemoveButton = styled(Button)`
  justify-self: flex-end;
  display: flex;
  align-items: center;
`;

const AmountInput = styled.input`
  padding: 5px;
`;
