import { generate, mock } from "mockpress";
import { useState } from "react";
import styled from "styled-components";
import { fieldComponentMapper } from "./FieldInput";

const field = Object.values(mock).reduce(
  (mapper, fieldFunc) => ({ ...mapper, [fieldFunc.name]: fieldFunc }),
  {}
);

const fieldOptions = Object.keys(field).map((name) => (
  <option key={name} value={name}>
    {name}
  </option>
));

const generateSchema = (fieldTypes) => {
  const names = fieldTypes.map(({ name }) => name);
  if (names.length !== new Set(names).size) throw new Error("No same name.");
  return fieldTypes.reduce((mapper, { name, type, params }) => {
    return {
      ...mapper,
      [name]: params ? field[type](...params) : field[type](),
    };
  }, {});
};

const personFieldTypes = [
  { name: "id", type: "autoIncrement" },
  { name: "name", type: "koreanName" },
  { name: "profile", type: "image" },
  { name: "birthday", type: "date" },
  { name: "favNum", type: "integer" },
  { name: "address", type: "koreanAddress" },
  { name: "budget", type: "money" },
  { name: "username", type: "text" },
];

function App() {
  const [schema, setSchema] = useState(personFieldTypes);
  const [amount, setAmount] = useState(5);
  const generateData = () => {
    try {
      return generate(generateSchema(schema), amount);
    } catch (e) {
      alert(e?.message || "Unknown Error");
      return;
    }
  };
  const [result, setResult] = useState();

  const handleFieldTypeChange = (index) => (e) => {
    setSchema((prev) => {
      const newArray = [...prev];
      newArray[index] = { name: newArray[index].name, type: e.target.value };
      return newArray;
    });
  };
  const setFieldData = (index) => (data) => {
    setSchema((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], ...data };
      return newArray;
    });
  };
  const handleAmountChange = (e) => {
    const input = e.target.valueAsNumber;
    if (input > 10000 || input === NaN) {
      alert("incorrect amount");
      return;
    }
    setAmount(e.target.valueAsNumber);
  };
  const handleNewDataGenerate = () => {
    setResult(generateData());
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
  const removeField = (index) => () => {
    setSchema((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  return (
    <Container>
      <h1>Select Your Schema</h1>
      {schema.map(({ name, type, params }, index) => {
        const data = { name, params };
        const Component = fieldComponentMapper[type];
        return (
          <Field key={index}>
            <select value={type} onChange={handleFieldTypeChange(index)}>
              {fieldOptions}
            </select>
            |
            <Component data={data} setFieldData={setFieldData(index)} />
            <RemoveButton onClick={removeField(index)}>remove</RemoveButton>
          </Field>
        );
      })}
      <button onClick={addNewField}>Add New Field</button>
      <div>
        <label>Amount: </label>
        <input type={"number"} value={amount} onChange={handleAmountChange} />
      </div>
      <button onClick={handleNewDataGenerate}>Generate Data</button>
      {!!result && (
        <div>
          <h1>Result</h1>
          <pre>
            <code>{JSON.stringify(result, null, 2)}</code>
          </pre>
        </div>
      )}
    </Container>
  );
}
export default App;

const Container = styled.div`
  width: 100%;
  input[type="text"],
  input[type="number"] {
    width: 70px;
  }
`;

const Field = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const RemoveButton = styled.button`
  justify-self: flex-end;
`;
