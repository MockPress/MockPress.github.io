type FieldType =
  | "autoIncrement"
  | "koreanName"
  | "image"
  | "date"
  | "integer"
  | "koreanAddress"
  | "money"
  | "text";

type MockData = Record<string, unknown>;

type Field = {
  type: FieldType;
  name: string;
  params?: unknown[];
};
