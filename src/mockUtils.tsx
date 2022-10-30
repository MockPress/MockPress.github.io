import { mock } from "mockpress";

const field = Object.values(mock).reduce(
  (mapper, fieldFunc) => ({ ...mapper, [fieldFunc.name]: fieldFunc }),
  {} as Record<string, Function>
);

export const fieldOptions = Object.keys(field).map((name) => (
  <option key={name} value={name}>
    {name}
  </option>
));

type Field = {
  name: string;
  type: string;
  params?: unknown[];
};

export const generateSchema = (fieldTypes: Field[]) => {
  const names = fieldTypes.map(({ name }) => name);
  if (names.length !== new Set(names).size) throw new Error("No same name.");
  return fieldTypes.reduce((mapper, { name, type, params }) => {
    return {
      ...mapper,
      [name]: params ? field[type](...params) : field[type](),
    };
  }, {});
};
